(function() {
    var html = document.documentElement;
    html.className = html.className.replace(/\bno-js\b/, 'js');
    //html.className += ((window.CSS && window.CSS.supports('(position: sticky) or (position: -webkit-sticky)')) ? ' csssticky' : ' no-csssticky');
    html.className += (window.matchMedia('(-moz-touch-enabled: 1), (hover: none)')).matches ? ' hover-disabled' : ' hover-enabled';
    //html.style.setProperty('--window-height', window.innerHeight + 'px');
})();

(function($) {
    var Init = {
        defaults : function(){
            var bodyHeight = 0;
            var bodyWidth = 0;
            var breakpoint;
            this.resize();
            window.addEventListener("resize", this.resize);
        },
        resize : function(){
            Init.getBrowserSize();
            Init.drawBreakPoint();

            Init.breakpoint = window.matchMedia('(min-width:992px)').matches;
            if(!Init.breakpoint){
                $('html').removeClass('is-desktop');
                $('html').addClass('is-mobile');
            }else{
                $('html').removeClass('is-mobile');
                $('html').addClass('is-desktop');
            }
            Header.barAnimation($('#gnb .current > a span'));
        },
        getBrowserSize : function(){
            this.bodyHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            this.bodyWidth = Math.max(
                document.body.scrollWidth,
                document.body.offsetWidth,
                document.documentElement.clientWidth,
                document.documentElement.scrollWidth,
                document.documentElement.offsetWidth
            );
        },
        drawBreakPoint : function(){
            $('html').attr('data-width',this.bodyWidth);
            $('html').attr('data-height',this.bodyHeight);
        },
    };
})(jQuery);
