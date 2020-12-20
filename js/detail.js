$(function () {
    $('#detailHeader').load('/html/head.html');
    $('#detailFoot').load('/html/foot.html');
})
// 获取跳转过来的页面传进来的ID  作为请求数据参数
let url = location.href.substr(location.href.indexOf("?") + 1);
let obj = changeObj(url);
// 如果不是列表页，点击商品过来的，直接返回去列表页(需要商品ID传进来渲染页面)
if (!obj.goods_id) {
    location.href = '/html/shopp.html'
}

// 发送ajax 请求数据
$.ajax({
    url: `/nbydetail`,
    data: {
        // productId: 1144,
        specId: obj.goods_id,
        source: 1
    },
    success: function (res) {
        // 在数据中加入购买数量，后期方便操作，初始值为1
        res.data.num = 1;
        // 存到本地存储
        localStorage.setItem('detailNav', JSON.stringify(res.data));
        // 存到本地存储(选择规格需要用到的数据)
        localStorage.setItem('choose', JSON.stringify(res.data));
        
        // 以下内容，只为初始化选择规格后的数据
        let choose = JSON.parse(localStorage.getItem('detailNav'));
        choose.num = res.data.num
        let arr = [];
        choose.product_specs = res.data.product_specs[0]
        arr.push(choose.product_specs);
        choose.product_specs = arr;
        localStorage.setItem('choose', JSON.stringify(choose));
        // console.log(res); 
        // console.log(res.data);
        detailHead(res.data)
        detailRight_head(res.data)   
        detailRight_color(res.data)
    }
});

// 点击选择颜色按钮
$("#selectColor").on('click', 'li', function () {
    // 获取点击到的文本内容
    let text = this.innerText
    // 给点到颜色加边框
    $(this).addClass("cur").siblings().removeClass("cur");
    // 获取本地存储数据
    let data = JSON.parse(localStorage.getItem('detailNav'));
    // 筛选出相应颜色的那条数据
    let arr = data.product_specs.filter(function (item, index, ) {
        return text == item.color_name;
    })
    // console.log(arr);
    // 修改数据里的数组，只存在这一条，需要渲染到头部颜色
    data.product_specs = arr
    // 再存一条选择好的本地存储  后续需要用到 规格选择后的数据
    localStorage.setItem('choose', JSON.stringify(data));
    // console.log(cc);
    detailRight_head(data);
});

// 点击小图切换大图
$('#img_thumb').on('click', 'li', function () {
    // 获取小图的路径
    let url = $(this).children("img").attr("src");
    // 把这个路径赋值给大图
    $('#imgSrc').attr("src", url);
    // 点到的li边框加上去，其他的去掉
    $(this).addClass("liAtive").siblings().removeClass("liAtive");
})

// 点击加减数量
// 增加
$('.add').click(function () {
    // $('.totle').html(+$('.totle').text() + 1);
    // 获取本地存储
    let data = JSON.parse(localStorage.getItem('detailNav'));
    data.num += 1;
    // 修改本地存储的内容 
    localStorage.setItem('detailNav', JSON.stringify(data));

    // 获取选择完的本地存储
    let choose = JSON.parse(localStorage.getItem('choose'));
    choose.num = data.num
    // 修改规格选择完的本地存储
    localStorage.setItem('choose', JSON.stringify(choose));
    $('.totle').html(data.num);
});
// 减少
$('.minus').click(function () {
    // 获取本地存储
    let data = JSON.parse(localStorage.getItem('detailNav'));
    if (data.num <= 1) {
        data.num == 1
    } else {
        data.num -= 1;
    }
    // 修改本地存储的内容 
    localStorage.setItem('detailNav', JSON.stringify(data));
    // 获取选择完的本地存储
    let choose = JSON.parse(localStorage.getItem('choose'));
    choose.num = data.num
    // 修改规格选择完的本地存储
    localStorage.setItem('choose', JSON.stringify(choose));

    $('.totle').html(data.num);
});

// 渲染函数 
// 渲染 首页/介绍
function detailHead(data) {
    // console.log(data);
    let strNav = `
                <a target="_blank" href="../index.html">首页</a> &nbsp;/&nbsp;
                <a href="javascript:;"></a>
                <a href="javascript:void(0)">${data.product_name}</a>`;
    $('.nav').html(strNav);
}

