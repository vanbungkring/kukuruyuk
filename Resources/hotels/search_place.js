var win = Ti.UI.currentWindow;
function pushData() {
	var region = db.execute('select id,name from wego_city Order By id');
	var i = 0;
	while(region.isValidRow()) {
		var name = region.fieldByName('name');
		alert(name);
	}

}

pushData();
