var win = Ti.UI.createWindow();

var view1 = Ti.UI.createView({
	backgroundColor : '#123',
	width : 220,
	height : 300
});
var view2 = Ti.UI.createView({
	backgroundColor : '#246',
	width : 220,
	height : 300
});
var view3 = Ti.UI.createView({
	backgroundColor : '#48b',
	width : 220,
	height : 300
});

var scrollableView = Ti.UI.createScrollableView({
	views : [view1, view2, view3],
	showPagingControl : true,
	pagingControlColor : 'transparent',
	pagingControlTimeout : 1000,
	width : 230,
	height : 430,
	clipViews : true,
	hitRect : {
		height : 480,
		width : 320,
		x : -45,
		y : 0
	}
});

win.add(scrollableView);
win.open();
