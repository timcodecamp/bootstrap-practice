// js

// slider

var $slidesContainer = $('.slider');
var $slides = $slidesContainer.children('img');
var $btnPrev = $('.prev-btn');
var $btnNext = $('.next-btn');

var imgWidth = $slides.first().width();
var slideDuration = 3000;
var isSlideAnimating = false;
var timer;

// position all images to the right

$slides.each(function(i){
  
    var leftPos = i * imgWidth;
    
    $(this).css('left', leftPos);
    
  });

// Move the last slide in front of the first slide
// in case the user pushes the "prev" button...
$slides.last()
.prependTo($slidesContainer)
.css('left', -(imgWidth));

$btnPrev.click(prevSlide);
$btnNext.click(nextSlide);

startSlides();  

$slidesContainer.on('mouseenter', pauseSlides);
$slidesContainer.on('mouseleave', startSlides);

function pauseSlides(){
  clearInterval(timer);
}

function startSlides(){
  timer = setInterval(nextSlide, slideDuration);
}

function prevSlide(e){		
	
  if(isSlideAnimating){
    return;
  }
	
  if(e){
	  pauseSlides();
  }
  
  isSlideAnimating = true;
  
  $slidesContainer.children()
                  .last()
                  .css('left', -(imgWidth * 2))
                  .prependTo($slidesContainer);
	
   // Following code modified from a stackoverflow question...
   // jQuery $.animate() multiple elements but only fire callback once	
 
   // http://stackoverflow.com/questions/8793246/jquery-animate-multiple-elements-but-only-fire-callback-once	  
	
   $slides.animate({'left': '+=' + imgWidth }, 300)
	      .promise()
	      .done( () => slideAnimationComplete(e) );  
                   
} // end prevSlide;

function nextSlide(e){		
	
  if(isSlideAnimating){
    return;
  }
	
  if(e){
	  pauseSlides(e);
  }	
  
  isSlideAnimating = true;
  
  $slidesContainer.children()
                  .first()
                  .css('left', imgWidth * ($slides.length - 1) )
                  .appendTo($slidesContainer);
 
  // Following code modified from a stackoverflow question...
  // jQuery $.animate() multiple elements but only fire callback once	

  // http://stackoverflow.com/questions/8793246/jquery-animate-multiple-elements-but-only-fire-callback-once	
	
  $slides.animate({'left': '-=' + imgWidth }, 300)
	     .promise()
	     .done( () => slideAnimationComplete(e) );	

} // end nextSlide

function slideAnimationComplete(evt){
	isSlideAnimating = false;
	if(evt){
		startSlides();
	} // end if e
} // end SlideAnimationComplete


// menu bar
var $btn = $('.menu-button');
var $body = document.querySelector('body');   
var $nav = $('.main-menu');


$btn.click(function(e){
  $btn.toggleClass('animate');  
//   $(".main-menu").toggleClass('mobile-navigation-show');
  $(".menu-button-middle").slideToggle();
  e.preventDefault();
  $(".mobile-menu").toggleClass("mobile-menu-show");

//  $('body').toggleClass('fixed-body');
  
});