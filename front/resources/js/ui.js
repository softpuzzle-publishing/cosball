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

    //header
    var Header = {
        init : function(){
            Header.scrolling();
            Header.search();
            Header.gnb();
            Header.side();
            window.addEventListener('mousewheel', Header.scrolling);
            window.addEventListener('touchmove', Header.scrolling);
            $(window).scroll(function(){
                Header.scrolling();
            });
            Header.barAnimation($('#gnb .current > a span'));
        },
        scrolling : function(e){
            var scrollTop = $(window).scrollTop();
            var gnbTop = $('#header').height();
            gnbTop = Number(gnbTop);

            //if(scrollTop > 0){
            if(scrollTop > $('.header-top').height()){
                $('html').addClass('is-compacted');
            }else{
                $('html').removeClass('is-compacted');
            }

            if(scrollTop > 0){
                $('html').addClass('is-scrolled');
            }else{
                $('html').removeClass('is-scrolled');
            }

            if(!$('.sub-layer').is(':visible')){
                setTimeout(function(){
                    Header.barAnimation($('#gnb .current > a span'));
                },300);
            }
        },
        search : function(){
            $('#btn-search').on('click',function(e){
                e.preventDefault();
                $('html').addClass('open-search');
            });
            $('.search-close').on('click',function(e){
                e.preventDefault();
                $('html').removeClass('open-search');
            });
        },
        barAnimation : function(t){
            if($('#gnb').length > 0){
                var target = t;
                Header.barWidth = target.outerWidth();
                Header.barLeft = target.position().left;
                $('#gnb .bar').css({
                    'width' : Header.barWidth,
                    'left' : Header.barLeft
                });
            }
        },
        gnb : function(){
            $('#gnb').on('mouseenter',function(e){
                $('html').addClass('hover-gnb');
            }).on('mouseleave',function(e){
                $('html').removeClass('hover-gnb');
            });
            $('#gnb .dep1').on('mouseenter',function(e){
                if(Init.breakpoint){
                    $('html').addClass('open-submenu');
                    $(this).siblings().removeClass('active');
                    $(this).addClass('active');
                    $(this).find('.sub-layer').addClass('show');
                    var $active = $(this).find('>a span');
                    Header.barAnimation($active);
                }
            });
            $('#gnb').on('mouseleave',function(e){
                if(Init.breakpoint){
                    $('html').removeClass('open-submenu');
                    $('.dep1').removeClass('active');
                    $('.sub-layer').removeClass('show');
                    Header.barAnimation($('#gnb .current > a span'));
                }
            });

            $('#gnb .dep1 > a').on('focus',function(e){
                if(Init.breakpoint){
                    $('html').addClass('open-submenu');
                    $(this).closest('.dep1').siblings().removeClass('active');
                    $(this).closest('.dep1').addClass('active');
                    $('.sub-layer').removeClass('show');
                    $(this).siblings('.sub-layer').addClass('show');
                }
            });
            $('#gnb .dep1:last-child .dep2 li:last-child a').on('focusout',function(e){
                if(Init.breakpoint){
                    $('html').removeClass('open-submenu');
                    $('.dep1').removeClass('active');
                    $('.sub-layer').removeClass('show');
                }
            });

            $('.gnb .dep1 > a').on('click',function(e){
                if(Init.breakpoint){

                }else{
                    e.preventDefault();
                    console.log('mobile');
                    if(!$(this).closest('.dep1').hasClass('active')){
                        $(this).closest('.dep1').siblings().removeClass('active');
                        $(this).closest('.dep1').addClass('active');
                    }
                    else{
                        $(this).closest('.dep1').removeClass('active');
                    }
                }
            });
        },
        side : function(){
            $('.gnb').append($('.header-top .lang').clone());
            $('#btn-menu').on('click',function(e){
                e.preventDefault();
                $('.gnb .dep1').removeClass('active');
                $('.gnb .current').addClass('active');
                $('html').addClass('open-side');
            });
            $('#btn-menu-close, #header-dim').on('click',function(e){
                e.preventDefault();
                $('html').removeClass('open-side');
                $('#gnb-mypage').removeClass('active');
            });
            $('#btn-mypage').on('click',function(e){
                e.preventDefault();
                $('#gnb-mypage').addClass('active');
            });
            $('#btn-mypage-close').on('click',function(e){
                e.preventDefault();
                $('#gnb-mypage').removeClass('active');
            });
        },
    };

    var Floating = {
        init : function(){
            if($('.buy-bottom').length > 0){
                Floating.scrolling();
                Floating.toggle();
                window.addEventListener('mousewheel', Floating.scrolling);
                window.addEventListener('touchmove', Floating.scrolling);
                $(window).scroll(function(){
                    Floating.scrolling();
                });
            }
        },
        scrolling: function(){
            var scrollTop = $(window).scrollTop();
            var offsetTop = $('.product-detail>.detail .btn-area').offset().top;
            offsetTop = Number(offsetTop);
            var tabWrapTop = $('.tab').offset().top - $('#header').height();
            var tabTop = $('.detail-tab').offset().top;

            if(scrollTop > offsetTop){
                $('html').addClass('is-bottom-floating');
                $('#footer-block').css('padding-bottom',$('.buy-bottom').outerHeight());
            }else{
                $('html').removeClass('is-bottom-floating');
                $('#footer-block').css('padding-bottom','0');
            }

            if(scrollTop > tabWrapTop){
                $('html').addClass('is-header-hidden');
            }else{
                $('html').removeClass('is-header-hidden');
            }
            console.log($('.tab .nav').offset().top);
            if(scrollTop > tabTop){
                $('html').addClass('is-tab-floating');
            }else{
                $('html').removeClass('is-tab-floating');
            }
        },
        toggle: function(){
            $('.buy-bottom .toggler').on('click',function(e){
                e.preventDefault();
                console.log(1);
                if($('html').hasClass('is-bottom-floating-fold')){
                    $('#footer-block').css('padding-bottom','0 !important');
                    $('html').removeClass('is-bottom-floating-fold');
                }else{
                    $('#footer-block').css('padding-bottom',$('.buy-bottom').outerHeight());
                    $('html').addClass('is-bottom-floating-fold');
                }
            });
        }
    };

    $(document).ready(function () {
        $('#header-block').load('../_include/header.html');
        $('#footer-block').load('../_include/footer.html');

        setTimeout(function () {
            //goTop();
            Init.defaults();
            Header.init();
            Floating.init();
        }, 200);

        //select
        $("select.custom-select").selectmenu();

        //single datepicker
        $('[data-event="datepicker"]').datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: 'yy-mm-dd'
        });

        //테이블 내 체크박스 전체 선택
        $('[data-check="all"]').on('change', function(){
            if ($(this).prop('checked')) {
                $(this).closest('.table').find('tbody .custom-checkbox .custom-control-input').prop('checked', true);
            } else {
                $(this).closest('.table').find('tbody .custom-checkbox .custom-control-input').prop('checked', false);
            }
        });

        //기타 라디오 선택시 input toggle
        $('input[type=radio]').on('change', function(){
            $('[data-check="etc"]').each(function(){
                if ($(this).prop('checked')) {
                    $($(this).attr('data-match')).show();
                } else {
                    $($(this).attr('data-match')).hide();
                }
            });
        });

        //날짜 전체 선택
        $('[data-check="allday"]').on('change', function(){
            if ($(this).prop('checked')) {
                $($(this).attr('data-match')).attr('disabled', true);
            } else {
                $($(this).attr('data-match')).attr('disabled', false);
            }
        });

        //수량 입력
        $('.spinner button').on('click',function(){
            var max = parseInt($(this).closest('.spinner').attr('data-max'));
            var min = parseInt($(this).closest('.spinner').attr('data-min'));
            var count = $(this).siblings('.spinner-input').val();

            if($(this).hasClass('spinner-increment')){
                if(count < max){
                    count++;
                    $(this).siblings('.spinner-input').val(count);
                    $(this).siblings('.spinner-decrement').prop('disabled',false);
                    $(this).prop('disabled',false);
                }
                if(count == max){
                    $(this).prop('disabled',true);
                }
            }
            else if($(this).hasClass('spinner-decrement')){
                if(count > min){
                    count--;
                    $(this).siblings('.spinner-input').val(count);
                    $(this).siblings('.spinner-increment').prop('disabled',false);
                    $(this).prop('disabled',false);
                }
                if(count == min){
                    $(this).prop('disabled',true);
                }
            }
        });
        $('.spinner-input').on('keyup',function(){
            var max = parseInt($(this).closest('.spinner').attr('data-max'));
            var min = parseInt($(this).closest('.spinner').attr('data-min'));
            var count = parseInt($(this).val());
            if(count > max){
                $(this).siblings('.spinner-decrement').prop('disabled',false);
                $(this).siblings('.spinner-increment').prop('disabled',true);
                $(this).val(max);
            }else if(count == max){
                $(this).siblings('.spinner-decrement').prop('disabled',false);
                $(this).siblings('.spinner-increment').prop('disabled',true);
            }
            else if(count < min){
                $(this).siblings('.spinner-increment').prop('disabled',false);
                $(this).siblings('.spinner-decrement').prop('disabled',true);
                $(this).val(min);
            }
            else if(count == min){
                $(this).siblings('.spinner-increment').prop('disabled',false);
                $(this).siblings('.spinner-decrement').prop('disabled',false);
            }
            else if(min < count && count < max){
                $(this).siblings('.spinner-increment').prop('disabled',false);
                $(this).siblings('.spinner-decrement').prop('disabled',false);
            }
        });
    });
})(jQuery);

function byteCheck(obj, maxByte, textTarget){
    var str = obj.value;
    var str_len = str.length;

    var rbyte = 0;
    var rlen = 0;
    var one_char = "";
    var str2 = "";

    for (var i = 0; i < str_len; i++) {
        one_char = str.charAt(i);
        if (escape(one_char).length > 4) {
            rbyte += 1; //한글2Byte
        } else {
            rbyte++; //영문 등 나머지 1Byte
        }
        if (rbyte <= maxByte) {
            rlen = i + 1; //return할 문자열 갯수
        }
    }

    if (rbyte > maxByte) {
        alert("메세지는 최대 " + maxByte + "자를 초과할 수 없습니다.");
        str2 = str.substr(0, rlen); //문자열 자르기
        obj.value = str2;
        byteCheck(obj, maxByte);
    } else {
        $(textTarget).text(rbyte);
    }
}
