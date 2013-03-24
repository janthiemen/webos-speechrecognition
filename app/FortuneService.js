/* This kind implements the fetchNewFortune interface using 
 * a bundled webOS Service */

enyo.kind({
	name: "FortuneService",
	kind: enyo.Component,
	components: [
		{ kind: enyo.PalmService, name: "service", 
		  service: "palm://nl.kappline.pocketsphinx.service/",
		  method: "getFortune",
		  onSuccess: "provideFortune" } ],
	fetchNewFortune: function(callback) {
		// store the callback on the request object created by call
		this.$.service.call({}, {"callback": callback});
	},
	provideFortune: function(inSender, inResponse, inRequest) {
		inRequest.callback(inResponse.fortune);
	}
});

