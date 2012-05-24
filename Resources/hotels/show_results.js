// Create variable "win" to refer to current window
var win = Titanium.UI.currentWindow;
var tab = Ti.UI.currentTab;
var filterbar = Ti.UI.createToolbar({
	barColor : '#000',
	bottom : 0,
	zIndex : 1000
})
win.add(filterbar);
Ti.include("/lib_extend/progress.view.js");
var progressView = new ProgressView();

function setParameters() {
	var start_date = '2012-12-13';
	var end_date = '2012-12-25';
	var city = 3400;
	//alert(city);
	if(Titanium.Network.networkType != Titanium.Network.NETWORK_NONE) {
		getSearchResult(start_date, end_date, city)
	} else {

		progressView.show({
			text : "No Internet Connection",
			error : true
		});
		setTimeout(function() {
			progressView.hide();
		}, 2000);
	}
};

function getCity() {

}

function getSearchResult(start_date, end_date, city) {

	var loaders = Titanium.Network.createHTTPClient();
	var x = "http://api.wego.com/hotels/api/search/new?location_id=" + city + "&check_in=" + start_date + "&check_out=" + end_date + "&api_key=" + win.api;
	Ti.API.info(x);
	loaders.open("GET", x);
	loaders.onload = function() {
		var get_result = eval('(' + this.responseText + ')');
		var id = get_result.search_id;
		searchResultShow(id);
		Ti.API.info(id);
	};
	loaders.send();
}

function searchResultShow(search_id) {
	progressView.show({
		text : "Retrive Data",
	});
	// Empty array "rowData" for our tableview
	var rowData = [];
	// Create our HTTP Client and name it "loader"
	var loader = Titanium.Network.createHTTPClient();
	// Sets the HTTP request method, and the URL to get data from
	loader.open("GET", "http://api.wego.com/hotels/api/search/" + search_id + "?api_key=" + win.api);
	var x = "http://api.wego.com/hotels/api/search/" + search_id + "?api_key=" + win.api;
	Ti.API.info(x);
	// Runs the function when the data is ready for us to process
	loader.onload = function() {

		var hotels_main = eval('(' + this.responseText + ')');
		for(var i = 0; i < hotels_main.count; i++) {

			var hotel_id = hotels_main.hotels[i].id;

			var hotels_name = hotels_main.hotels[i].name;
			var hotels_address = hotels_main.hotels[i].address;

			var hotels_desc = hotels_main.hotels[i].desc;
			//alert(hotel_desc);
			var hotels_stars = hotels_main.hotels[i].stars;
			//alert(hotels_stars);
			var hotels_best_price = hotels_main.hotels[i].room_rate_min.price_str;
			//alert(hotels_best_price);
			var hotels_image = hotels_main.hotels[i].image;
			var hotels_link = hotels_main.hotels[i].url;
			//alert(hotels_image);
			// Create the view that will contain the text and avatar
			var row = Titanium.UI.createTableViewRow({
				minHeight : Ti.Platform.displayCaps.platformHeight / 7,
				hasChild : true
			});
			var post_view = Titanium.UI.createView({
				height : Ti.Platform.displayCaps.platformHeight / 7,
				layout : 'vertical',

			});
			var hotel_price = Titanium.UI.createLabel({
				text : hotels_best_price,
				color : '#ff6600',
				font : {
					fontFamily : 'HelveticaNeue-CondensedBold',
					fontSize : 20,
					fontWeight : 'bold'
				},
				left : 30,
				top : 20
			});
			post_view.add(hotel_price);
			var hotel_images = Titanium.UI.createImageView({
				image : hotels_image,
				width : 60,
				height : 60,
				left : 70,
				borderRadius : '5px',
				top : -44,
				borderColor : '#ccc',
				borderWidth : 1,
			});
			post_view.add(hotel_images);
			var hotel_names = Titanium.UI.createLabel({
				text : hotels_name,
				font : {
					fontFamily : 'HelveticaNeue-CondensedBold',

				},
				size : 14,
				left : 140,
				top : -60
			});
			post_view.add(hotel_names);
			var hotel_addresses = Titanium.UI.createLabel({
				text : hotels_address,
				font : {
					//fontFamily : 'HelveticaNeue-CondensedBold',
					fontSize : 12,
					//fontWeight : 'bold'
					color : '#ff6600'
				},
				left : 140,
				top : 0
			});

			post_view.add(hotel_addresses);
			var hotel_link = Titanium.UI.createLabel({
				text : hotels_link,
				width : 0,
				height : 0
			})
			post_view.add(hotel_link);
			row.add(post_view);
			post_view.addEventListener('click', function(e) {

				var links = e.row.children[0].children[4].text
				var win_detail_hotels = Ti.UI.createWindow({
					title : e.row.children[0].children[2].text,
					backButtonTitle : 'Back',
					barImage : '../images/navbar.png',
					url : 'details.js'
				});
				win_detail_hotels.search_id_pass = search_id;
				win_detail_hotels.link = links;
				tab.open(win_detail_hotels);

			})
			// Give each row a class name
			row.className = "item" + i;
			// Add row to the rowData array
			rowData[i] = row;
		}
		// Create the table view and set its data source to "rowData" array

		var tableView = Titanium.UI.createTableView({
			data : rowData,
			separatorColor : '#ececec',
			bottom : 44
		});
		//Add the table view to the window
		win.add(tableView);

	};

	loader.onerror = function(e) {
		alert('Connection error')
	};
	loader.ondatastream = function(e) {
		alert('pickingup data');
	};
	// Send the HTTP request
	loader.send();
}

setParameters();
//searchResultShow();
