$(function () {
    $('#header').load('/html/head.html');
    $('#foot').load('/html/foot.html');
})

/* 轮播图 */
var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 自动播放
    autoplay: true,
})

window.onresize = function () {
    if (innerWidth < 1200) {
        $('#imagesTwo>div').css("width", "100%");
    }
    if (innerWidth >= 1200) {
        let width = innerWidth + "px";
        $('#imagesTwo>div').css("width", "50%");
    }
}
