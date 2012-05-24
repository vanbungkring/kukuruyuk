var win = Ti.UI.currentWindow;
function initMain() {
	var data = [];
	var row = Ti.UI.createTableViewRow();
	for(var c = 1; c < 170000000; c++) {
		var row = Ti.UI.createTableViewRow();
		row.selectedBackgroundColor = '#fff';
		row.className = 'datarow';
		row.clickName = 'row';

		var user = Ti.UI.createLabel({
			color : '#576996',
			font : {
				fontSize : 16,
				fontWeight : 'bold',
				fontFamily : 'Arial'
			},
			left : 70,
			top : 2,
			height : 30,
			width : 200,
			clickName : 'user',
			text : 'Fred Smith ' + c
		});

		row.filter = user.text;
		row.add(user);

		var fontSize = 16;
		if(Titanium.Platform.name == 'android') {
			fontSize = 14;
		}
		var comment = Ti.UI.createLabel({
			color : '#222',
			font : {
				fontSize : fontSize,
				fontWeight : 'normal',
				fontFamily : 'Arial'
			},
			left : 70,
			top : 21,
			bottom : 2,
			height : 50,
			width : 200,
			clickName : 'comment',
			text : 'Got some fresh fruit, conducted some business, took a nap'
		});
		row.add(comment);

		data.push(row);
	}
	var tableData = Ti.UI.createTableView({
		backgroundColor : 'transparent',
		data : data
	});
	win.add(tableData);
}

initMain();
