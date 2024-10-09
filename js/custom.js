

// Prueba nueva galería
const images = document.querySelectorAll(".img-g")

function clearActiveImage() {
    images.forEach(function(image) {
        image.classList.remove("active");
    });
}

images.forEach(function(image, index) {
    image.onclick = function () {
        event.stopPropagation() //important to not call the clearActiveImage() on every click
        if(images[index].classList.contains("active")){
            images[index].classList.remove("active")
        } else {
            clearActiveImage(index)
            images[index].classList.add("active")
        }
    }
})

// window.addEventListener("click", () => {
//     clearActiveImage()
// })


$(document).ready(function() {
  var $bxslider = $('.bx_sliders01');
  $bxslider.bxSlider({
    mode: 'fade',
    randomStart: false,
    autoHover: true,
    autoDelay: 3000,
    pagerCustom: '.bx_pager',
    pause: 3000,
    controls: true,
    pager: true,
    arrow: true,
    autoControls: true,
    onSlideBefore: function() {
      $bxslider.find('video').each(function() {
        this.pause();
      });
    },
    onSlideAfter: function($slideElement, oldIndex, newIndex) {
      var video = $slideElement.find('video')[0];
      video !== undefined && video.currentTime !== 0 && video.play();
      // video !== undefined && video.currentTime !== 0 && video.pause();
    }
  });
});