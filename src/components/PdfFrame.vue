<template>
    <div id="compact-outer-container" style="margin-top: 10px;display: flex;justify-content: center;">
        <!--这里展示pdf-->
        <div class="scroll-content-info"
             v-show="pages"
             :style="{height: canvasHeight, width: canvasWidth}" ref="scroll">
            <el-carousel :height="canvasHeight"
                         arrow="never"
                         :autoplay="false"
                         indicator-position="none"
                         @change="onCarouselChanged"
                         ref="carousel">
                <el-carousel-item v-for="page in pages" :key="page">
                    <canvas :id="'the-canvas'+page"></canvas>
                </el-carousel-item>
            </el-carousel>
            <div style="font-size: 20px; position: absolute;top: 10px; right: 10px;z-index: 999;"
                 v-if="showStamper"
                 @click="onClickResizeStamper">调整签章</div>
            <span class="pagination">{{(currentPage + 1) + '/' + pages}}</span>
            <div class="stamper-container" v-show="showStamper">
                <canvas id="stamper-canvas"
                        @touchstart.prevent="onCanvasMouseDown"
                        @mousedown="onCanvasMouseDown"
                        @mousemove="onCanvasMouseMove"
                        @touchmove="onCanvasMouseMove"
                        @mouseup="onCanvasMouseUp"
                        @touchend="onCanvasMouseUp"
                        @mouseover="onCanvasMouseOver"
                        @touchcancel="onCanvasMouseOut"
                        @mouseout="onCanvasMouseOut"></canvas>
            </div>
            <img class="pre-page" v-if="showPrev"
                 @click="onClickPrevCanvas" src="../../static/images/icon_prev.png"/>
            <img class="next-page" v-if="showNext"
                 @click="onClickNextCanvas" src="../../static/images/icon_prev.png"/>
        </div>

    </div>
</template>

