function isGoodPathname(pathname) {
	var allowedChars = [
		'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
		't','u','v','w','x','y','z','/','0','1','2','3','4','5','6','7','8','9'];
	
	// Returns true if ch is not any one of the allowed characters.
	var isCharNotInAllowed = function (ch) {
		// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
		return allowedChars.every(function (value) {
			return (ch !== value);
		});
	};
	
	if (typeof pathname === "string") {
		for (var i = 0; i < pathname.length; ++i) {
			var ch = pathname.charAt(i);
			if (isCharNotInAllowed(ch)) {
				// ch is an invalid character.
				return false;
			}
		}
		// Getting here means all characters are allowed.
		return true;
	}
	// Pathname is not a string, so that's not valid either.
	return false;
}

function route(pathname) {
	// IMPORTANT SECURITY CONSIDERATION: Prevent hacking with pathnames such as
	// ../../../etc/passwd, or ../../your/bank/details. We allow only a very
	// small (but still useful) set of characters in the pathname.
	if (!isGoodPathname(pathname)) {
		console.log("WARNING!! Dubious pathname ignored: " + pathname);
		return null;
	}
	
	// We return an action object by looking up the 'actions' subdirectory. So if the path
	// is /images, then we expect a file by the name of ./actions/images.js to exist that
	// will export an action function that we can return.
	var actionJs = "./actions" + pathname;
	console.log("Routing request for '" + pathname + "' to action '" + actionJs + ".js'");
	
	try {
		var actionObj = require(actionJs);
		return actionObj.action;
	} catch (ex) {
		console.log("Routing exception: " + JSON.stringify(ex));
		return null;
	}
}

module.exports.route = route;
