$.ajax({
    url: "/nbyHead",
    success: function (res) {
        // 存到本地存储
        localStorage.setItem('headNav', JSON.stringify(res.data.result));

        // console.log(res);
        console.log(1);
        // 调用hover 移入移出显示/隐藏
        hoverFun(res.data.result);
    }
});

/* 头部渲染函数 */
// hover函数 移入移出显示隐藏盒子
function hoverFun(data) {
    // console.log(data);

    $('.list_content a').each(function (index, item) {
        // 只有 移入index为1/2/3才显示这个东西出来  如果移入的不是123，就让它收回去
        if (index == 1 || index == 2 || index == 3) {
            item.onmouseover = function () {
                $('.nav_box').finish().slideDown(200, 'linear');
                renderNav(data[index - 1]);
            }
        } else {
            item.onmouseover = function () {
                $('.nav_box').finish().slideUp(200, 'linear');
            }
        }
    })

    // 移入盒子，再次显示出来
    $('.nav_box').mouseover(() => {
        $('.nav_box').stop().slideDown(200, 'linear');
    })
    // 移出盒子，就隐藏盒子
    $('.nav_box').mouseleave(() => {
        $('.nav_box').finish().slideUp(200, 'linear');
    })
    // 移出 ul-li 盒子隐藏
    $('.list_content').mouseleave(() => {
        $('.nav_box').finish().slideUp(200, 'linear');
    })
}
// 渲染头部隐藏盒子内容
function renderNav(data) {
    // console.log(data);
    // 当数据里有选项li的话，就给渲染这个 
    if (data.product_cates.length !== 1) {
        let left1 = '<div class="nav_box_left"><ul>';
        // 循环渲染li
        data.product_cates.forEach((item, index) => {
            left1 += `<li index="${index}">${item.cate_name}</li>`;
        });

        left1 += ` </ul></div>`;

        let right1 = `<div class="nav_box_right">`
        right1 += renderRight(data.product_cates[0]);
        let res = left1 + right1
        $('.nav_box').html(res);
        // console.log($('.nav_box_left li'));

        // 给左边的li添加mouseover事件  委托
        $('.nav_box').on('mouseover', 'li', function () {
            // 获取到鼠标指到的那个li上的自定义属性index
            let index = $(this).attr('index');
            console.log(index);
            // 先清空 再拼接。
            right1 = '';
            right1 = renderRight(data.product_cates[index]);

            $('.nav_box_right').html(right1);
        })

    } else {
        let left2 = '<div class="nav_box_left"><ul></ul></div>';
        let right2 = `<div class="nav_box_right">`;
        right2 += renderRight(data.product_cates[0]);
        $('.nav_box').html(left2 + right2);
    }
}
// 渲染隐藏盒子 每个商品数据
function renderRight(data) {
    let res = "";
    data.product_items.forEach((item, index) => {
        res +=
            `<div class="nav_box_right_one">
            <a href="">
                <img src=${item.image} alt="">
                <p>${item.product_name}</p>
                <span>${item.new_tag? '新品' : ''}</span>
            </a>
        </div>`
    });
    res += '</div>';
    return res;
}

// 点击去列表页
$(".list_content").on('click', 'a', function (e) {
    console.log(1);
    e.preventDefault();
    if (this.innerText == "智能生态") {
        location.href = `/html/shopp.html`
    }

});

// 点击去人头去登陆
$('#header').on('click', '.users', function (e) {
    e.preventDefault();
    // 看下是否已经登陆了， 登陆了就去个人信息中心，没有就跳转到登陆页面
    // console.log(1);
    let url = location.href;
    let loginCookie = getCookie('login');
    if (!loginCookie) {
        let url = location.href
        // 设置 localStorage 登陆完根据传过去的地址直接回到这个页面
        localStorage.setItem("url", url);
        location.href = '/html/login.html'
    } else {
        location.href = '/html/user.html';
    }
});

// 点击购物车图标 去购物车
$('.car').click(function (e) {
    e.preventDefault();
    location.href = '/html/car.html'
});

// 鼠标移动到头像事件 出来信息
$('.head_nav_right').on('mouseenter', '.users', function () {
    //信息显示
    $('.exit').css('display', 'block');

    let loginUser = getCookie('login')
    // 如果已经登陆  显示用户名  没有登陆就不显示用户名
    if (loginUser) {
        let str = `
            <a href="#" class="log">欢迎您，
                <span class="userName" style="font-weight: bold;">${loginUser}</span>
             </a>`
        $('.diyi').html(str);
    } else {
        // 登陆按钮
        let str = `
            <a href="#" class="log">您还没有登陆，
                <span class="userName" style="font-weight: bold;">请登陆！</span>
             </a>`
        $('.diyi').html(str);

        // 退出按钮也不能有 
        $('.Exit').css('display', 'none');
        $('.exit').css('height', '410px');
    }
})

// 鼠标移出，又不见了
$('.head_nav_right').mouseleave('on', function () {
    $('.exit').css('display', 'none');
})

// 点击信息里面的去登陆按钮 
$('.exit').on('click', '.diyi', function (e) {
    e.preventDefault();
    // 如果没有登陆，就跳转到登陆页面，如果登陆了，就跳到个人信息页面

    let loginUser = getCookie('login')
    if (loginUser) {
        location.href = '/html/user.html'
    } else {
        // 获取本页面地址，等下登录好要跳回来
        let url = location.href
        // 设置 localStorage 登陆完根据传过去的地址直接回到这个页面
        localStorage.setItem("url", url);
        location.href = '/html/login.html'
    }

})

// 点击信息里面的退出按按钮 
$('.exit').on('click', '.Exit', function (e) {
    e.preventDefault();
    
    // 先获取登陆设置的Cookie
    let loginUser = getCookie("login");
    // 清除登陆的Cookie
    setCookie("login", loginUser , -1);

    // 重新加载页面
    location.reload()
})

