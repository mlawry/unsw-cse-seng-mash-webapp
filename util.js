// Tests the given pathname string and returns true if all characters in
// pathname exist in allowedChars array. If pathname contains characters not
// in allowedChars, then returns false.
// allowedChars - an array of characters (ie string of length 1).
function isGoodPathname(pathname, allowedChars) {
	// Returns true if ch is not any one of the allowed characters.
	function isCharNotInAllowed(ch) {
		// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
		return allowedChars.every(function (value) {
			return (ch !== value);
		});
	};

	if (allowedChars) {
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
	}
	// allowedChars not defined or null, or pathname is not a string.
	return false;
}

module.exports.isGoodPathComponent = isGoodPathname