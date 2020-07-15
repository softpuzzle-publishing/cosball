var settingTitle = function () {
    $('#menutree span').each(function () {
        var txt = $(this).text();
        if (txt !== '') {
            var html = '<li class="breadcrumb-item">' + txt + '</li>';
            $('.breadcrumb').append(html);
        }
    });
    $('#page-title').text($('#menutree span:last-child').text());
};
var goTop = function(){
    var $btn = $('.btn-top');
    $btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 500);
    });
    $(window).scroll(function () {
        scrolling();
    });
    var scrolling = function() {
        var t = $(window).scrollTop();
        //top 버튼
        if(t > 100){
            if(!$btn.hasClass('active')) $btn.addClass('active');
        }else{
            if($btn.hasClass('active')) $btn.removeClass('active');
        }
    };
};
var titleFixed = function(){
    var offsetTop = $('.content-header').offset().top;
    $(window).scroll(function () {
        scrolling();
    });
    var scrolling = function() {
        var t = $(window).scrollTop();
        //title영역 플로팅
        if(t > offsetTop){
            $('html').addClass('is-title-fixed');
        }else{
            $('html').removeClass('is-title-fixed');
        }
    };
};

$(document).ready(function () {
    $('#header-include').load('../_include/header.html');
    $('#aside-include').load('../_include/aside.html');
    $('#footer-include').load('../_include/footer.html');

    //타이틀, 로케이션
    setTimeout(function () {
        settingTitle();
        goTop();
        titleFixed();
    }, 300);

    //sortable
    //https://api.jqueryui.com/sortable/
    $('[data-event="sortable"] td').each(function(){
        $(this).css('width', $(this).width() +'px');
    });
    $('[data-event="sortable"]').sortable({
        placeholder: 'bg-success',
        handle: '.handle',
        cursor: 'ns-resize'
    }).disableSelection();

    //single datepicker
    $('[data-event="datepicker"]').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

    //테이블 내 체크박스 전체 선택
    $('[data-check="all"]').on('change', function () {
        if ($(this).prop('checked')) {
            $(this).closest('.table').find('tbody .custom-checkbox .custom-control-input').prop('checked', true);
        } else {
            $(this).closest('.table').find('tbody .custom-checkbox .custom-control-input').prop('checked', false);
        }
    });

    //기타 라디오 선택시 input toggle
    $('[data-check="etc"]').on('change', function () {
        if ($(this).prop('checked')) {
            $($(this).attr('data-match')).show();
        } else {
            $($(this).attr('data-match')).hide();
        }
    });

    //날짜 전체 선택
    $('[data-check="allday"]').on('change', function () {
        if ($(this).prop('checked')) {
            $($(this).attr('data-match')).attr('disabled', true);
        } else {
            $($(this).attr('data-match')).attr('disabled', false);
        }
    });

    //스크립트 추가 2020-06-09
    //사용, 중지 텍스트
    $('.switch_chk').click(function(){
        if($(this).is(":checked") == true) {
            $(this).siblings("label").text("사용");
        } else {
           $(this).siblings("label").text("중지");
        }
    });

    //자동, 수동 텍스트
    $('.switch_chk2').click(function(){
        if($(this).is(":checked") == true) {
            $(this).siblings("label").text("자동");
        } else {
           $(this).siblings("label").text("수동");
        }
    });

    //적용, 미적용 텍스트
    $('.switch_chk3').click(function(){
        if($(this).is(":checked") == true) {
            $(this).siblings("label").text("적용");
        } else {
           $(this).siblings("label").text("미적용");
        }
    });

    //메뉴트리 아이콘 변화
    $(".role_tree").click(function(){
        if ($(this).hasClass('collapsed')) {
            $(this).find(".fas").removeClass("fa-angle-down").addClass("fa-angle-up");
        } else {
            $(this).find(".fas").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
    });

    //체크박스 전체 선택
    $('[data-check2="all"]').on('change', function () {
        if ($(this).prop('checked')) {
            $(this).closest('.card-body').find('.custom-checkbox .custom-control-input').prop('checked', true);
        } else {
            $(this).closest('.card-body').find('.custom-checkbox .custom-control-input').prop('checked', false);
        }
    });

    //아코디언 접기, 펼치기
    $('.btn_toggle_chk').off('click').on('click', function() {
        if($(this).attr('aria-expanded') == 'true') {
            $(this).text('펼치기');
        } else if($(this).attr('aria-expanded') == 'false') {
            $(this).text('접기');
        }
    });

});
