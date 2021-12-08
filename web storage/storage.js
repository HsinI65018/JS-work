var htmlElem = document.querySelector('html');
var pElem = document.querySelector('p');
var imgElem = document.querySelector('img');

var bgcolorForm = document.getElementById('bgcolor');
var fontForm = document.getElementById('font');
var imageForm = document.getElementById('image');

if (!localStorage.getItem('bgcolor')) {
	populateStorage() //testing to see whether the bgcolor item exists; if not, we run populateStorage()
}else{
	setStyles()
}

function setStyles() {
	var currentColor = localStorage.getItem('bgcolor');
	var currentFont = localStorage.getItem('font');
	var currentImage = localStorage.getItem('image');

	bgcolorForm.value = currentColor;
	fontForm.value = currentFont;
	imageForm.value = currentImage;

	htmlElem.style.backgroundColor = '#' + currentColor;
	pElem.style.fontFamily = currentFont;
	imgElem.setAttribute('src',currentImage);
}

function populateStorage(){
	localStorage.setItem('bgcolor',bgcolorForm);
	localStorage.setItem('font',fontForm);
	localStorage.setItem('image',imageForm);

	setStyles();
}

bgcolorForm.onchange = populateStorage;
fontForm.onchange = populateStorage;
imageForm.onchange = populateStorage;

