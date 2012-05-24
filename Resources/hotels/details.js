var win = Titanium.UI.currentWindow;

Ti.include("/lib_extend/progress.view.js");

var content = Ti.UI.createWebView({
	url : "http://wego.com" + win.link + "?search_id=" + win.search_id_pass,
	zIndex : 99
})
Ti.API.info(content.url);
win.add(content);

