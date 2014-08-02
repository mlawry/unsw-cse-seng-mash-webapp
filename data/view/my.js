function showImage(strSelector, imageHref) {
	var svgElem = d3.select(strSelector).select("svg");
	if (svgElem.empty()) {
		// create it
		svgElem = d3.select(strSelector).append("svg");
	} else {
		// Remove all child elements from <svg>, which deleted the current image.
		svgElem.select("*").remove();
	}
	
	svgElem.style("width", "100%")
		.append("image")
		.attr("xlink:href", imageHref)
		.attr("x", "0")
		.attr("y", "0")
		.attr("width", "100%")
		.attr("height", "100%");
}

function validateAndShow(strSelector, imageHref) {
	function onSuccess() {
		// Don't care what server returns, just that the ajax request was successful.
		showImage(strSelector, imageHref);
	}
	
	function onError() {
		// Server probably returned 404 error, so no image available.
		alert("There are no more images to be shown.");
	}
	
	// Use ajax to determine if imageHref actually exists.
	// See http://api.jquery.com/jQuery.ajax/
	$.ajax({
		url: imageHref,
		cache: false,
		success: onSuccess,
		error: onError
	});
}

function doNext(strSelector) {
	var imageIndex = $(strSelector).data("imageIndex");
	imageIndex = 1 + imageIndex;
	$(strSelector).data("imageIndex", imageIndex);
	
	var imageHref = "/images?" + imageIndex;
	validateAndShow(strSelector, imageHref);
}

function doPrev(strSelector) {
	var imageIndex = $(strSelector).data("imageIndex");
	imageIndex = imageIndex - 1;
	$(strSelector).data("imageIndex", imageIndex);
	
	var imageHref = "/images?" + imageIndex;
	validateAndShow(strSelector, imageHref);
}