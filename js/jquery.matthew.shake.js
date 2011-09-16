/*

  Shake effect that 
    - doesn't mess with positioning like jQ UI's
    - accurately replicates human head shaking (this shit is serious)
    
  $(el).shake() 
  
  or
  
  $(el).shake({
    distance: 5, //px
    iterations: 4,
    duration: 50, // ms
    complete: function() {} // do something after you're done
  })
    
  By @mattrobs
    
*/

jQuery.fn.shake = function(options) {

    var $el = $(this);
    
    var defaults = {
      distance: 5,
      iterations: 4,
      duration: 50
    };

    var opt = $.extend(defaults, options);
    
    var distance = opt.distance;
    var iterations = opt.iterations;
    var duration = opt.duration;
    // If left is used for existing element styling, retain it.
    distanceOriginal = parseInt($el.css('left'));
    // Or if not, zero.
    if (isNaN(distanceOriginal)) distanceOriginal = 0;
    // Stay absolute, otherwise relative that guy up.
    if ($el.css('position') != 'absolute' || 
        $el.css('position') != 'relative' ) {
       $el.css({position: 'relative'});
    }
    
    var i = 0;    

    while(i < iterations) {
      // big first shake
      if (i == 0) {
        $el.animate({left:'-='+distance*1.2+'px'}, {duration:duration, easing:'easeInOutCubic'});
        $el.animate({left:'+='+2*distance*1.2+'px'}, {duration:duration, easing:'easeInOutCubic'});
        // undo extra 1.2
        $el.animate({left:'-='+distance*2.2+'px'}, {duration:duration, easing:'easeInOutCubic'});
        $el.animate({left:'+='+2*distance+'px'}, {duration:duration, easing:'easeInOutCubic'});
        // count that iteration
        i++;
      } else {
        $el.animate({left:'-='+2*distance+'px'}, {duration:duration, easing:'easeInOutCubic'});
        $el.animate({left:'+='+2*distance+'px'}, {duration:duration, easing:'easeInOutCubic'});
      }
      // get tired after each shake
      distance = distance - (distance*.3);
      i++;
      // stop shaking you twit
      if (i == iterations) {
        $el.animate({left: distanceOriginal}, {
          duration: duration, 
          easing:'easeInOutCubic',
          complete: function() {
            // cleanup after yourself
            $el.attr('style', '');
            
            // Execute the on-complete function
            if(typeof opt.complete == 'function'){
              opt.complete.call(this);
            }
            
          } // complete
        }); // animate
      }// stop shaking you twit
      
    }// while
    
}