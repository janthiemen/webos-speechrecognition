/*
 * TxJS 2011 Sample
 *
 * Fortune Cookie
 *
 * Fortune Cookie image taken from http://commons.wikimedia.org/wiki/File:Fortune_cookie.jpg, 
 * used under CC 3.0 Attribution Share Alike license.
 *
 * Fortune Cookie database from https://github.com/bmc/fortunes/, 
 * fetched from https://raw.github.com/bmc/fortunes/master/fortunes
 */

 enyo.kind({
	name: "FortuneCookieApp",
	kind: "VFlexBox",
	components: [
		// { kind: "LocalFortunes", name: "fortunes" },
		// { kind: "FortuneJar", name: "fortunes" },
		{ kind: "FortuneService", name: "fortunes" },
		// { kind: "Header", content: "TxJS 2011 - Fortune Cookie" },
		
		{kind: "enyo.MediaCapture", name: "mediaCaptureSound", onInitialized: "loadMediaCap", onLoaded: "mediaCapLoaded",onError: "someErrorOccured",onAudioCaptureComplete:"captureComplete"},
		{kind: "ApplicationEvents", onLoad: "onLoad"},
		
		//{ kind: "HFlexBox", flex: 1, components: [
		//	{ kind: "Image", src: "Fortune_cookie_320x320.png", 
		//	  style: "padding: 10px" },
			{ kind: "HtmlContent", name: "output", flex: 1, 
			  className: "fortuneCookie", 
			  content: "Press record, to record your audio. " +
			           "Press again to recognise it." }, //] },
		{kind: "Button", name:"recordSoundButton",className: "enyo-button-negative",caption: "Record",  onclick: "recordClicked"},
		//{ kind: "Button", caption: "Recognise speech", 
		//  onclick: "showNewFortune" }
	],
	//showNewFortune: function() {
	//	this.$.fortunes.fetchNewFortune(enyo.bind(this, 
	//		function(fortune) { 
	//		  this.$.output.setContent(fortune); }));
	//},
	
	
	onLoad: function(){	
		this.load();
	},
	load: function(){	
		this.$.mediaCaptureSound.initialize();
		
	},
	unload: function(){	
		this.$.mediaCaptureSound.unload();
	},
	loadMediaCap: function(inSender, inResponse){
		
		for (var format in inResponse){
			console.log("ENDA " + format)
			if(format.search("audio")==0){
				md = inResponse[format].deviceUri; 
				for (i = 0; inResponse[format].supportedAudioFormats.length != i; ++i) {
					fmt = inResponse[format].supportedAudioFormats[i];
					
					if (fmt.mimetype == "audio/vnd.wave") {
						break;
					}
				}
				console.log(JSON.stringify(fmt));
				break;	
			}			
		}
		this.$.mediaCaptureSound.load(md, fmt);
	},
	mediaCapLoaded: function(){
		this.showScrim(false);
		var can = this.$.canvas.hasNode();
	},
	recordClicked:function()
	{
		if (!this.recording) {
			this.$.recordSoundButton.caption = "Recording...";
			this.$.recordSoundButton.render();
			this.recording = true;
			timestamp = new Date().getTime();
			var file = "/media/internal/pocketsphinx/temp/data.wav";
			var audioCaptureOptions = {"mimetype":"audio/vnd.wave","codecs":"1","bitrate":128000,"samplerate":8000};
			
			this.$.mediaCaptureSound.startAudioCapture(file, audioCaptureOptions);
			this.timestart = new Date().getTime()
			this.timer = window.setInterval(this.updateTime1.bind(this), 1000);
			
		}else{			
			console.log("WTF")
			this.recording = false;
			this.$.mediaCaptureSound.stopAudioCapture();
			window.clearInterval(this.timer);
			
			this.$.output.setContent("Recognising ..."); 
			this.$.fortunes.fetchNewFortune(enyo.bind(this, 
			function(fortune) { 
				this.$.output.setContent(fortune); 
			}));
		}	
	},
	captureComplete:function()
	{
		console.log("WTF COMPLETE")
		this.$.recordSoundButton.setContent( "Record");
	},
	updateTime1: function(insender){
		if(!this.timestart){
			this.timestart = new Date();
		}
		var timeend = new Date();
		var timedifference = timeend.getTime() - this.timestart
		timeend.setTime(timedifference);
		var minutes_passed = timeend.getMinutes();
		if(minutes_passed < 10){
			minutes_passed = "0" + minutes_passed;
		}
		var seconds_passed = timeend.getSeconds();
		if(seconds_passed < 10){
			seconds_passed = "0" + seconds_passed;
		}	
		
		this.$.recordSoundButton.setContent ( "Recording... " +  minutes_passed + ":" + seconds_passed);
	},
 });
 
