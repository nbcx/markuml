(function( $ ){
    var methods = {
        init : function( options ) {
            this.each(function(index,element) {
                $(element).addClass("mermaid");
            });
            mermaid.initialize(options);
        },

        flow : function(options) {
            this.each(function(index,element) {
                var that = $(element),parse_text = that.text();
                that.attr('id',"flow-diagram-draw-"+index);
                that.empty();
                flowchart.parse(parse_text).drawSVG('flow-diagram-draw-'+index,options);
            });
        },

        sequence : function(options) {
            this.each(function(index,element) {
                var that = $(element),parse_text = that.text();
                that.attr('id',"sequence-diagram-draw-"+index);
                that.empty();
                Diagram.parse(parse_text).drawSVG("sequence-diagram-draw-"+index, options);
            });
        },

        /**
         * http://www.gravizo.com/
         * @param options
         */
        gravizo: function( options ) {
            this.each(function(index,element) {
                var that = $(element);
                that.parent().replaceWith("<p></p><img src='https://g.gravizo.com/svg?"+that.text()+"' /></p>");
            });
        },
    };

    $.fn.markUml = function( method ) {
        if ( methods[method] ) {
            return methods[ method ].apply(this, Array.prototype.slice.call( arguments, 1 ));
        }
        else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        }
        else {
            console.log( 'Method ' +  method + ' does not exist on jQuery.markUml' );
        }
    };
})( jQuery );
