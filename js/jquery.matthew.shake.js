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
      duration: 50,
      complete: function(){}
    };

    var opt = $.extend(defaults, options);
    
    var existing_style = {
      left: parseInt($el.css('left'), 10) || 0,
      position: $el.css("position")
    };

    // Stay absolute, otherwise relative that guy up.
    if (existing_style.position != "absolute") $el.css({position: 'relative'});

    var animation_options = {
      duration: opt.duration,
      easing: 'easeInOutCubic'
    };
    
    // Start at 1 because we shake twice the first time
    for(var i = 1; i < opt.iterations; i++){
      if (i === 1) {
        // big first shake
        $el
          .animate({left:'-='+opt.distance*1.2+'px'}, animation_options)
          .animate({left:'+='+2*opt.distance*1.2+'px'}, animation_options)
          .animate({left:'-='+opt.distance*2.2+'px'}, animation_options) // undo extra 1.2
          .animate({left:'+='+2*opt.distance+'px'}, animation_options);

      } else {
        $el
          .animate({left:'-='+2*opt.distance+'px'}, animation_options)
          .animate({left:'+='+2*opt.distance+'px'}, animation_options);
      }

      opt.distance *= 0.7; // get tired after each shake
    }

    // stop shaking you twat
    $el.animate({
      left: existing_style.left
    }, $.extend(animation_options, {
      complete: function() {
        // cleanup after yourself
        $el.css(existing_style);
        
        // Execute the on-complete function with el as this
        opt.complete.call($el[0]);
        
      }
    }));
};