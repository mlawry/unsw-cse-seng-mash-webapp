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

function doNext(strSelector) {
	var imageIndex = $(strSelector).data("imageIndex");
	imageIndex = 1 + imageIndex;
	$(strSelector).data("imageIndex", imageIndex);
	
	var imageHref = "/images?" + imageIndex;
	showImage(strSelector, imageHref);
}

function doPrev(strSelector) {
	var imageIndex = $(strSelector).data("imageIndex");
	imageIndex = imageIndex - 1;
	$(strSelector).data("imageIndex", imageIndex);
	
	var imageHref = "/images?" + imageIndex;
	showImage(strSelector, imageHref);
}