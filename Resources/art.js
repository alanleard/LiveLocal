var win = Titanium.UI.currentWindow;
win.backgroundColor='#5fc8d2';

var ImageStore = Ti.Filesystem.applicationDataDirectory + '/CachedRemoteImages';
			var dir = Ti.Filesystem.getFile(ImageStore);
			if (!dir.exists()) {
			    dir.createDirectory();
			}

function cache(image, imageURL) {
			
		    if (imageURL.length>4) {
		   
		        var hashedSource = Ti.Utils.md5HexDigest(imageURL + '') + '.' + imageURL.split('.').pop();
		        
		        var localImage = Ti.Filesystem.getFile(ImageStore, hashedSource) || null;
		       	if(localImage){
			        if (localImage.exists()) {
			   
			            image.image = localImage.nativePath;
						image.height = image.toImage().height;
			            image.width = image.toImage().width;
			        }
			        else {
						var xhr3 = Titanium.Network.createHTTPClient();
						
						
						xhr3.onload = function()
						{
							localImage.write(this.resposeData);
							
							image.image = localImage.nativePath;
							xhr3 = null;
						};
					
						// open the client
						xhr3.open('GET',imageURL);
						
						// send the data
						xhr3.send();
			           // image.image = imageURL;
			           // image.addEventListener('load', function() {
			           //     localImage.write(image.toImage());
			           // });
			            
			        }
		        }
		        
		    }
		}
		
var artView = Titanium.UI.createTableView({
	backgroundColor:'#5fc8d2'
});
var tableData = [];
var actInd = Titanium.UI.createActivityIndicator({
				bottom:'50%', 
				height:50,
				width:50,
				style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
				message:'Loading...',
				color:'white',
				top:105
            });


var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function(){
    var artists = JSON.parse(this.responseText);
    for(i=0;i<artists.length;i++){
		
		 var row = Ti.UI.createTableViewRow({
		 	//leftImage:artists[i].leftImage,
			color:'#6b0e1a',
			name: artists[i].name,
			art:artists[i].artID,
			hasChild:true,
			left:35
		});
		

		var label = Ti.UI.createLabel({
			text:artists[i].name,
			color:'#6b0e1a',
			left:50,
			height:30
		});
		var image = Ti.UI.createImageView({
	    	image: artists[i].artIcon,
	    	//url:artists[i].artIcon,
	    	left:0,
	    	width:43
	    	
	   	});
	   	
	   	if(Ti.Platform.osname!='android'){
	   		cache(image,artists[i].artIcon );
	   		image.image = artists[i].artIcon;
	   		image.hires=true;
	    	image.defaultImage='images/appicon.png';
	   	} else {
	   		//alert(artists[i].artIcon);
	   		//image.image = 'http://petsareourpassion.com/clients/3668/images/320_HomeIcon.png';
	   		//image.image= artists[i].artIcon;
	   		image.height = 43;
	   	}
	   	if(Ti.Platform.osname == 'ipad'){
			row.height = 80;
			label.left = 100;
			label.height = 50;
			image.width =80;
			label.font = {fontSize:30};
		}
		
	   	row.add(image);
	   	row.add(label);
		/*
		if(image.image.length<4){
			image.image= 'images/appicon.png';
		}
		*/
	tableData.push(row);
	}

artView.setData(tableData);
if(Ti.Platform.osname!='android'){
actInd.hide();
}
xhr = null;
   }
xhr.open('GET', 'http://www.winewebdesign.com/LocalMusic/Art.php');
xhr.send();

artView.addEventListener('click', function(e){

	var win1 = Ti.UI.createWindow({
		backgroundColor:'#000'
	});
	
	var label = Ti.UI.createLabel({
		text:e.rowData.name,
		top:5,
		color:'white',
		shadowColor:'#000',
		shadowOffset:5,
		width:'auto',
		height:'auto',
		textAlign:'center',
		font:{fontSize:30, fontFamily: 'Georgia'}
	});
	var back = Ti.UI.createImageView({
		image:'images/back.png',
		height:30,
		width:30,
		bottom: 0,
		left:10,
		hires:true,
		opacity:1.0
	});
	//var images = e.source.art;
	
	if(Ti.Platform.osname !='android'){
		win1.open({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
	} else{win1.open();}

	var artviews = [];
	var artwork = [];
	var xhr = Titanium.Network.createHTTPClient();
	
	xhr.onload = function(){
	    var art = JSON.parse(this.responseText);

	   if(art[0].artworkLink.length>4){
	    
		for(i=0;i<art.length;i++){
			artwork.push(art[i].artworkLink);
		}
		
		for(i=0;i<artwork.length;i++){
			var scrollView = Ti.UI.createScrollView({
				maxZoomScale:5.0,
				minZoomScale:1.0,
				zoomScale:1.0,
			});
			
			var imgView = Ti.UI.createImageView({
				image:artwork[i],
				//preventDefaultImage:true,
				//hires:true
			});
			var actInd = Titanium.UI.createActivityIndicator({
				height:50,
				width:50,
				style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
				message:'Loading...',
				color:'white'
            });
			if(Ti.Platform.osname != 'android'){
				scrollView.add(actInd);
				actInd.show();
				scrollView.add(imgView);
				artviews.push(scrollView);
			} else {
				artviews.push(imgView);
			}
			
			
			
			imgView.addEventListener('load', function(){
				if(Ti.Platform.osname != 'android'){
				actInd.hide();
				}
			});
			
			//alert(artviews.length);
			
			}
		var scrollableView = Ti.UI.createScrollableView({
			views:artviews,
			showPagingControl:true,
			pagingControlHeight:20,
			top:40
		});
	
		win1.add(scrollableView);
		win1.add(label);
		win1.add(back);

	xhr = null;

	
	back.addEventListener('click', function(){
		back.opacity = 0.5;
		
		if(Ti.Platform.osname !='android'){
			win1.close({transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
		} else{win1.close();}
		
	});
	} else {
		alert('No artwork has been loaded for '+e.rowData.name+' yet.');
	}
};
xhr.open('GET', 'http://www.winewebdesign.com/LocalMusic/Artwork.php?artID='+e.rowData.art);
xhr.send();	
	

});

win.add(artView);

if(Ti.Platform.osname != 'android'){
	win.add(actInd);
	actInd.show();
}
win.addEventListener('focus', function(){
	if(Ti.Network.online==false){
		alert('Your device is not currently online.\nThe Yaks Live Art application requires a network connection to create a dynamic experience!');
	}	
});
