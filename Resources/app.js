// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var bgMusic = Titanium.Media.createSound({
	url:'music/garrett.m4a',
	allowBackground: false,
	looping:true
});
Titanium.Media.audioSessionMode= Titanium.Media.AUDIO_SESSION_MODE_PLAYBACK;
bgMusic.play();
//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Yaks Live Art',
    backgroundColor:'#5fc8d2',
    navBarHidden:true,
    barColor:'#6b0e1a'
    
});

var tab1 = Titanium.UI.createTab({  
    icon:'Home.png',
    title:'Home',
    backgroundColor:'#5fc8d2',
    window:win1
});

var tickets = Ti.UI.createButton({
	title:'Buy Tickets',
	width:'100',
	height:30,
	bottom:10,
	left:10,
	style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	
});

var facebook = Ti.UI.createImageView({
	image:'images/fb.png',
	height:35,
	width:35,
	bottom:8,
	right:10
});

facebook.addEventListener('click', function(){
	if(Ti.Platform.osname !='android'){if(Ti.Platform.canOpenURL('fb://profile/177105472358663/wall')){
		Ti.Platform.openURL('fb://profile/177105472358663/wall');
	} else {
		Ti.Platform.openURL('http://facebook.com/yaksliveart');
	}
	} else {
		Ti.Platform.openURL('http://facebook.com/yaksliveart');
	}
	
});
tickets.addEventListener('click',function(){
	var dialog = Titanium.UI.createOptionDialog({
		title: 'Buy tickets to the Cascade show on Friday, September 16th, 2011',
		options: ['Call Box Office','Buy Online','Email Info','Cancel'],
		cancel:3
	});
	dialog.show();
	
	dialog.addEventListener('click', function(e){
		if(e.index===1){
			Ti.Platform.openURL('https://tickets.cascadetheatre.org/ticketing/selectseats_ichart.php?chart_id=412&s_id=436&p_id=4682830');
	 } else if (e.index===0){
	 	Ti.Platform.openURL('tel:5302438877');
	 } else if (e.index===2){
	 	var email = Titanium.UI.createEmailDialog({
	 		barColor:'#6b0e1a',
	 		subject:'Yaks Live Art Tickets for September 16th, 2011',
	 		html:true,
	 		messageBody:'<p>Yaks Live Art will be at the Cascade Theatre on September 16th, 2011.</p><p>Tickets range from $18 - $30.</p><p><a href = "http://www.cascadetheatre.org/Calendar.asp?View=EVENT&EventID=1980&Date=09/16/2011&SectionID=1005" target=_blank>Buy Tickets Online</a> or Call the Box Office at (530)243-8877</p><p>&nbsp</p><p>&nbsp</p><p><i>Sent from the Yaks Live Art mobile app created by Alan Leard at <a href="mailto:info@winewebdesign.com">info@winewebdesign.com</a>.'
	 	});
	 	email.open();
	 }
	});
	 
});


var bgImage = Ti.UI.createImageView({
	//image:'images/HomePage_Portrait.png',
	top:0,
	left:0
});
if(Ti.Platform.osname !='android'){
bgImage.height = '100%';
bgImage.width = '100%';
}else{
	bgImage.height = Ti.Platform.displayCaps.platformHeight;
	bgImage.width = Ti.Platform.displayCaps.platformWidth-40;
}

var portImage = 'images/HomePage_Portrait.png'
var landImage = 'images/HomePage_Landscape.png'
if(Ti.Platform.displayCaps.platformHeight>Ti.Platform.displayCaps.platformWidth){
	bgImage.image = portImage
} else {
	bgImage.image = landImage
}

Ti.Gesture.addEventListener('orientationchange',function(){
if(Ti.Platform.displayCaps.platformHeight>Ti.Platform.displayCaps.platformWidth){
	bgImage.image = portImage;
} else {
	bgImage.image = landImage;
}	
if(Ti.Platform.osname !='android'){
	bgImage.height = '100%';
	bgImage.width = '100%';
}
});


win1.add(bgImage);

win1.add(facebook);
var date = new Date();

	var showdate = parseInt(1316160000);
   

    var newDate = new Date();
    newDate.setTime((showdate*1000));

    var d1 = date.getTime();
    var d2 = newDate.getTime();
   


if(d1<d2){
	win1.add(tickets);
	
} else{
	landImage = 'http://www.winewebdesign.com/yakslive/appImages/Default-Landscape.png'
	portImage = 'http://www.winewebdesign.com/yakslive/appImages/Default.png'
	if(Ti.Platform.displayCaps.platformHeight>Ti.Platform.displayCaps.platformWidth){
	bgImage.image = portImage
} else {
	bgImage.image = landImage
}
}

