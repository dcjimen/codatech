


var sliderHome = 2;
showSlides(sliderHome);

function moreImage(any) {
  showSlides(sliderHome += any);
}

function currentImage(any) {
  showSlides(sliderHome = any);
}

function showSlides(any) {
  var i;
  var imageSlide = document.getElementsByClassName("images-slider");
  var linesSlide = document.getElementsByClassName("line-slide");
  if (any > imageSlide.length) {sliderHome = 1}    
  if (any < 1) {sliderHome = imageSlide.length}
  for (i = 0; i < imageSlide.length; i++) {
    imageSlide[i].style.display = "none";  
  }
  for (i = 0; i < linesSlide.length; i++) {
    linesSlide[i].className = linesSlide[i].className.replace(" active", "");
  }
  imageSlide[sliderHome-1].style.display="block";  
  linesSlide[sliderHome-1].className += " active";
}