var DOMHelper = (function() {
    var registeredFunctions = new Array();

    var _contextParse = function( $context, object, fieldArray, callback ) {
        $.each(fieldArray, function( key, value ) {
            var field = fieldArray[key];
            var html = object[field] || '';
            var $element = $("." + field, $context);
        
            $element.html(html);
        });

        if( callback ) {
            callback();
        }
    };

    return {
        /*
            Tokenize the html contained in the passed-in context,
              with values from the passed-in object
        
            The values to be tokenized are a passed-in array of strings: fieldArray
        */
        contextParse: function( $context, object, fieldArray, callback ) {
            _contextParse($context, object, fieldArray, callback);
        },

        register: function( func ) {
            registeredFunctions.push(func);
        },

        render: function( $context, type, data ) {
            // loop through registeredFunctions to match one with the type
            // use contextParse with the passed in data
        }
    }; // end of return
})();
