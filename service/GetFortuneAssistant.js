var libraries = MojoLoader.require(
	{ name: "foundations", version: "1.0" });
var fs = IMPORTS.require("fs");

var GetFortuneAssistant = function(){
};
  
GetFortuneAssistant.prototype = {
	_fortunes: [],
	
	run: function(f) {  
		var exec = IMPORTS.require("child_process").exec;

		//===================================//
		fs.createReadStream('/media/internal/pocketsphinx/temp/data.wav').pipe(fs.createWriteStream('data/data.wav'));
		unzip = exec('pocketsphinx_batch',
		function (error, stdout, stderr) {
			var file = fs.readFileSync("out.txt", "utf8");
			f.result = {
				"fortune": file, 
				"returnValue": true };
		});
		}
};
