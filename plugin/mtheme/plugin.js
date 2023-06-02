window.RevealMtheme = window.RevealMtheme || {
	id: "RevealMtheme",
	init: (deck) => {
		initMtheme(deck);
	},
};

const initMtheme = function (Reveal) {
	Reveal.on("ready", (event) => {
		replaceMtheme(event);
	});
	Reveal.on("slidechanged", (event) => {
		replaceMtheme(event);
	});
};

const replaceMtheme = function (event) {
	const slide = event.currentSlide;
	const isMthemeSlide = slide.classList.contains("titleslide");

	// hide page number on title slide
	$(".slide-number").css("display", isMthemeSlide ? "none" : "block");

	// if title has data title attribute, show menubar
	let title = slide.getAttribute("data-title");
	if (title == null)
		title = slide.parentElement.getAttribute("data-title");
	if (title) {
		$("#menubar").css("display", "block");
		$("#frametitle").html(title);
	} else {
		$("#menubar").css("display", "none");
	}

	// check for foonotes
	const footnotes = slide.querySelector(".footnote");
	if (footnotes) {
		footnotes.style.display = "none";
		$("#footnotes").css("display", "block");
		$("#footnotes").html(footnotes.innerHTML);

		// add footnotes class to class list
		const footnotes_classes = Array.from(footnotes.classList);
		$("#footnotes").addClass(footnotes_classes);
		$("#footnotes").removeClass("footnote");
	} else {
		$("#footnotes").css("display", "none");
		$("#footnotes").removeClass();
	}
};
