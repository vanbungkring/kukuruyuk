// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
var db = Titanium.Database.install('lib_extend/wego.sqlite', 'wego');
// create tab group
var tabGroup = Titanium.UI.createTabGroup();
var global_api = 'd1d11c0cf2605c1e396a';

//
// create base UI tab and root window
//
//Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK
var win1 = Titanium.UI.createWindow({
	backgroundImage : 'images/main_1.jpg',
	title : '',
	barImage : 'images/nav.jpg',
	url : 'hotels/index.js',

	tabBarHidden : true,

});

var tab1 = Titanium.UI.createTab({
	icon : 'KS_nav_views.png',
	window : win1,

});
tabGroup.addTab(tab1);
tabGroup.open();
win1.api = global_api;