if(Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'){
var flexSpace = Titanium.UI.createButton({
                systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
            });

            var play = Titanium.UI.createButton({
                systemButton:Titanium.UI.iPhone.SystemButton.PLAY
            });
            var pause = Titanium.UI.createButton({
                systemButton:Titanium.UI.iPhone.SystemButton.PAUSE
            });
           	var stop = Titanium.UI.createButton({
                systemButton:Titanium.UI.iPhone.SystemButton.STOP
            });
            
            win1.toolbar = [flexSpace,pause,flexSpace];
            pause.addEventListener('click', function(){
                bgMusic.pause();
                win1.toolbar = [flexSpace,play,flexSpace];
            });
            play.addEventListener('click', function(){
                bgMusic.play();
                win1.toolbar = [flexSpace,pause,flexSpace];
            });
            
            bgMusic.addEventListener('interrupted', function(e){
					win1.toolbar = [flexSpace,play,flexSpace];
            });
            
            bgMusic.addEventListener('resume', function(e){
            		win1.toolbar = [flexSpace,pause,flexSpace];
            });
            
}
//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Local Art',
    backgroundColor:'#5fc8d2',
    barColor:'#6b0e1a',
    url:'art.js'
});
var tab2 = Titanium.UI.createTab({  
    icon:'Art.png',
    title:'Art',
    window:win2,
    backgroundColor:'#5fc8d2'
});


//
// create controls tab and root window
//
var win3 = Titanium.UI.createWindow({  
    title:'Local Music',
    backgroundColor:'#5fc8d2',
    barColor:'#6b0e1a',
    url:'Artists.js'
});
var tab3 = Titanium.UI.createTab({  
    icon:'Music.png',
    title:'Music',
    window:win3,
    backgroundColor:'#5fc8d2'
});

//
// create controls tab and root window
//
var win4 = Titanium.UI.createWindow({  
    title:'Local Video',
    backgroundColor:'#000',
    barColor:'#6b0e1a',
    url:'videoList.js'
});
var tab4 = Titanium.UI.createTab({  
    icon:'Video.png',
    title:'Video',
    window:win4,
    backgroundColor:'#5fc8d2'
});
//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2); 
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  


// open tab group
if(Ti.Platform.osname =='iphone' || Ti.Platform.osname =='ipad'){
tabGroup.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
} else {tabGroup.open();}

win1.addEventListener('blur', function(){
	bgMusic.stop();
});

var contact = Ti.UI.createImageView({
	image:'images/share.png',
	height:40,
	width:40,
	left:5,
	top:2
});


contact.addEventListener('click',function(){
	var dialog = Titanium.UI.createOptionDialog({
		title: 'Share this App with your friends and family, or choose who you would like to contact.',
		options: ['Share this App','Yaks Live Art','Yaks Koffee Shop','Application Developer', 'Cancel'],
		cancel:4
	});
	dialog.show();
	
	dialog.addEventListener('click', function(e){
		var email = Titanium.UI.createEmailDialog({
	 		barColor:'#6b0e1a',
	 		//subject:'Yaks Live Art Tickets for September 16th, 2011',
	 		html:true,
	 		//messageBody:'<p>Yaks Live Art will be at the Cascade Theatre on September 16th, 2011.</p><p>Tickets range from $18 - $30.</p><p><a href = "http://www.cascadetheatre.org/Calendar.asp?View=EVENT&EventID=1980&Date=09/16/2011&SectionID=1005" target=_blank>Buy Tickets Online</a> or Call the Box Office at (530)243-8877</p><p>&nbsp</p><p>&nbsp</p><p><i>Sent from the Yaks Live Art mobile app created by Alan Leard at <a href="mailto:info@winewebdesign.com">info@winewebdesign.com</a>.'
	 	});
		
		if(e.index===0){
			email.messageBody = '<a href = "http://itunes.apple.com/us/app/yaksliveart/id447551915?mt=8" target=_blank>Check out the Yaks Live Art App!</a>';
			email.subject = 'The Yaks Live Art App!'
	 	} else if (e.index===1){
	 		email.messageBody = 'Tell me more about Yaks Live Art!';
	 		email.subject = 'Yaks Live Art App Contact';
	 		email.toRecipients = ['yaksliveart@yahoo.com'];
	 	} else if (e.index===2){
	 		email.messageBody = 'Love the koffee, love the app!';
	 		email.subject = 'Yaks Live Art App Contact';
	 		email.toRecipients = ['yakscoffee@yahoo.com'];
	 	}else if (e.index===3){
	 		email.messageBody = "Tell me more about getting my own app!";
	 		email.subject = 'Yaks Live Art App Contact';
	 		email.toRecipients = ['info@winewebdesign.com'];
	 	}
	 	if(e.index!=4){
	 		email.open();
	 	}
	});
	 
});

win1.add(contact);


win1.addEventListener('focus', function(){
	bgMusic.play();
	win1.toolbar = [flexSpace,pause,flexSpace];
});
