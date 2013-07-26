var win = Titanium.UI.currentWindow;
win.backgroundColor='#5fc8d2';

var tableView = Titanium.UI.createTableView({backgroundColor:'transparent'});
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
                    name: json[i].SongTitle,
					//leftImage: win.artistImage,
					url:json[i].SongLink,
					musicURL: win.musicURL,
					iTunesLink: win.musicURL,
					hasChild:true,
					color:'#6b0e1a'
					
					
                });
        var label = Ti.UI.createLabel({
			text:json[i].SongTitle,
			color:'#6b0e1a',
			left:50,
			height:30
		});
		
		if(label.text.length>25){
			label.font = {fontSize:15}
		}
		var image = Ti.UI.createImageView({
	    	image: win.artistImage,
	    	left:0,
	    	width:43,
	    	hires:true,
	    	defaultImage:'images/appicon.png'
	   	});
	   	if(Ti.Platform.osname == 'ipad'){
			row.height = 80;
			label.left = 100;
			label.height = 50;
			image.width =80;
			label.font = {fontSize:30};
		}
		
	   	row.add(image);
	   	row.add(label);
	            tableData.push(row);
            }

            //Titanium.API.info(this.responseText);
	 		tableView.setData(tableData);
 			actInd.hide();
        xhr = null;
        };
	

xhr.open('GET', 'http://www.winewebdesign.com/LocalMusic/Music.php?artist='+win.artistID);
xhr.send();

tableView.addEventListener('click', function(e)
{
	if (e.rowData.name)
	{
			var PlayerWindow = Titanium.UI.createWindow({ 
					title:e.rowData.name,
					barColor:'#6b0e1a',
					barcolor:true,
					backgroundColor:'#5fc8d2'
					});
			
			var image = Ti.UI.createImageView({
				top:20});
				if(Ti.Platform.osname =='iphone'){
					image.width ='80%';
					image.height='80%';
				} else if(Ti.Platform.osname == 'ipad'){
					image.width ='50%';
					image.height='50%';
				}else{
					image.width = 200;
					image.height=200;
					image.image=win.artistImage;
				}
            
			var actInd = Titanium.UI.createActivityIndicator({
				bottom:'50%', 
				height:50,
				width:50,
				message:'Loading...',
				style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
				color:'white'
            });
            var launch_btn = Ti.UI.createButton({
      			 	title:'Buy this Song',
       				width:120,
       				height:35,
       				bottom:10,
					image:'Button_Up.gif'
			});
            
	          var iTunesURL = e.rowData.musicURL;
            PlayerWindow.add(image);
            
            var player = Titanium.Media.createAudioPlayer({
					allowBackground: false,
					preload: false,
					bufferSize:3500});
			Titanium.Media.audioSessionMode= Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;
			
			player.setUrl(e.rowData.url);
			player.start();	
			if(Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'){
				PlayerWindow.add(actInd);
				actInd.show();
			} else {
				actInd.message = 'Loading';
				PlayerWindow.add(launch_btn);
				var AndroidPause = Ti.UI.createButton({
					title:'Pause',
					width:80,
					height:35,
					bottom:100
				});
				PlayerWindow.add(AndroidPause);
				AndroidPause.addEventListener('click', function(e){
					if(e.title == 'Pause'){
						player.pause();
						e.title = 'Play';
					}else {
						player.start();
						e.title = 'Pause';
					}
				});
			}
            
			
			
           
            
            // used to evenly distribute items on the toolbar
            
            var flexSpace = Titanium.UI.createButton({
                systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
            });

            var playBtn = Titanium.UI.createButton({
                systemButton:Titanium.UI.iPhone.SystemButton.PLAY
            });
            var pauseBtn = Titanium.UI.createButton({
                systemButton:Titanium.UI.iPhone.SystemButton.PAUSE
            });
if(Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'){
            PlayerWindow.toolbar = [flexSpace,pauseBtn,flexSpace];
            }
            
            player.addEventListener('change', function(x){
            	//alert(e.state);
            	if(x.state == 4){
                	actInd.hide();
                	if(win.artistImage!==null){
                    	image.image = win.artistImage;
               		 }else{
                   			 image.opacity=0.5;
                    		image.image='appicon.png';
                	}
                	if(iTunesURL!==null){
                    	PlayerWindow.add(launch_btn);
                	}
            	}
            	if(Ti.Platform.osname !='android'){
            	if(x.state==8){
            		PlayerWindow.toolbar = [flexSpace,playBtn,flexSpace];
            	} else if(x.state==4){
            		PlayerWindow.toolbar = [flexSpace,pauseBtn,flexSpace];
            	} else if(x.state==6){
            		PlayerWindow.toolbar = [flexSpace,playBtn,flexSpace];
            	} else if(x.state==7){
            		PlayerWindow.toolbar = [flexSpace,playBtn,flexSpace];
            	} else if(x.state==0){
            		PlayerWindow.toolbar = [flexSpace,playBtn,flexSpace];
            	} else if(x.state==3){
            		PlayerWindow.toolbar = [flexSpace,pauseBtn,flexSpace];
            	} else if(x.state==5){
            		PlayerWindow.toolbar = [flexSpace,pauseBtn,flexSpace];
            	}
            	}
            });
            pauseBtn.addEventListener('click', function(){
                player.pause();
            });
            playBtn.addEventListener('click', function(){
                player.start();
            });
		
 
		launch_btn.addEventListener('click',function(e){
       		Ti.Platform.openURL(iTunesURL);
		});	   
	   PlayerWindow.addEventListener('blur', function(){
			player.stop();
	   });
			
	Titanium.UI.currentTab.open(PlayerWindow,{animated:true});		

	}
});

// add table view to the window
var actInd = Titanium.UI.createActivityIndicator({
				bottom:'50%', 
				height:50,
				width:50,
				style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
				message:"Loading...",
				color:'white',
				top:100
            });
Titanium.UI.currentWindow.add(tableView);
if(Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'){
win.add(actInd);
actInd.show();
}

win.barColor = '#6b0e1a';
		barcolor = true;
win.addEventListener('focus', function(){
	if(Ti.Network.online===false){
		alert('Your device is not currently online.\nThe Yaks Live Art application requires a network connection to create a dynamic experience!');
	}	
});