var fs = require('fs');

// Within this action function, you can write directly to the response parameter.
// You must call response.end() when done to let HTTP server know the response is completed.
function action(response, requestSearch, requestHash) {
	var fileName;
	switch (requestSearch) {
	case "?1":
		fileName = "1.png";
		break;
	case "?2":
		fileName = "2.png";
		break;
	case "?3":
		fileName = "3.png";
		break;
	default:
		response.writeHead(404);
		response.write("HTTP 404 File Not Found\n");
		response.end();
		return;
	}
	var filePath = "./data/" + fileName;
	
	fs.readFile(filePath, function(err, buffer) {
		if (err) {
			// Failed to read the image file data.
			response.writeHead(500);
			console.log("Error reading file " + filePath + ": " + JSON.stringify(err));
		} else {
			// Return the image data.
			response.writeHead(200, {
				'Content-Type': 'image/png'
			});
			response.write(buffer);
			console.log("Successfully sent the contents of file: " + filePath);
		}
		response.end();
	});
}

module.exports.action = action;
