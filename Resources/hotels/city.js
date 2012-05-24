// create var for the currentWindow
var city_window = Ti.UI.currentWindow;
function readJsServer(city) {
	var arrayData = [];
	var loader = Titanium.Network.createHTTPClient();
	loader.open("GET", "http://api.wego.com/en/hotels/api/autocomplete/1/locations/10/" + city + ".js");
	loader.onload = function() {
		var city = eval('(' + this.responseText + ')');
		for(var i = 0; i < city.length; i++) {
			var city_id = city[i].id;
			var city_name = city[i].n;
			arrayData.push(city_name);
			arrayData.push({
				title : '' + city_name + '',
				id : city_id

			});
			tableview.setData(arrayData);

		}
	}
	loader.send();
}

var searchCity = Titanium.UI.createSearchBar({
	barColor : 'Black',
	hintText : 'Your Location',
	focusable : true
});
searchCity.addEventListener('change', function(e) {
	readJsServer(e.value)
});
searchCity.addEventListener('return', function(e) {
	searchCity.blur();
});
searchCity.addEventListener('cancel', function(e) {
	searchCity.getAutocorrect();

});
var tableview = Ti.UI.createTableView({
	search : searchCity,
	rowHeight : 'auto'

})
Ti.API.info(tableview.rowHeight)
tableview.addEventListener('click', function(e) {
	Ti.UI.currentWindow.params = e.row.id;
	var y = e.row.id;
	Ti.UI.currentWindow.initMain(100);

})
city_window.add(tableview);
readJsServer();

// call the setData function to attach the database results to the array

