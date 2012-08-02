var DOMHelper = (function() {
    var registeredFunctions = new Array();
    var cachedElements = {}; 


    var _load = function($context, url, callback) {
        if(cachedElements[url]) {
            $context.html(cachedElements[url]);

            if(callback) {
                callback(); 
            }
        }
        else {
           $context.load(url, {}, function(data) {
               cachedElements[url] = data; 

               if(callback) {
                   callback();
               }
           }); 
        }
   
    }; 

    var _contextParse = function( $context, object, fieldArray, callback, operator ) {
        $.each(fieldArray, function( key, value ) {
            var field = fieldArray[key];
            var html = object[field] || '';
            var $element = $("." + field, $context);
        
            $element.html(html);
            
            if(operator) {
            	operator($element,html, object); 
            }
        });

        if( callback ) {
            callback();
        }
    };
    
    var _iterate = function(selector) {
    	var result = function($context, object, fieldArray, operator) {
    		var target = $context.find(selector); 
    		var elementToRepeat = target.clone();
    		var parent = target.parent();   
    		target.remove(); 
    		
    		for(var i=0;i<object.length;i++) {
    			_contextParse(elementToRepeat.clone().appendTo(parent), object[i], fieldArray, null, operator); 
    		}
    		
    		return {
    			using: result,
        		generate: _iterate
        	}; 
    	}; 
    	
    	return {
    		using: result,
    		generate: _iterate
    	}; 
    }; 

    return {
        /*
            Tokenize the html contained in the passed-in context,
              with values from the passed-in object
        
            The values to be tokenized are a passed-in array of strings: fieldArray
        */
        contextParse: function( $context, object, fieldArray, callback ) {
            _contextParse($context, object, fieldArray, callback);
            
            return {
            	contextParse: _contextParse, 
            	generate: _iterate
            }; 
        },

        cachedLoad: function($context, url, callback) {
            _load($context, url, callback); 
        },

        register: function( func ) {
            registeredFunctions.push(func);
        },

        render: function( $context, type, data ) {
            // loop through registeredFunctions to match one with the type
            // use contextParse with the passed in data
        },
        
        generate: function(selector) {
        	return _iterate(selector); 
        }
    }; // end of return
})();
