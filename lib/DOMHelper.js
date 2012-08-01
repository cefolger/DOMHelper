var DOMHelper = (function() {

    return {
        /*
            Tokenize the html contained in the passed-in context,
              with values from the passed-in object
        
            The values to be tokenized are a passed-in array of strings: fieldArray
        */
        contextParse: function( $context, object, fieldArray ) {
            $.each(fieldArray, function( key, value ) {
                var field = fieldArray[key];
                var html = object[field] || '';
                var $element = $("." + field, $context);
        
                $element.html(html);
            });
        } 
    }; // end of return
})();
