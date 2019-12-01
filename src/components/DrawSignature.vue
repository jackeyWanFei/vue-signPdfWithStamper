<template>
    <div class="signature-container">
        <div class="canvas-container">
            <!--<img class="clear-btn" src="../../static/images/icon_close.png" @click="onClickClearCanvas">-->
            <canvas class="signature-canvas" ref="signatureCanvasHorizon"
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
        <div class="bottom-btn-container">
            <button @click="onClickSubmit">提交签名</button>
            <button @click="onClickClearCanvas">重新绘制</button>
        </div>
    </div>
</template>

<script>
  // import pdf from 'vue-pdf'
  export default {
    name: 'HelloWorld',
    components: {
      // pdf
    },
    data() {
      return {
		  stamperRect: [],
		  startPoint: [],
		  lastLineWidth: -1,
		  lastTimestamp: 0,
		  curTimestamp: 0,
		  brushWidth: 5
      }
    },
    computed: {},
    mounted() {
        let canvas = this.$refs.signatureCanvasHorizon;
        let outerContainer = document.getElementsByClassName('signature-container')[0]
        if(window.innerWidth > 800) {
			canvas.width = outerContainer.clientWidth;
			canvas.height = outerContainer.clientHeight - 38;
			canvas.style.width = outerContainer.clientWidth + 'px';
			canvas.style.height = (outerContainer.clientHeight - 38) + 'px';
        } else {
			canvas.width = outerContainer.clientWidth - 40;
			canvas.height = outerContainer.clientHeight;
			canvas.style.width = (outerContainer.clientWidth - 40) + 'px';
			canvas.style.height = (outerContainer.clientHeight) + 'px';
        }
        // canvas.width = outerContainer.clientWidth;
        // canvas.height = outerContainer.clientHeight - 40;
        // canvas.style.width = outerContainer.clientWidth + 'px';
        // canvas.style.height = (outerContainer.clientHeight - 40) + 'px';
        // console.log('outerContainer==', outerContainer.clientWidth)
        // canvas.width = ;
    },
    methods: {
    	/**
         * 根据不同速度计算线的宽度
         * @param canvas {Canvas object} 需要绘制的画布
         * @param s {number} 距离 - 偏移量
         * @param t {number} 时间 - 便宜的时间
         * @param brushWidth {number} 中笔触计算值
         * */
    	calcLineWidth(canvas, s, t, brushWidth) {
    		let v = s / t; // 计算速度
            // 声明最大最小速度和最大最小边界
            let maxVelocity = 10,
                minVelocity = 0.1,
                maxLineWidth = 6, // 避免手机端线条太粗
                minLineWidth = 1,
                resultLineWidth; // 用于返回的线宽度
            if(v <= minVelocity) {
            	resultLineWidth = maxLineWidth;
            } else if(v >= maxVelocity) {
            	resultLineWidth = minLineWidth;
            } else {
            	resultLineWidth = maxLineWidth - (v - minVelocity) / (maxVelocity - minVelocity)
                    * (maxLineWidth - minLineWidth);
            }
            if(this.lastLineWidth == -1) { // 开始的时候
            	return resultLineWidth;
            } else {
            	return resultLineWidth * 2 / 3 + this.lastLineWidth * 1 / 3; // lastLineWidth占比越大越平滑
            }
        },
        /**
         * 计算两点之间的距离
         * @param lastCoordinate {point} 上一个点的坐标
         * @param curCoordinate {point} 当前点的坐标
         * */
        calcDistance(lastCoordinate, curCoordinate) {
    		let distance = Math.sqrt(Math.pow(curCoordinate.x - lastCoordinate.x, 2)
                + Math.pow(curCoordinate.y - lastCoordinate.y, 2));
    		return distance;
        },
        /**
         * 坐标转换
         * */
        windowToCanvas(cavnas, x, y) {
        	let bbox = canvas.getBoundingClientRect();
        	return {x: x - bbox.left, y: y-bbox.top};
        },
        /**
         * 画线
         * */
        drawLine(context, x1, y1, x2, y2, lineWidth, strokeColor) {
			context.beginPath();
			context.lineTo(x1, y1);
			context.lineTo(x2, y2);
			context.lineWidth = lineWidth || 2;
			context.lineCap = 'round'; // 线与线交合不会产生空隙
            context.lineJoin = 'round';
			context.strokeStyle = strokeColor || '#000'; // 默认笔触黑色
			context.stroke(); //绘制定义的图形
        },
        /**
         * 角度转弧度
         * */
        converDeg2Radian(deg) {
        	return deg * Math.PI / 180;
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
			this.startPoint = {x: pointX, y: pointY};
			this.lastTimestamp = Date.now();
			console.log(this.startPoint)
            this.canvasDown = true
		},
		onCanvasMouseMove(e) {
			let touch = null;
			if (e.touches) {
				touch = e.touches[0];
			} else {
				touch = e;
			}
			// console.log("===onCanvas mouse move", e)
			if (!this.canvasDown) {
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

			// 计算偏移量
			let offsetX = moveX - this.startPoint[0];
			let offsetY = moveY - this.startPoint[1];

			let pointX = Math.round(touch.clientX - cRect.left);
			let pointY = Math.round(touch.clientY - cRect.top);
			let startX = this.startPoint[0];
			let startY = this.startPoint[1];
			// console.log(`move point(${pointX}, ${pointY})`)

            // let lineWidth = 4;
            // let cornerColor = '#1d95d9'
            // ctx.lineWidth = lineWidth;
            //
            // // // 第一种绘图模式- 只在移动到的点上绘制
            // // ctx.fillStyle = cornerColor;
            // // ctx.beginPath();
            // // ctx.arc(pointX, pointY, .5, 0, 180);
            // // ctx.fill();
            //
            // ctx.strokeStyle = cornerColor;
            // ctx.moveTo(startX, startY);
            // ctx.lineTo(pointX, pointY);
            // ctx.closePath();
            // ctx.stroke(); //绘制定义的图形
            // this.startPoint = [pointX, pointY]

            let curCoordinate = {x: pointX, y: pointY};
			let curTimestamp = Date.now();

			let s = this.calcDistance(this.startPoint, curCoordinate);
			let t = curTimestamp - this.lastTimestamp;
			let curLineWidth = this.calcLineWidth(canvas, s, t, this.brushWidth);

			this.drawLine(ctx, this.startPoint.x, this.startPoint.y, curCoordinate.x, curCoordinate.y);
			this.startPoint = curCoordinate;
			this.lastTimestamp = curTimestamp;
			this.lastLineWidth = curLineWidth;

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
			// this.clickCorner = 0;
			// this.canvasDown = false;
			// this.stamperRect = [].concat(this.tempStamperRect)
			// console.log("===onCanvas mouse out")
		},
		onClickSubmit() {
            // 转换图片
			let canvas = this.$refs.signatureCanvasHorizon;
			let context = canvas.getContext('2d');
			let stamperData = context.getImageData(0, 0, canvas.width, canvas.height);
            let stamperImage = new Image();
            stamperImage.src = canvas.toDataURL('image/png', 0.4);
            stamperImage.onload = e => {
				let width = e.target.width;
				let height = e.target.height;
				let tempCanvas = document.createElement('canvas');
				let tempContext = tempCanvas.getContext('2d');
				// let stamperData = context.getImageData(0, 0, canvas.width, canvas.height);
				let base64 = ''
                let anchorX = 0;
                let anchorY = 0;
				tempCanvas.width = width;
				tempCanvas.height = height;
				let deg = 0;
				if(window.innerWidth <= 800) {
					anchorX = -width;
					tempCanvas.width = height;
					tempCanvas.height = width;
                }
				tempContext.rotate(this.converDeg2Radian(deg));
				tempContext.drawImage(stamperImage, anchorX, anchorY, width, height);
				// tempContext.rotate(90)
                console.log('==>>>>>')
				base64 = tempCanvas.toDataURL('image/png', 0.3);
				this.downloadFile(base64, '哈哈哈.png')
            }
			// let tempCanvas = document.createElement('canvas');
			// let tempContext = tempCanvas.getContext('2d');
			// let stamperData = context.getImageData(0, 0, canvas.width, canvas.height);
            // let base64 = ''
			// tempCanvas.width = canvas.width;
			// tempCanvas.height = canvas.height;
			// tempContext.rotate(-90)
			// tempContext.putImageData(stamperData, 0, 0);
			// // tempContext.rotate(-90)
			// base64 = tempCanvas.toDataURL('image/png', 0.5);
			// tempContext.rotate(-90)
            // document.body.appendChild(tempCanvas)
            // this.$emit('submitStamper', base64)
            // console.log("==onClickSubmit>>>>>>")
            // this.downloadFile(base64, '哈哈哈.png')
			// var a = window.document.createElement('a');
			// var filename = 'stamper.png'
			// a.href = window.URL.createObjectURL(new Blob([base64], {
			// 	type: 'image/png'
			// }));
			// a.download = filename;
			// // Append anchor to body.
			// document.body.appendChild(a);
			// a.click();
			// // Remove anchor from body
			// document.body.removeChild(a);
        },
        downloadFile(imgSrc, imgName) {
			let elem = document.createElement('a');
			elem.setAttribute('href', imgSrc);
			elem.setAttribute('download', imgName);
			document.body.appendChild(elem);
			elem.click();
			document.body.removeChild(elem);
        },
		onClickClearCanvas() {
			console.log("==onClickClearCanvas>>>>>>")
        	let canvas = this.$refs.signatureCanvasHorizon;
        	let context = canvas.getContext('2d');
        	context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    button:focus {
        outline: none;
    }
  .signature-container {
      width: 600PX;
      height: 340PX;
      position: relative;
      /*border: 1PX solid #000;*/
      .canvas-container {
          width: 100%;
          height: calc(100% - 38PX);
          border: 1PX solid #1d95d9;
          border-radius: 5PX;
      }
      .clear-btn {
          position: absolute;
          top: 0;
          right: 0;
          width: 30PX;
          height: 30PX;
      }
      .bottom-btn-container {
          height: 36PX;
          display: flex;
          align-items: center;
          justify-content: space-around;
      }
  }
  @media only screen and (max-width: 800px){
      .signature-container {
          width: 100%;
          height: 100vh;
          overflow: hidden;
          flex-direction: row-reverse;
          display: flex;
          .clear-btn {
              bottom: 0;
              top: auto;
          }

          .bottom-btn-container {
              flex-direction: column;
              width: 38PX;
              height: 100%;
              button {
                  transform: rotate(90deg);
                  width: 100PX;
                  height: 38PX;
                  border: 1PX solid #000;
              }
          }

      }
  }
</style>
