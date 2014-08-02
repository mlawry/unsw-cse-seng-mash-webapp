var http = require("http");
var url = require("url");

function start(routeFunc) {
	// See http://nodejs.org/api/http.html#http_event_request
	function onRequest(request, response) {
		// See http://nodejs.org/api/url.html
		var parsed = url.parse(request.url);

		console.log("Parsed URL object: " + JSON.stringify(parsed));

		// Use router to get an action based on the pathname.
		var actionFunc = routeFunc(parsed.pathname);
		
		if (typeof actionFunc !== "function") {
			// Router did not manage to find an appropriate action, so we return 404.
			response.writeHead(404, {"Content-Type": "text/plain"});
			response.write("HTTP 404 Not Found\n");
			response.end();
			console.log("Server response is 404 Not Found.");
		} else {
			// The action will write appropriate content to response based on search and hash. 
			actionFunc(response, parsed.search, parsed.hash);
		}
	}

	http.createServer(onRequest).listen(8080);
	console.log("Server is now listening on port 8080.");
}

// See http://openmymind.net/2012/2/3/Node-Require-and-Exports/
module.exports.startServer = start;