<script>

	import PDFJS from 'pdfjs-dist';
	import imageTools from '../../static/PDFTools/ImageTools'

	const stamperMinWidth = 50;
	const stamperMinHeight = 50;
	const stamperMaxWidth = 300;
	const stamperMaxHeight = 300;
	export default {
		name: 'compact',
		components: {
		},
		data() {
			return {
				resizeable: false,
				pages: 0,
				stamper: '',
				cert: '',
				pdfFile: null,
				certPswd: '1',
				certBase64: '',
				scale: 1,
				ratio: 1,
				canvasHeight: '200px',
				canvasWidth: '100%',
				showPrev: false,
				showNext: false,
				canvasDown: false,
				showStamper: false,
				stamperData: '',
				stamperImage: null,
				startPoint: [], // 点击时候的点
				stamperRect: [],
				tempStamperRect: [],
				lastAnchor: [],
				currentPage: 0,
				pdfFileBuffer: '',
				clickCorner: 0, // 0:没有点击任何角 1：左上角 2：右上角 3：右下角 4：左下角
				frameColor: '#1d95d9',
				cornerColor: 'blue',
                		firstLoad: true,
                		pagesInfo: [],
				testPdf: null,
                		loadTimes: 0,
			}
		},
		filters: {
		},
		async mounted() {
			let thif = this;
			// thif.certBase64 = imageTools.defaultPfxCert;
			// thif.convertCertData();
		},
		methods: {
			setCertPswd(password) {
				this.certPswd = password;
			},
			setPDFFile(file) {
				this.pdfFile = file;
			},
			setCertData(certBase64) {
				this.certBase64 = certBase64 ? certBase64 : imageTools.defaultPfxCert;
				this.convertCertData();
			},
            setCertBuffer(arrayBuffer) {
				this.cert = new Uint8Array(arrayBuffer);
            },
			convertCertData(e) {
				var base64 = this.certBase64;
				var raw = atob(base64);
				var rawLength = raw.length;
				var array = new Uint8Array(new ArrayBuffer(rawLength));
				for (var i = 0; i < rawLength; i++) {
					array[i] = raw.charCodeAt(i);
				}
				this.cert = array;
			},
			_renderPage(num) {
				this.pdfDoc.getPage(num).then((page) => {
					let pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
					let canvas = document.getElementById('the-canvas' + num)
					let compactContainer = document.getElementById('compact-outer-container')
					let ctx = canvas.getContext('2d')
					let maxRatio = 2;
					let viewport = page.getViewport(1); //获取文件1：1尺寸
					let ratio = compactContainer.clientWidth / viewport.width
					ratio = ratio > maxRatio ? maxRatio : ratio
					let canvasWidth = viewport.width * ratio;
					let canvasHeight = viewport.height * ratio;
					if (window.innerWidth > 800) {
						pxRatio = 1
						viewport = page.getViewport(ratio)
						canvasWidth = viewport.width;
						canvasHeight = viewport.height;
					}
					this.ratio = ratio;

					canvas.width = canvasWidth
					canvas.height = canvasHeight
					canvas.style.width = canvasWidth + 'px'
					canvas.style.height = canvasHeight + 'px'
					this.canvasHeight = canvasHeight + 'px'
					this.canvasWidth = canvasWidth + 'px'

					let {width: cssWidth, height: cssHeight} = canvas.getBoundingClientRect();
					canvas.width = pxRatio * cssWidth;
					canvas.height = pxRatio * cssHeight;
					if (window.innerWidth <= 800) {
						ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
						ctx.scale(pxRatio, pxRatio);
					}

					let renderContext = {
						canvasContext: ctx,
						viewport: viewport
					}
					page.render(renderContext).then(_ => {
						if (this.pages > num) {
							this._renderPage(num + 1)
							return;
						}
						// 移动端首次加载PDF会出现签章错位的问题，通过加载两次文件，解决
						if (window.innerWidth <= 800 && this.loadTimes < 1) {
							this.loadTimes++;
							this._loadFile(this.testPdf);
						}
					})


				})
			},
			_loadFile(url) {
				this.testPdf = url;
				PDFJS.getDocument(url).then((pdf) => {
					this.pdfDoc = pdf
					this.pages = this.pdfDoc.numPages
					this.showNext = this.pages > 1;
					this.$nextTick(() => {
						this._renderPage(1)
					})
				})
			},
			async addStamper(stamperData) {
				// 判断是否添加了pdf文件
				// console.log("===pdfFile>>>>", this.pdfFile)
				if (!this.pdfFile) {
					this.$emit('error', '请先上传合同文件！')
					return;
				}
				if (this.stamperImage) {
					this.stamperImage = null;
				}
				let pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
				this.showStamper = true;
				//显示stamper canvas
				let canvas = document.getElementById('the-canvas1')
				let stamperCanvas = document.getElementById('stamper-canvas')
				let stamperCtx = stamperCanvas.getContext('2d')
				let stamper = new Image()
				stamper.setAttribute('crossOrigin', 'anonymous')
				stamper.src = stamperData;
				let offset = 4;
				if (window.innerWidth > 800) {
					pxRatio = 1;
					offset = 0;
				}
				stamper.onload = async e => {
					let anchorX = 4;
					let anchorY = 4;
					let width = e.target.width;
					let height = e.target.height;

					// TODO 判断宽高是否在最大、最小值之间
					let ratio = width / height;
					if (width > height) {
						width = width > stamperMaxWidth * this.ratio ? stamperMaxHeight * this.ratio : width;
						width = width < stamperMinWidth * this.ratio ? stamperMinWidth * this.ratio : width;
						height = width / ratio;
					} else {
						height = height > stamperMaxHeight * this.ratio ? stamperMaxHeight * this.ratio : height;
						height = height < stamperMinHeight * this.ratio ? stamperMinHeight * this.ratio : height;
						width = height * ratio;
					}
					imageTools.drawStamper(stamperCtx, canvas, stamper,
						anchorX, anchorY, width, height, this.frameColor, this.cornerColor, null, this.resizeable)
					stamper = null;
					this.stamperRect = [anchorX - 2, anchorY - 2, width, height];
					this.tempStamperRect = [].concat(this.stamperRect);

					// 创建新的canvas用来将签章转为base64
					let getX = (anchorX + offset) * pxRatio;
					let getY = (anchorY + offset) * pxRatio;
					let getW = (width) * pxRatio * pxRatio;
					let getH = (height) * pxRatio * pxRatio;
					let tempImageData = stamperCtx.getImageData(getX, getY, getW, getH);
					let tempCanvas = document.createElement('canvas');
					let tempCtx = tempCanvas.getContext('2d')
					let tempCanvasW = width * pxRatio * pxRatio;
					let tempCanvasH = height * pxRatio * pxRatio;
					tempCanvas.width = tempCanvasW;
					tempCanvas.height = tempCanvasH;
					tempCtx.putImageData(tempImageData, 0, 0)

					let scale = 0.5;
					let base64 = tempCanvas.toDataURL('image/png', scale)

					let tempImage = new Image();
					tempImage.src = base64;
					tempImage.onload = async e => {
						tempCanvas.width = width;
						tempCanvas.height = height;
						tempCtx.clearRect(0, 0, tempCanvasW, tempCanvasH);
						tempCtx.drawImage(tempImage, 0, 0, width, height)


						base64 = tempCanvas.toDataURL('image/png', scale)
						this.stamperData = base64;

						let stamperImage = new Image()
						stamperImage.setAttribute('crossOrigin', 'anonymous')
						stamperImage.src = this.stamperData;
						this.stamperImage = stamperImage;

						this.stamper = await this.getImageData1(this.stamperData);
					}
				}
				stamperCanvas.width = canvas.width * pxRatio;
				stamperCanvas.height = canvas.height * pxRatio
				stamperCanvas.style.width = canvas.style.width
				stamperCanvas.style.height = canvas.style.height
				stamperCtx.scale(pxRatio, pxRatio);
			},
			addPdfFile(list) {
				if (list[0].name.substring(list[0].name.length - 4, list[0].name.length) !== '.pdf') {
					this.$emit('error', '请您添加pdf格式的文件')
					return;
				}
				this._loadFile(URL.createObjectURL(list[0]));
				var _this = this;
				for (let i = 0; i < list.length; i++) {
					let reader = new FileReader();
					reader.readAsBinaryString(list[i]);
					reader.onload = (e) => {
						// list 加入digests之前，将PDF转换成uint8Array格式
						this.pdfFile = imageTools.binaryStringToUint8Array(reader.result);
					}
				}
			},
			/**
			 * 将图片放置canvas，获取RGB数组
			 * */
			async getImageData1(base64Data) {
				return new Promise((resolve, reject) => {
					let image = new Image();
					image.src = base64Data;
					image.onload = (e) => {
						let canvas = document.createElement('canvas');
						let ctx = canvas.getContext('2d');
						let width = e.target.width;
						let height = e.target.height;
						canvas.width = width;
						canvas.height = height;
						document.body.appendChild(canvas)
						ctx.drawImage(image, 0, 0, width, height);

						let base64 = canvas.toDataURL('image/png', 1.0);

						// 处理成二进制流
						let alias = imageTools.generateAliasFromImageData(base64);
						let imgData = imageTools.convertStringToImageData(base64);
						imgData = imageTools.binaryStringToUint8Array(imgData);
						let info = imageTools.processPNG(imgData, 0, alias, 'SLOW');

						// 移除canvas
						document.body.removeChild(canvas)
						resolve({
							info: info,
							originW: width,
							originH: height
						});
					}
				})
			},

			async getPdfFileSignedData() {
				let imgDataBinary = this.stamper.info.data
				let smaskBinary = this.stamper.info.smask
				let processData = imageTools.processDataByFilters(imgDataBinary, ['FlateEncode'])
				let smaskData = imageTools.processDataByFilters(smaskBinary, ['FlateEncode'])
				let stamperWidth = this.stamperRect[2] / this.ratio;
				let stamperHeight = this.stamperRect[3] / this.ratio;
				let stamperX = (this.stamperRect[0]) / this.ratio;
				let stamperY = Number(this.canvasHeight.replace('px', '')) - this.stamperRect[1];
				stamperY /= this.ratio;
				stamperY -= stamperHeight
				let stamperInfo = {
					data: {
						imgData: {
							data: processData.data,
							length: processData.data.length
						},
						smaskData: {
							data: smaskData.data,
							length: smaskData.data.length
						}
					},
					x: stamperX, // 锚点x坐标，左下角开始
					y: stamperY, // 锚点y坐标，左下角开始
					width: stamperWidth,
					height: stamperHeight,
					originW: this.stamper.originW,
					originH: this.stamper.originH,
					pageNo: this.currentPage

				}
				let pdfSigned = null;
				try {
					console.log("===this.cert>>>>>", this.cert)
					pdfSigned = await PDFSIGN.signpdf(this.pdfFile, this.cert, this.certPswd, stamperInfo, imageTools);
				} catch (error) {
					console.log("===error>>>>>", error)
					return;
				}

				return pdfSigned;
			},

			onCarouselChanged(e) {
				// console.log("_--carousel chagned===", e)
				this.currentPage = e;
				if (e > 0) {
					this.showPrev = true;
				} else if (e == 0) {
					this.showPrev = false;
				}
				if (e < this.pages - 1) {
					this.showNext = true;
				} else if (e == this.pages - 1) {
					this.showNext = false;
				}

			},
			onClickPrevCanvas() {
				this.$refs.carousel.prev()
			},
			onClickNextCanvas() {
				this.$refs.carousel.next()
			},
			onCanvasMouseDown(e) {
				// console.log("===onCanvas mouse down", e)
				// 判断是否点击在图片区域
				let touch = null;
				if (e.touches) {
					touch = e.touches[0];
				} else {
					touch = e;
				}
				let canvas = touch.target;
				let rect = this.stamperRect;
				let cRect = canvas.getBoundingClientRect();
				let pointX = Math.round(touch.clientX - cRect.left);
				let pointY = Math.round(touch.clientY - cRect.top);
				this.startPoint = [pointX, pointY];
				// 判断点击在哪个角
				if (pointX > rect[0] && pointX < rect[0] + 20
					&& pointY > rect[1] && pointY < rect[1] + 20 && this.resizeable) {
					// console.log("=====>>点击的是左上角")
					this.clickCorner = 1;
					return;
				}
				if (pointX > rect[0] + rect[2] - 20 && pointX < rect[0] + rect[2]
					&& pointY > rect[1] && pointY < rect[1] + 20 && this.resizeable) {
					// console.log("=====>>点击的是右上角")
					this.clickCorner = 2;
					return;
				}
				if (pointX > rect[0] + rect[2] - 20 && pointX < rect[0] + rect[2]
					&& pointY > rect[1] + rect[3] - 20 && pointY && this.resizeable) {
					// console.log("=====>>点击的是右下角");
					this.clickCorner = 3;
					return;
				}
				if (pointX > rect[0] && pointX < rect[0] + 20
					&& pointY > rect[1] + rect[3] - 20 && pointY && this.resizeable) {
					// console.log("=====>>点击的是左下角");
					this.clickCorner = 4;
					return;
				}
				this.clickCorner = 0;
				if (pointX > rect[0] &&
					pointX < (rect[0] + rect[2]) &&
					pointY > rect[1] &&
					(pointY < rect[1] + rect[3])) {
					this.canvasDown = true;
				}
			},
			onCanvasMouseMove(e) {
				let touch = null;
				if (e.touches) {
					touch = e.touches[0];
				} else {
					touch = e;
				}
				// console.log("===onCanvas mouse move", e)
				if (!this.canvasDown && !(this.clickCorner > 0 && this.clickCorner <= 4)) {
					return;
				}
				e.stopPropagation();
				let canvas = touch.target;
				let ctx = canvas.getContext('2d');
				let clientX = touch.clientX;
				let clientY = touch.clientY;
				let cRect = canvas.getBoundingClientRect();
				let moveX = clientX - cRect.left;
				let moveY = clientY - cRect.top;
				let anchorX = this.stamperRect[0];
				let anchorY = this.stamperRect[1];
				let width = this.stamperRect[2];
				let height = this.stamperRect[3];
				// 计算偏移量
				let offsetX = moveX - this.startPoint[0];
				let offsetY = moveY - this.startPoint[1];
				let img = this.stamperImage;
				let clickCorner = this.clickCorner;
				if (this.stamperImage) {
					if (clickCorner == 0 && !this.canvasDown) {
						return;
					}
					let offset = 0;
					if (clickCorner > 0 && clickCorner <= 4) {
						offset = offsetX ? offsetX : offsetY;
					}
					let ratio = width / height;
					let temp_width = width;
					if (clickCorner === 1) {
						// 拖拽左上角
						// 右下角不动
						anchorX += offset;
						anchorY += offset / ratio;
						width -= offset;
						height -= offset / ratio;
					} else if (clickCorner === 2) {
						// 拖拽右上角
						// 左下角不动
						anchorY -= offset / ratio;
						width += offset;
						height += offset / ratio;
					} else if (clickCorner === 3) {
						// 拖拽右下角
						// 左上角不动，增加宽高
						width += offset;
						height += offset / ratio;
					} else if (clickCorner === 4) {
						// 拖拽左下角
						// 右上角不动，增加宽高
						anchorX += offset;
						width -= offset;
						height -= offset / ratio;
					} else if (this.canvasDown) {
						// 计算图片锚点位置
						anchorX += offsetX;
						anchorY += offsetY;
					}

					width = Math.abs(width);
					height = Math.abs(height);
					// 判断是放大还是缩小
					if (((width >= stamperMaxWidth * this.ratio || height >= stamperMaxHeight * this.ratio)
							&& width > temp_width) ||
						((width <= stamperMinWidth * this.ratio || height <= stamperMinHeight * this.ratio)
							&& width < temp_width)) {
						// 达到最大
						if (width > height) {
							width = width > stamperMaxWidth * this.ratio ? stamperMaxHeight * this.ratio : width;
							height = width / ratio;
						} else {
							height = height > stamperMaxHeight * this.ratio ? stamperMaxHeight * this.ratio : height;
							width = height * ratio;
						}
						if (clickCorner == 1 || clickCorner == 4) {
							anchorX = this.tempStamperRect[0] - (width - this.tempStamperRect[2]);
						}
						if (clickCorner == 1 || clickCorner == 2) {
							anchorY = this.tempStamperRect[1] - (height - this.tempStamperRect[3]);
						}
					}
					if ((width <= stamperMinWidth * this.ratio || height <= stamperMinHeight * this.ratio)
						&& width < temp_width) {
						// 达到最小
						// 放缩小 - 坐标点还原
						if (width > height) {
							height = height < stamperMinHeight * this.ratio ? stamperMinHeight * this.ratio : height;
							width = height * ratio;
						} else {
							width = width < stamperMinWidth * this.ratio ? stamperMinWidth * this.ratio : width;
							height = width / ratio;
						}
						if (clickCorner == 1 || clickCorner == 4) {
							anchorX = this.tempStamperRect[0] - (width - this.tempStamperRect[2]);
						}
						if (clickCorner == 1 || clickCorner == 2) {
							anchorY = this.tempStamperRect[1] - (height - this.tempStamperRect[3]);
						}
					}

					imageTools.drawStamper(ctx, canvas, img, anchorX, anchorY, width, height, this.frameColor, this.cornerColor, null, this.resizeable)
					this.tempStamperRect = [anchorX, anchorY, width, height]
				}

			},
			onCanvasMouseUp(e) {
				// console.log("===onCanvas mouse up")
				this.clickCorner = 0;
				this.canvasDown = false;
				this.stamperRect = [].concat(this.tempStamperRect)
			},
			onCanvasMouseOver(e) {
				// 鼠标移入canvas
				this.clickCorner = 0;
				// console.log("===onCanvas mouse over")
			},
			onCanvasMouseOut(e) {
				// 鼠标移出canvas
				this.clickCorner = 0;
				this.canvasDown = false;
				this.stamperRect = [].concat(this.tempStamperRect)
				// console.log("===onCanvas mouse out")
			},
			onClickResizeStamper() {
				this.resizeable = !this.resizeable;
				let canvas = document.getElementById('stamper-canvas')
				let ctx = canvas.getContext('2d');
				let img = this.stamperImage;
				let anchorX = this.tempStamperRect[0];
				let anchorY = this.tempStamperRect[1];
				let width = this.tempStamperRect[2];
				let height = this.tempStamperRect[3];
				imageTools.drawStamper(ctx, canvas, img, anchorX, anchorY, width, height, this.frameColor, this.cornerColor, null, this.resizeable)
			}
		}
	}</script>

<style lang="scss" scoped>
    .scroll-content-info {
        position: relative;
        border: 1px solid #1d95d9;
        border-radius: 5px;
        overflow: hidden;

        img {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            width: .72rem;
            height: .72rem;
            z-index: 999;
            cursor: pointer;
        }
        .pre-page {
            left: 20px;
        }
        .next-page {
            right: 20px;
            transform: rotate(180deg);
        }
        .pagination {
            position: absolute;
            top: 10px;
            left: 10px;
            font-size: 24px;
            z-index: 990;
        }
        .stamper-container {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 99;
        }
    }
    @media only screen and (max-width: 800px) {
        .scroll-content-info {
            img {
                width: 1.72rem;
                height: 1.72rem;
            }
        }
    }
</style>
