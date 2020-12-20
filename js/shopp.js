$(function () {
    $('#header').load('/html/head.html');
    $('#foot').load('/html/foot.html');
})

// 请求数据

$.ajax({
    url: "/nbyshopp",
    data: {
        type: 0,
        contentType: false,
        cateType: 0
    },
    success: function (res) {
        // 存到本地存储
        localStorage.setItem('shoppNav', JSON.stringify(res.data));

        // console.log(res.data);
        res = res.data;
        //
        renderShopp(res);
        renderRecommend(res);
    }
});


function AJAX(type, contentType, cateType) {
    let Type = type ? type : 0;
    let ContentType = contentType ? contentType : false;
    let CateType = cateType ? cateType : 0;
    $.ajax({
        url: "/nbyshopp",
        data: {
            type: Type,
            contentType: ContentType,
            cateType: cateType
        },
        success: function (res) {
            // console.log(res);
            // 存到本地存储
            localStorage.setItem('goodsNav', JSON.stringify(res.data));

            // console.log(res.data);
            res = res.data;
            //
            renderShopp(res);
            // renderRecommend(res);
        }
    });
}


// 左边每个li绑定点击事件
$(".shoppZhong_ul_one").on('click', 'li', function () {
    let live = $(this).attr("index")

    $(this).attr("class", "active").siblings().attr("class", "");
    AJAX(0, true, live);
});


// 点击推荐、新品、价格排序
$(".sort").click(function (e) {
    // 推荐的，就是渲染全部的商品出来   新品就是新品， 排序就按照价格排序
    if (e.target.innerText == "推荐") {
        AJAX();
    } else if (e.target.innerText == "新品") {
        // 拿到本地存储的数据
        let res = JSON.parse(localStorage.getItem('shoppNav'));
        // console.log(res.content);
        // 筛选出含有新品字段的商品
        let arr = res.content.filter(function (item) {
            return item.sale_point;
        })
        // 修改本地存储里面的那个对象里面的数组，让筛选出来的数组代替
        res.content = arr;
        // 存回本地存储
        localStorage.setItem('goodsNav', JSON.stringify(res));
        // 调用 渲染函数
        renderShopp(res);
    } else if (e.target.innerText == "从低到高") {
        // 拿到本地存储的数据
        let res = JSON.parse(localStorage.getItem('goodsNav'));
        // 排序数组 价格排序
        let arrNew = res.content.sort(function (min, max) {
            return min.price - max.price;
        });  
        renderShopp(res);
    } else if (e.target.innerText == "从高到低") {
        // 拿到本地存储的数据
        let res = JSON.parse(localStorage.getItem('goodsNav'));
        // 排序数组 价格排序
        let arrNew = res.content.sort(function (min, max) {
            return max.price - min.price;
        });  
        renderShopp(res);
    }

});


// 点击商品，跳转到详情页面
$(".shoppZhong_goods").on('click', 'a', function (e) {
    e.preventDefault();
    let id = $(this).attr("good_id");
    location.href = `./detail.html?goods_id=${id}`
});


// 渲染goodS函数
function renderShopp(resShopp) {
    // console.log(resShopp);
    // 渲染.shoppZhong_ul_one 里的LI
    if (resShopp.cate_acc) {
        let strUl = "";
        resShopp.cate_acc.forEach((itemUl, index) => {
            if (index == 0) {
                strUl += `<li class="active" index=${itemUl.cate_id}>${itemUl.cate_name}</li>`;
            } else {
                strUl += `<li index=${itemUl.cate_id}>${itemUl.cate_name}</li>`;
            }
        });
        $('.shoppZhong_ul_one').html(strUl);
    }

    // 渲染.shoppZhong_goods 里的商品
    let strGoods = "";
    resShopp.content.forEach((itemGoods, index) => {
        // if(itemGoods.origin_price != itemGoods.price) {
        strGoods += `
                <div>
                        <a href="" good_id="${itemGoods.sid}">
                            <img src="${itemGoods.image}" alt="">
                            <div>
                                <p class="image">${itemGoods.product_name}&nbsp;${itemGoods.color_name}</p>
                                <p class="details"> </p>
                                <p class="price">¥${itemGoods.price}&nbsp;<span style="text-decoration: line-through;">${itemGoods.origin_price == itemGoods.price ? "" : itemGoods.origin_price }</span></p>
                </div>`
        if (itemGoods.sale_point) {
            strGoods += `<div>
                            <div class="sale_point" style="background-color: rgb(222, 99, 79); left: 20px;">
                                <span>新品</span>
                            </div>
                        </div>`;
        }
        strGoods += `</a>
                    </div>`;
    });
    $('.shoppZhong_goods').html(strGoods);
}

function renderRecommend(resRecommend) {
    console.log(resRecommend.recommend);
    let strRecommend = "";
    resRecommend.recommend.forEach(itemRecommend => {
        strRecommend += `
            <div class="swiper-slide">
                <a href="">
                    <img src=${itemRecommend.image} alt="">
                    <div>
                        <p class="image">${itemRecommend.product_name}&nbsp;${itemRecommend.color_name}</p>
                        
                        <p class="price">¥${itemRecommend.price} <span style="text-decoration: line-through;">${itemRecommend.origin_price}</span>
                        </p>
                    </div>`
        if (itemRecommend.sale_point) {
            strRecommend += `
            <div>
                <div class="sale_point" style="background-color: rgb(222, 99, 79); left: 20px;">
                    <span>新品</span>
                </div>
            </div>`
        }
        strRecommend += `
                </a>
            </div>`;
    })
    $('.swiper-wrapper').html(strRecommend);
    swiper()
}

//swiper
function swiper() {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        grabCursor: true,
        slidesPerView: 4,
        slidesPerGroup: 1,
    })
}