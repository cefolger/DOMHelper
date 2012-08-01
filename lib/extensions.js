String.prototype.tokenize = function() {
    var tokenized = this;

    // iterate over the arguments and replace the placeholders
    for (var i = 0; i < arguments.length; i++) {
        tokenized = tokenized.replace("%" + i, arguments[i]);
    }

    return tokenized;
};
