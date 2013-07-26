var win = Titanium.UI.currentWindow;

var actInd = Titanium.UI.createActivityIndicator({ 
				height:50,
				width:50,
				style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
				color:'white'
            });

var video = Titanium.Media.createVideoPlayer ({
	url:win.mediaURL,
	movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT
});
video.play();
win.addEventListener('blur', function(){
	video.pause();
});
if(Ti.Platform.osname !='android'){
win.add(video);
win.add(actInd);
actInd.show();
}

video.addEventListener('playing', function(e){
	if(Ti.Platform.osname !='android'){
	actInd.hide();
	}
});

win.addEventListener('blur', function(){
	video.pause();
});

win.addEventListener('focus', function(){
if(Ti.Network.online==false){
	alert('Your device is not currently online.\nThe Yaks Live Art application requires a network connection to create a dynamic experience!');
}	
});
