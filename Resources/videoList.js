var win = Titanium.UI.currentWindow;
win.backgroundColor = '#5fc8d2';
//Create Table
if(Ti.Network.online==false){
	alert('Your device is not currently online.\nThe Yaks Live Art application requires a network connection to create a dynamic experience!');
}
var tableView = Titanium.UI.createTableView({
	backgroundColor:'#5fc8d2'
});

var actInd = Titanium.UI.createActivityIndicator({
				bottom:'50%', 
				height:50,
				width:50,
				style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
				message:'Loading...',
				color:'white',
				top:105
            });



var tableData = [];

//Read from JSON 
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function(){
    var json = JSON.parse(this.responseText);
    if (!json) { 
        //Titanium.API.info('Error - Null return!'); 
        return;
    }

//Build the table rows by looping through the JSON	

	
	
	for(var i=0; i<json.length; i++){
	   
	   var row = Ti.UI.createTableViewRow({
                    name: json[i].name,
					hasChild:true,
					mediaURL: json[i].art,
					artistImage: json[i].artIcon,
					artistID: json[i].artID,
					color:'#6b0e1a'
					
                });
                
                
        var label = Ti.UI.createLabel({
			text:json[i].name,
			color:'#6b0e1a',
			left:50
		});
		
		var image = Ti.UI.createImageView({
	    	image: json[i].artIcon,
	    	left:0,
	    	width:43,
	    	hires:true,
	    	defaultImage:'images/appicon.png'
	   	});
	   	if(Ti.Platform.osname == 'ipad'){
			row.height = 80;
			row.left = 80;
			label.height = 50;
			image.width =80;
			label.font = {fontSize:20};
		}
		
	   	row.add(image);
	   	row.add(label);
	   	if(Ti.Platform.osname == 'ipad'){
			row.height = 80;
			label.left = 100;
			image.width =80;
			label.font = {fontSize:30};
		}
	  
	  	tableData.push(row);
            }

            //Titanium.API.info(this.responseText);
	 		tableView.setData(tableData);
 actInd.hide();
 xhr = null;
        };
	

xhr.open('GET', 'http://www.winewebdesign.com/LocalMusic/videos.php');
xhr.send();


// create table view data object



// create table view event listener
tableView.addEventListener('click', function(e)
{
	if (e.rowData.name)
	{
		var win = Titanium.UI.createWindow({
            url:'videos.js',
            mediaURL:e.rowData.mediaURL,
            barColor: '#6b0e1a',
            title:e.rowData.name
           
		});
		Titanium.UI.currentTab.open(win,{animated:true});

	}
});

// add table view to the window
Titanium.UI.currentWindow.add(tableView);
if(Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'){
win.add(actInd);
}
actInd.show();
win.barColor = '#6b0e1a';
		barcolor = true;
