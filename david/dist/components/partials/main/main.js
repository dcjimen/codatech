var sliderHome=2;function moreImage(e){showSlides(sliderHome+=e)}function currentImage(e){showSlides(sliderHome=e)}function showSlides(e){var s,l=document.getElementsByClassName("images-slider"),i=document.getElementsByClassName("line-slide");for(e>l.length&&(sliderHome=1),e<1&&(sliderHome=l.length),s=0;s<l.length;s++)l[s].style.display="none";for(s=0;s<i.length;s++)i[s].className=i[s].className.replace(" active","");l[sliderHome-1].style.display="block",i[sliderHome-1].className+=" active"}showSlides(sliderHome);