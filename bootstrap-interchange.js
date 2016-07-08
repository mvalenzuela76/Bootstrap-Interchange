/* Bootstrap Interchange 
data-interchange="[sm, http://foundation.zurb.com/docs/assets/img/examples/space-small.jpg], [md, http://foundation.zurb.com/docs/assets/img/examples/space-medium.jpg], [lg, http://foundation.zurb.com/docs/assets/img/examples/space-large.jpg]"

*/

(function ( $ ) {
            'use strict'; 
            
            $.fn.interchange = function(options) {
                                
                //var element = $(this);     
                var scenerios = [];           
                var settings = $.extend({
			        name : 'interchange',
                    breakpoints : {
                        xs: {
                            min: 0,
                            max: 767
                        },
                        sm: {
                            min: 768,
                            max: 991
                        },
                        md: { 
                            min: 992,
                            max: 1199
                        },
                        lg: {
                            min: 1200,
                            max: Infinity
                        }
			        },
                }, options );
                
                var current;
                var previouse;
                               
                this.each(function(index, element) { 
                    var scenerio = { }
                    var scenerioArray = [];
                    var sceneriosArrayRaw = $(element).data(settings.name).split(/\[(.*?)\]/);
                    var is_norepeat= false;
                    
                    is_norepeat = $(element).data('is-repeat');
                    
                    if(typeof is_norepeat === "undefined") {
                        is_norepeat = false;
                    }
                    
                    if(typeof is_norepeat === 'string' || typeof is_norepeat === 'boolean') {
                        if(is_norepeat !== false || is_norepeat !== 'false') {
                            is_norepeat = true;
                        }
                    }                    
                    
                    for (var i = 0, len = sceneriosArrayRaw.length; i < len; i++) {
                     
                        if (sceneriosArrayRaw[i].replace(/[\W\d]+/, '').length > 4) {
                                                        
                            scenerioArray = sceneriosArrayRaw[i].split(',');
                                                        
                            scenerio.element = element;
                            scenerio[scenerioArray[0]] = {}
                            
                            if(scenerioArray.hasOwnProperty(1) === true) {
                                scenerio[scenerioArray[0]].url = scenerioArray[1].trim();
                            }
                            
                            if(is_norepeat === true) {
                                scenerio[scenerioArray[0]].norepeat = true;
                            } else {
                                scenerio[scenerioArray[0]].norepeat = false;
                            }
                            
                            if(scenerioArray.hasOwnProperty(2) === true) {
                                scenerio[scenerioArray[0]].x_pos = scenerioArray[2].trim();
                            }
                            if(scenerioArray.hasOwnProperty(3) === true) {
                                scenerio[scenerioArray[0]].y_pos = scenerioArray[3].trim();
                            }
                            if(scenerioArray.hasOwnProperty(4) === true) {
                                scenerio[scenerioArray[0]].y_pos = scenerioArray[4].trim();
                            }   
                        }
                    }
                    
                    scenerios.push(scenerio);
                }); 
            
                $(window).on("resize load",function() {
                    var previous = current;
                    var viewport = $(window).innerWidth(); 
                    var cssString;
                    
                                          
                    for (var breakpoint in settings.breakpoints) {
                        
                        if (viewport >= settings.breakpoints[breakpoint].min && viewport <= settings.breakpoints[breakpoint].max) { 
                            current = breakpoint;
                        } 
                        
                        
                        if (current !== previous) {                             
                            $.each(scenerios, function( index, scenerio ) {                                
                                if( $(scenerio.element).prop("tagName") === 'IMG') {                           
                                    if(scenerio.hasOwnProperty(current)) {
                                        if(scenerio[current].hasOwnProperty('url')) {
                                            $(scenerio.element).attr('src', scenerio[current].url )
                                        }
                                    }
                                } else {
                                    if(scenerio.hasOwnProperty(current)) {
                                                                               
                                        if(scenerio[current].hasOwnProperty('url')) {
                                            cssString = 'url("' + scenerio[current].url  + '")'; //background-color: #e0ffff;
                                        }
                                        
                                        if(scenerio[current].hasOwnProperty('norepeat')) {
                                            if(scenerio[current].norepeat === true) {
                                                cssString = cssString + ' no-repeat'
                                            }
                                        }
                                        
                                        if(scenerio[current].hasOwnProperty('x_pos')) {
                                            cssString = cssString + ' ' + scenerio[current].x_pos
                                        }
                                        
                                        if(scenerio[current].hasOwnProperty('y_pos')) {
                                            cssString = cssString + ' ' + scenerio[current].y_pos
                                        }
                                                                            
                                        $(scenerio.element).css('background', cssString);
                                    }
                                }
                            });
                        } 
                    }
			    });  
                
                return this;    
            }
        }( jQuery ));
        
        $(function() {
            $('[data-interchange]').interchange();
        });