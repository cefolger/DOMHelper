var DOMHelper = (function() {
	var getElementType = function( $context ) {
		var elementType = "input"; // default
		
		if( $context.is("h1") ) {
			elementType = "h1";
		}
		else if( $context.hasClass("textarea") ) {
			elementType = "textarea";
		}
		
		return elementType;
	};
	
    return {
    	/*
    	    Manipulate the html contained in the passed-in context
    	      between an editable and read-only state
    	      
    	    The values to be toggled are a passed-in array of strings: fieldArray
    	*/
        toggleEditability: function( context, fieldArray ) {
            $.each(fieldArray, function( key, value ) {
                // the dom node that encloses the currently iterated element
                var $currentContext = $("._" + value, context);
                var elementType = getElementType($currentContext);
                
                if( elementType === "textarea" ) {
                	$("textarea", $currentContext).toggleReadonly();
                }
                else {
                	$("input", $currentContext).toggleClass("inputEditable");
                    $("input", $currentContext).toggleReadonly();
                }
            }); // end of .each
        }, // end of toggle
    
	    /*
		    Tokenize the html contained in the passed-in context,
		      with values from the passed-in object
		    
		    The values to be tokenized are a passed-in array of strings: fieldArray
		*/
		tokenizeElements: function( context, object, fieldArray ) {
		    for( var i = 0; i < fieldArray.length; i++ ) {
		        var formValue = object[fieldArray[i]] || '';
		        var $element = $(context + "._" + fieldArray[i]);
		        var elementType = getElementType($element);
		        
		        var resultHTML = '<input type="text" value="%0" readonly />'.tokenize(formValue);
		        
		        if( elementType === "textarea" ) {
		            resultHTML = '<textarea readonly>%0</textarea>'.tokenize(formValue);
		        }
		        else if( elementType === "h1" ) {
		        	resultHTML = formValue;
		        }
		        else {
		        	resultHTML = formValue; 
		        }
		        
		        $element.html(resultHTML);
		    }
		}
    }; // end of return
})();
