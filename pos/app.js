var execFile = require('child_process').execFile;


// bucketid: 02b560e4a3ba3cf97189aeb8
// some random fileid i uploaded earlier: aa7ed9ecb77dac6725705d69

var envVariables = { STORJ_KEYPASS: "ethstarter"}

var storjUploadFile = function(bucketid, filePath, callback) {
   args = ["upload-file",bucketid, filePath]
   console.log("storjTest() start");
   execFile('storj.exe', args, {
   		env:envVariables
   	}, function(err, data) {
        console.log(err)
        var storjResponse = data.toString();
        console.log(storjResponse);
        // lol hacky af
        if(storjResponse.indexOf("Upload Success!") > -1) {
	        parts = storjResponse.split(' ');
	        fileid = parts.pop();
	        callback(fileid);
    	}
    });
}

var testStorjUpload = function() {
	storjUploadFile('02b560e4a3ba3cf97189aeb8', 'profitfile6.txt', function(fileid) {
		console.log("got file id:" + fileid);
	});
}

var storjDownloadFile = function(bucketid, fileid, filepath, callback) {
   args = ["download-file",bucketid, fileid, filepath]
   console.log("storjTest() start");
   execFile('storj.exe', args, {
   		env:envVariables
   	}, function(err, data) {
        console.log(err)
        var storjResponse = data.toString();
        console.log(storjResponse);
        // lol hacky af
        if(storjResponse.indexOf("Download Success!") > -1) {
	        callback(true);
    	}
    	else {
    		callback(false);
    	}
    });
}

var testStorjDownload = function() {
	storjDownloadFile('02b560e4a3ba3cf97189aeb8', 'aa7ed9ecb77dac6725705d69', 'dl4.txt',  function(success) {
			if(success == true) {
				console.log("Downloaded the file")
			}
			else {
				console.log("Failed to download the file")
			}
	});
}

//testStorjUpload(); // basically have to change the filename every time you upload so its different
//testStorjDownload(); //haveto change the filename every time you downlaod so you can overwrite

module.exports = {
  storjUploadFile,
  storjDownloadFile,
  testStorjUpload,
  testStorjDownload
}
