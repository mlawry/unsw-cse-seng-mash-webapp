var fs = require('fs');
var util = require("../util");

// No '/' character. Includes '.' character.
var allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
	'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	'.'];

// Adds method string.endsWith()
if (!String.prototype.endsWith) {
	Object.defineProperty(String.prototype, 'endsWith', {
		value: function(searchString, position) {
			var subjectString = this.toString();
			if (position === undefined || position > subjectString.length) {
				position = subjectString.length;
			}
			position -= searchString.length;
			var lastIndex = subjectString.indexOf(searchString, position);
			return lastIndex !== -1 && lastIndex === position;
		}
	});
}

// Within this action function, you can write directly to the response parameter.
// You must call response.end() when done to let HTTP server know the response is completed.
function action(response, requestSearch, requestHash) {
	// Drop the first char which is always "?"
	var fileName = requestSearch.substring(1);

	// SECURITY CONCERN: Since we are going to use requestSearch to form a file name, prevent
	// bad file names from been used that may compromise system security.
	if (!util.isGoodPathComponent(fileName, allowedChars)) {
		response.writeHead(404);
		response.write("HTTP 404 File Not Found\n");
		response.end();
		return;
	}

	var filePath = "./data/view/" + fileName;

	fs.readFile(filePath, { encoding: "utf-8" }, function(err, htmlStr) {
		if (err) {
			// Failed to read the file data.
			response.writeHead(500);
			console.log("Error reading file " + filePath + ": " + JSON.stringify(err));
		} else {
			// Need to workout the correct content type. Assume HTML by default.
			var ctype = "text/html";
			if (fileName.endsWith(".js")) {
				ctype = "application/javascript";
			} else if (fileName.endsWith(".txt")) {
				ctype = "text/plain";
			}

			response.writeHead(200, {
				'Content-Type': (ctype + '; charset=utf-8')
			});
			response.write(htmlStr, "utf-8");
			console.log("Successfully sent file: " + filePath);
		}
		response.end();
	});
}

module.exports.action = action;