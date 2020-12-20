var offset = function(dom) {
	var obj = {
		left: 0,
		top: 0
	};
	// 判定是否是IE8 
	var isIE8 = false;
	// 如果 不为-1 说明包含该字符串 说明就是IE8
	if (window.navigator.userAgent.indexOf("MSIE 8") != -1) {
		isIE8 = true;
	}
	// 计算过程
	// 先算dom到dom.offsetParent的距离  再算 dom.offsetParent 到 dom.offsetParent.offsetParent的距离 再...
	while (dom != document.body) {
		if (isIE8) {
			obj.left += dom.offsetLeft ;
			obj.top += dom.offsetTop;
		} else {
			obj.left += dom.offsetLeft + dom.clientLeft ;
			obj.top += dom.offsetTop + dom.clientTop;
		}
		dom = dom.offsetParent;
	}

	// 返回obj
	return obj;

}