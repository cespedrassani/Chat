Util.prototype = (function() {    
    
    return {
        constructor: Util,

        setFocus: function(callback) {
            setTimeout(function() {callback()}, 100);
        },

        isBlank: function(value) {
            if (typeof value == "undefined" || value == null) {
                return true;
            }
            return ((value + '') == "") ? true : false;
        },

        isNotBlank: function(value) {
            return !util.isBlank(value);
        },

        isBlankFunc: function(value) {
            return (typeof value !== "function" || value == null || value === "") ? true : false;
        },

        isNotBlankFunc: function(value) {
            return !util.isBlankFunc(value);
        },
    }

})();

$(document).ready(function(){
    util = new Util();
});