// 渲染 信息 图片
// 标题
function detailRight_head(data) {
    // console.log(data);
    // 标题
    let strright_p = `
                    <span style="font-size: 24px; color: rgb(0, 0, 0);">${data.product_name} <b class="yanse">${data.product_specs[0].color_name}</b> 
                    </span>`;
    $('.main_right_p').html(strright_p);

    // 价格 
    let price = `
            <span><i class="priceIcon">¥ </i>${data.product_specs[0].price}</span>`;
    $('.PriceContent').html(price);

    // 图片放大镜那个盒子
    // 大盒子
    let imgBig = `
                <div class="fangda">
                    <img class="bigImg" src="//oss.static.nubia.cn/${data.product_specs[0].images[0]}">  
                </div>
                <div class="small">
                    <img id="imgSrc" src="//oss.static.nubia.cn/${data.product_specs[0].images[0]}">   
                     <div class="zzc"></div>
                </div>`;
    $('.img_datu').html(imgBig);
    // 下面的小图片li
    let liImg = ``;
    data.product_specs[0].images.forEach((item, index) => {
        if (index == 0) {
            liImg += `
                    <li class="liAtive">
                        <img src="//oss.static.nubia.cn/${item}">
                    </li>`
        } else {
            liImg += `
                    <li>
                        <img src="//oss.static.nubia.cn/${item}">
                    </li>`
        }
    });
    $('#img_thumb').html(liImg);
    zoom();
}

// 渲染选择颜色函数
function detailRight_color(data) {
    // 选择颜色
    let strColor = '';
    data.product_specs.forEach((colorItem, index) => {
        if (index == 0) {
            strColor += `
            <li class="cur">${colorItem.color_name}</li>`;
        } else {
            strColor += `
            <li class="">${colorItem.color_name}</li>`;
        }
    });
    $('#selectColor').html(strColor);
}

// 点击"加入购物车"，先判断是否已经登陆
$('.addShopCar').click(function () {

    // 查看是否已经登陆
    let loginCookie = getCookie("login");

    if (loginCookie) {
        // 获取本地存储的数据 获取选择完的数据
        let data = JSON.parse(localStorage.getItem('choose'));
        console.log(data);
        $.ajax({
            url: `/api/addCarData.php`,
            data: {
                username: loginCookie,
                goods_id: data.default_sid,
                goods_color: data.product_specs[0].color_name,
                goods_name: data.product_name,
                goods_price: data.product_specs[0].price,
                goods_img: data.product_specs[0].images[0],
                goods_num: data.num
            },
            success : function(res) {
                // console.log(res);
                // console.log(JSON.parse(res) );
                if (JSON.parse(res).code) {
                    alert("添加购物车成功");
                }
            }
        });
    } else {
        // 不存在就跳去登陆
        // 获取url地址
        let url = location.href
        // 设置 localStorage 登陆完根据传过去的地址直接回到这个页面
        localStorage.setItem("url", url);
        location.href = '/html/login.html';
    }
});

// 放大镜
function zoom() {
     // 当鼠标进入的时候 将镜片和大图显示
    //  console.log($('.img_datu')[0]);
     $('.img_datu').mouseenter(function () {
         $('.zzc').css('display', 'block')
         $('.fangda').css({'display': 'block','z-index' : '10000000'})

     })
     //当鼠标移开的时候，镜片和大图隐藏
     $('.img_datu').mouseleave(function () {
         $('.zzc').css('display', 'none')
         $('.fangda').css('display', ' none')
     })

     $('.img_datu').mousemove(function (e) {
         var r = ($('.fangda img')[0].clientWidth - $('.fangda')[0].clientWidth) / ($('.small img')[0]
             .clientWidth - $('.zzc')[0].clientWidth);
             console.log(r);
         // obj里存着left和top 表示zoom元素到页面的距离 
         var obj = offset($('.main_left')[0]);
         var resultX = e.pageX - obj.left - $('.zzc')[0].clientWidth / 2;
         var resultY = e.pageY - obj.top - $('.zzc')[0].clientHeight / 2;
         // 边界判定
         if (resultX < 0) {
             resultX = 0;
         } else if (resultX > $('.img_datu')[0].clientWidth - $('.zzc')[0].clientWidth) {
             resultX = $('.img_datu')[0].clientWidth - $('.zzc')[0].clientWidth;
         }

         if (resultY < 0) {
             resultY = 0;
         } else if (resultY > $('.img_datu')[0].clientHeight - $('.zzc')[0].clientHeight) {
             resultY = $('.img_datu')[0].clientHeight - $('.zzc')[0].clientHeight;
         }
         // e里面存着 鼠标到页面的距离
         $('.zzc').css('left', resultX)
         $('.zzc').css('top', resultY)

         let bigLeft = -resultX * r;
         let bigTop = -resultY * r;

         $('.bigImg').css('left', bigLeft);
         $('.bigImg').css('top', bigTop);

     })



    //  // 给每一个li添加鼠标进入事件
    //  $('#zoomList li').each(function (index, value) {
    //      value.onmouseenter = function () {
    //          // 循环所有的li 将颜色清除
    //          $('#zoomList li').each(function (index, item) {
    //              item.style.borderColor = "#555";
    //          })
    //          // 再单独给当前元素添加
    //          value.style.borderColor = "red";

    //          // 换图
    //          // 获取小图路径
    //          var smallImageSrc = value.getAttribute("data-small-img");
    //          $('.img_datu img')[0].src = smallImageSrc;

    //          // 获取大图路径
    //          var bigImageSrc = value.getAttribute("data-big-img");
    //          $('small')[0].src = bigImageSrc;
    //      }
    //  })
}
