纯前端实现pdf签章

npm install

直接运行
npm run dev

打包
npm run build

如果想展示签章，需要修改 pdfjs-dist下的一个文件
pdfjs-dist/build/pdf.worker.js
搜索找到 _this2.setFlags(_util.AnnotationFlag.HIDDEN);

将其注释掉，即可看到签章
if (data.fieldType === 'Sig') {
  // _this2.setFlags(_util.AnnotationFlag.HIDDEN);
}

PS:
这只是一个demo,本项目综合使用了pdfsign.js  pdfjs-dist  jspdf.js

从项目需要给pdf添加签章开始，耗时1个月，从对PDF一窍不通，到实现功能，只能用历经沧桑来形容！
一开始毫无头绪，然后在github上找到了一个大神的库pdfsign.js (Communication-Systems-Group/pdfsign.js)。这真的是一个非常棒的库，解决了我80%的问题。它是选择一个p12整数，然后对Pdf进行数字签名。我也是通这个库开始研究。发现这里面只有签名，却没有签章的功能。还发现，作者没时间去研究这个东西，他的项目需求仅仅是添加数字签名而已。一点点失望。没办法，接着找库呗
后来又看到另外一个大神的库，也是基于pdfsign.js的（vbuch/node-signpdf）。但是吧。他是把pdfsign.js移植到node上去了，依然没有解决签章的问题！行，我继续找！
失望的发现，竟然没有一个开源的项目支持这个功能。因为对PDF文档格式一窍不通，走了太多弯路。偶然间，加了一个PDF技术群，群主给了我灵感。
我开始用pdf.js库来把现有的一个通过iText签名的文件解析出来。得到几个对象的stream值。最关键的东西拿到了，使用FalteDecode解码得到。
开始兴奋的修改pdfsign.js库。 字符串拼接呗。按照iText签名的文件的对象顺序，一个一个拼接起来。
拼接完成！一盆冷水浇灌过来！图片不展示， 不展示！又开始找问题。
完全不知道PDF图片用的什么格式来编码，是base64? 二进制流？
都不是！我把解析出来的图片转成base64格式的字符串，字符串里面有很多的A，发给群主看了下，他跟我说，A表示这个地方是空白的的，没有东西，一个图片这么多A，不是一个正常的图片。我顿时想到，会不会是rgb格式的呢。
通过canvas来转，最后还真的实现了，虽然图片显示的不对。但是有图片显示，这是突破性的进展啊！
不断的调，把对象一个一个对应起来。终于把图片正式展示出来。
最后又增加了一个显示PDF，然后添加图片，随意拖动位置，设置签章的功能
