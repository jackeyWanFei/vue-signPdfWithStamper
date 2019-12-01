<template>
    <div class="outer-container">
        <div class="iptLabel" style="width: 100%;text-align: left;height: 3rem;">
            <span>upload pdf</span>
            <input type="file" @change="onClickAddPdf($event)"/>
        </div>
        <div class="iptLabel" style="width: 100%;text-align: left;height: 3rem;">
            <span>upload cert</span>
            <input type="file" @change="onClickAddCert($event)"/>
        </div>
        <div class="iptLabel" style="width: 100%;text-align: left;height: 3rem;">
            <span>input cert password</span>
            <input type="text" v-model="certPswd" @change="onPswdChanged"/>
        </div>
        <div class="iptLabel" style="width: 100%;text-align: left;height: 3rem;">
            <span>upload Stamper</span>
            <input type="file" @change="onClickAddStamper($event)"/>
        </div>

        <pdf-frame ref="pdfFrame" @error="onPdfError"></pdf-frame>

        <div class="footBtn">
            <button class="btnActive shubiao" @click="onClickSubmit()">提交</button>
            <button class="shubiao congzhi" >重置</button>
        </div>
    </div>
</template>

<script>
    import PdfFrame from '@/components/PdfFrame'

	export default {
		name: 'compact',
		components: {
			PdfFrame
		},
		data() {
			return {
				pdfFileBuffer: '',
                cert: null,
				certPswd: ''
			}
		},
		filters: {
		},
		async mounted() {
			this.$refs.pdfFrame.setCertData();
		},
		methods: {
			onClickAddStamper(e) {
				let files = e.target.files;
				let reader = new FileReader();
				reader.readAsDataURL(files[0]);
				// reader.readAsBinaryString(files[0]);
				reader.onload = (e) => {
					// this.$refs.pdfFrame.addStamper('https://res.loumengyun.com/stamp_test.png')
					this.$refs.pdfFrame.addStamper(reader.result)
				}

            },
			onPswdChanged(e) {
				console.log(e.target.value)
				this.$refs.pdfFrame.setCertPswd(e.target.value)
            },
			onClickAddPdf(event) {
				console.log(event.target.files)
				var list = event.target.files;
				if (!list[0] ||list[0].name.substring(list[0].name.length - 4, list[0].name.length) !== '.pdf') {

					return;
				}
				let files = event.target.files;
				let reader = new FileReader();
				reader.readAsDataURL(files[0]);
				// reader.readAsBinaryString(files[0]);
				reader.onload = (e) => {
					this.$refs.pdfFrame.addStamper(reader.result)
				}
				this.$refs.pdfFrame.addPdfFile(list)
			},
			onClickAddCert(e) {
				var file = e.target.files[0];
				var reader = new FileReader();
				reader.onload =  (event)=> {
					this.cert = event.target.result;
					this.$refs.pdfFrame.setCertBuffer(this.cert);
				}
				reader.readAsArrayBuffer(file);
            },
			onPdfError(e) {
				console.log("==onPdfError>>", e)
				// this.common.errBox(this, e, 2);
            },
			async onClickSubmit() {
				let pdfSigned = await this.$refs.pdfFrame.getPdfFileSignedData();
				this.pdfFileBuffer = pdfSigned;
				var a = window.document.createElement('a');
				var filename = 'pdfsigned.pdf'
				a.href = window.URL.createObjectURL(new Blob([pdfSigned], {
					type: 'application/pdf'
				}));
				a.download = filename;
				// Append anchor to body.
				document.body.appendChild(a);
				a.click();
				// Remove anchor from body
				document.body.removeChild(a);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "../assets/styles/public";

.outer-container {
    position: relative;
}

input {
    outline: 1px solid black;
    width: 180PX;
}

.compactCont {
    width: 90%;
    margin: auto;
    margin-top: .6rem;
    margin-bottom: .9rem;
    background-color: #fff;
    overflow: hidden;
    .textCoat {
        position: relative;
        padding: .4rem .24rem;
        /*padding-left: 0rem;*/
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-size: .18rem;
        .iptLabel {
            height: 100%;
            width: 1.3rem;
            font-size: .18rem;
            text-align: right;
            span {
                line-height: .5rem;
            }
        }
        .moban {
        }
        .yulan {
            top: 1.6rem;
        }
        .compactClass {
            position: absolute;
            right: 1.2rem;
            top: .4rem;
            display: flex;
            flex-direction: row;
            background-color: #fff;
            box-shadow: 0 0 12px RGBA(29, 149, 217, .2);
            margin-left: .12rem;
            padding: .1rem 0 .1rem .1rem;
            font-size: 12px;
            line-height: .24rem;
            z-index: 6;
            .classDetail {
                width: 1.6rem;
                padding-right: 0.08rem;
                .active {
                    color: #1d95d9;
                }
                p {
                    color: #333;
                    margin-bottom: 5px;
                }
            }
            .classItem {
                width: 1.2rem;
                border-left: 1px solid #dbdbdb;
                padding-left: 0.08rem;
                .active {
                    color: #1d95d9;
                }
                p {
                    margin-bottom: 4px;
                    color: #bbbbbb;
                }
            }
        }
    }
    .block {
        padding: .4rem .24rem;
        /*padding-left: 0rem;*/
        border-bottom: 1px solid #ededed;
        .sendPeople {
            /*margin-bottom: .4rem;*/
        }
        .addresseeList {
            margin-top: .4rem;
        }
        .iptCoat {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            height: .42rem;
            .compactBianhao {
                margin-left: .3rem;
            }
            .iptLabel {
                height: 100%;
                width: 1.3rem;
                font-size: .18rem;
                text-align: right;
                span {
                    line-height: .4rem;
                }
            }
            .hetongfang {
                position: absolute;
                height: .3rem;
                top: 0.08rem;
                right: -0.1rem;
                span {
                    width: 1rem;
                    height: .3rem;
                    color: #1d95d9;
                    padding-left: .1rem;
                    vertical-align: top;
                    font-size: .22rem;
                    text-align: center;
                }
            }
            .iptText {
                height: 100%;
                position: relative;
                img {
                    position: absolute;
                    height: .18rem;
                    top: 0;
                    bottom: 0;
                    right: .16rem;
                    margin: auto;
                }
                .activeIpt {
                    border: 1px solid #1d95d9;
                }
                input {
                    vertical-align: top;
                    height: 100%;
                    font-size: .18rem;
                    border-bottom: 1px solid #cccccc;
                    padding: 0 .18rem;
                    width: 4.8rem;
                }
            }
            .iptRight {
                height: 100%;
                margin-left: .3rem;
                display: flex;
                flex-wrap: wrap;
                .el-icon-plus,
                .el-icon-minus {
                    font-size: .22rem;
                    line-height: .42rem;
                    margin-right: .2rem;
                    color: #1d95d9;
                    width: .42rem;
                    display: inline-block;
                    text-align: center;
                    border: 1px solid #1d95d9;
                }
                button:hover {
                    box-shadow: 0 2px 8px RGBA(29,149,217,.5);
                    background-color: #1d95d9;
                    color: #fff;
                }
                button {
                    height: .42rem;
                    width: 1rem;
                    border: 1px solid #1d95d9;
                    color: #1d95d9;
                    background-color: #fff;
                    vertical-align: top;
                    font-size: .16rem;
                    box-shadow: 4px 2px 5px #C1B3E6;
                }
                .selectActive {
                    background-color: #1d95d9;
                    color: #fff;
                }
                input {
                    height: 100%;
                    vertical-align: top;
                    border-bottom: 1px solid #cdcdcd;
                    font-size: .18rem;
                    padding-left: .1rem;
                }
                .getName {
                    width: 3.74rem;
                }
                .getNum {
                    width: 4rem;
                    &.short {
                        wifth: 3.74rem;
                    }
                }
                span {
                    display: inline-block;
                    font-size: .3rem;
                    vertical-align: top;
                    margin: 0 .2rem;
                }
                .shu {
                    width: 0px;
                    height: .26rem;
                    background-color: #979797;
                    margin-top: .14rem;
                }
            }
        }
    }
    .fujianCoat {
        margin: auto;
        margin-top: -0.2rem;
        position: relative;
        padding: 0 1.3rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .addFjIcon {
            position: relative;
            z-index: 1;
            margin-top: .14rem;
            height: .42rem;
            /*border-radius: 50%;*/
            overflow: hidden;
        }
        img:hover {
            box-shadow: 0 2px 8px RGBA(29,149,217,.5);
        }
        input {
            position: absolute;
            width: 200%;
            height: 200%;
            font-size: 0;
            top: -100%;
            left: -100%;
            background-color: transparent;
        }
        img {
            vertical-align: top;
            height: .42rem;
            border-radius: 3px;
        }
        .fujianIcon {
            margin-right: .2rem;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .fileItem {
                position: relative;
                margin-right: .2rem;
                margin-bottom: .2rem;
                border-radius: 5px;
                width: 5.9rem;
                height: .7rem;
                background-color: #F5FBFF;
                border: 1px solid #98D4F5;
                padding: .1rem;
                span {
                    background-color: #1d95d9;
                    color: #fff;
                    font-size: 10px;
                    padding: 0rem;
                    border-radius: 1rem;
                    right: -6px;
                    top: -6px;
                    position: absolute;
                }
                p {
                    font-size: .12rem;
                    line-height: .25rem;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }
    .footBtn {
        margin: auto;
        margin-top: .8rem;
        padding-bottom: .9rem;
        width: 6.66rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        button {
            width: 3.8rem;
            height: 1.7rem;
            color: #fff;
            font-size: .25rem;
            border-radius: .1rem;
            background-color: #bdbdbd;
        }
        .congzhi:hover {
            background-color: #bdbdbd;
            color: #fff;
        }
        .congzhi {
            background-color: transparent;
            color: #bdbdbd;
            border: 1px solid #bdbdbd;
        }
        .btnActive:hover {
            box-shadow: 0 2px 8px RGBA(29,149,217,.5);
        }
        .btnActive {
            background: #1d95d9;
        }
    }
}

.masking {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    .mCont {
        border-radius: 5px;
        width: 7.5rem;
        height: 2.5rem;
        background-color: #fff;
        padding: .3rem .5rem;
        color: #333;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        .warning {
            color: #f21f1f;
            span {
                color: #f21f1f;
            }
        }
        .el-icon-close {
            position: absolute;
            right: .2rem;
            top: .2rem;
            color: #999;
            font-size: .2rem
        }
        p {
            font-size: .2rem;
            line-height: .32rem;
            text-align: left;
        }
        .mTil {
            text-align: center;
            font-size: .24rem;
            line-height: .36rem;
            margin-bottom: .1rem;
            font-weight: 900;
        }
        .iptCoat {
            height: .8rem;
            width: 6.5rem;
            background-color: #f2f2f2;
            margin-top: .38rem;
            /*overflow: hidden;*/
            position: relative;
            border-radius: 0.05rem;
            .iptPlaceholder {
                top: .28rem;
                left: 0;
                right: 0;
                z-index: 1;
                margin: auto;
                position: absolute;
                font-size: .2rem;
                span {
                    color: #aaaaaa;
                }
                img {
                    height: .2rem;
                }
            }
            input {
                height: 100%;
                width: 100%;
                background-color: transparent;
                position: absolute;
                top: 0;
                z-index: 2;
                padding: .2rem;
                text-align: center;
                left: 0;
            }
        }
        button:hover {
            box-shadow: 0 2px 8px RGBA(29,149,217,.5);
        }
        button {
            vertical-align: top;
            margin-top: .46rem;
            width: 100%;
            height: .7rem;
            background-color: #1d95d9;
            border-radius: 5px;
            color: #fff;
            font-size: .26rem
        }
    }
}

.block-row {
    display: flex;
}

@media only screen and (max-width: 800px) {
    .compactCont .block {
        padding: .02rem .02rem .06rem;
    }
    .block-row {
        width: 100%;
        height: .6rem;
        margin: .4rem 0;
    }
    .compactCont .block .block-item {
        display: block;
        height: 1.8rem;
        margin: 0;
    }
    .compactCont .block .iptCoat .compactBianhao {
        margin-left: 0;
    }
    .compactCont .block .sendPeople {
        margin-top: .4rem;
        height: auto;
    }
    .compactCont .block .iptCoat .iptRight button {
        height: .62rem;
        width: 1.4rem;
    }
    .compactCont .block .iptCoat .iptRight .el-icon-plus {
        width: .62rem;
        line-height: .62rem;
    }
    .compactCont .block .addresseeList {
        display: block;
        width: 100%;
        height: auto;
    }
    .compactCont .block .iptCoat .iptText {
        display: flex;
        margin-left: .3rem;
    }
    .compactCont .block .iptCoat .iptRight input,
    .compactCont .block .iptCoat .iptText input {
        height: .6rem;
    }
    .compactCont .block .iptCoat .iptRight .getNum,
    .compactCont .block .iptCoat .iptRight .getName {
        width: 4.8rem;
    }
    .addresseeList input {
        margin-bottom: .3rem;
    }
    .compactCont .block .iptCoat .hetongfang {
        right: .3rem;
        bottom: .6rem;
        top: auto;
    }
    .compactCont .block .iptCoat .hetongfang select {
        width: 1.1rem;
        height: .6rem;
    }
    .mg {
        margin-bottom: .4rem;
    }
    .compactCont .textCoat {
        display: block;
        padding-right: 0;
    }
    .footBtn {
        padding: 0 .3rem;
    }
    .compactCont .fujianCoat {
        padding: 0 .2rem;
        margin-top: .6rem;
        position: relative;
    }
    .compactCont .fujianCoat .addFjIcon {
        position: absolute;
        top: -1rem;
    }
    .compactCont .fujianCoat .fujianIcon .fileItem {
        width: 90%;
        margin-right: 0;
    }
    .compactCont .footBtn {
        margin-top: .3rem;
        margin-bottom: .5rem;
    }
    .compactCont {
        margin-bottom: .5rem;
    }
}

.rightSide {
    width: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 3rem;
    position: absolute;
    right: .2rem;
    top: .4rem;
    img {
        width: 100%;
    }
}

.scroll-content-info {
    position: relative;
    border: 1px solid #1d95d9;
    border-radius: 5px;
    overflow: hidden;
    .icon-stamper {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
    }
    img {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 3.72rem;
        height: 3.72rem;
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
</style>

