$(function () {
    $('#carHeader').load('../html/head.html');
    $('#carFoot').load('../html/foot.html');
})

// 判断是否购物车是否为空
// 获取登陆的用户名
let loginCookie = getCookie("login");

// 发送AJAX
$.ajax({
    url: '/api/getCarData.php',
    data: {
        username: loginCookie,
    },
    success: function (res) {
        // console.log(res);
        // console.log(JSON.parse(res));
        res = JSON.parse(res)
        if (res.length == 0) {
            renderNO()
        } else {
            localStorage.setItem('carData', JSON.stringify(res));
            renderYes(res);
        }
    }
});

// 每次操作完页面修改购物车数据库的数据 (数据数量变化)
function carUpd(res) {
    console.log(res);
    $.ajax({
        url: '/api/updCarData.php',
        data: {
            username: res.username,
            goods_id: res.goods_id,
            goods_num: res.goods_num,
            goods_color: res.goods_color,
        },
        success: function (res) {

        }
    });
}

// 每次操作完删除X按钮 (数据删除)
function carDel(Id, Color, loginCookie) {
    $.ajax({
        url: '/api/clearCarData.php',
        data: {
            username: loginCookie,
            goods_id: Id,
            goods_color: Color
        },
        success: function (res) {
            console.log(res);
        }
    });
}

// 每次结算完操作数据库（删除购买的数据）
function payMoney(Id, Color, loginCookie) {
    $.ajax({
        url: '/api/removeCarData.php',
        data: {
            username: loginCookie,
            goods_id: Id,
            goods_color: Color
        },
        success: function (res) {
            console.log(JSON.parse(res));
        }
    });
};

// 点击 -+ 变化数量
// 增加
$('.container').on('click', '.add', function () {
    // 获取本地存储
    let data = JSON.parse(localStorage.getItem('carData'));
    console.log(data);

    // 确定我点击的是哪一个商品，获取点击到的盒子自定义属性（商品的ID）和 自定义商品名
    let Id = $(this).attr('goods_id')
    let Color = $(this).attr('goods_color')

    // 根据Id和Name筛选出我点击到的数据
    let arr = data.filter(function (item) {
        return item.goods_id == Id && item.goods_color == Color
    });
    // 修改num值
    arr[0].goods_num = +arr[0].goods_num + 1;
    // 修改本地存储
    localStorage.setItem('carData', JSON.stringify(data));
    // 修改数据库的数据
    // console.log(arr[0]);
    let res = {
        username: loginCookie,
        goods_id: arr[0].goods_id,
        goods_color: arr[0].goods_color,
        goods_num: arr[0].goods_num,
    }
    carUpd(res)
    // 重新渲染
    renderYes(data)
})
// // 减少
$('.container').on('click', '.red', function () {
    // 获取本地存储
    let data = JSON.parse(localStorage.getItem('carData'));
    // 确定我点击的是哪一个商品，获取点击到的盒子自定义属性（商品的ID）和 自定义商品名
    let Id = $(this).attr('goods_id')
    let Color = $(this).attr('goods_color')
    // 根据Id和Name筛选出我点击到的数据
    let arr = data.filter(function (item, index) {
        return item.goods_id == Id && item.goods_color == Color
    });
    // 修改num值
    if (arr[0].goods_num <= 1) {
        console.log(1);
        arr[0].goods_num = 1;
    } else {
        arr[0].goods_num = +arr[0].goods_num - 1;
    }
    // 修改本地存储
    localStorage.setItem('carData', JSON.stringify(data));
    // 修改数据库的数据
    console.log(arr[0]);
    let res = {
        username: loginCookie,
        goods_id: arr[0].goods_id,
        goods_color: arr[0].goods_color,
        goods_num: arr[0].goods_num,
    }
    carUpd(res)
    // 重新渲染
    renderYes(data)
});

// 点击删除键，去掉整条商品
$('.container').on('click', '.del', function () {
    // 获取点到的那件商品，获取自定义属性 来筛选
    let Id = $(this.parentNode).attr("goods_id");
    let Color = $(this.parentNode).attr("goods_color");

    // 获取本地存储
    let data = JSON.parse(localStorage.getItem('carData'));

    // 根据Id和Name筛选出不是我点击到的数据  点击到的删除掉 
    let dataNew = data.filter(function (item, index) {
        return item.goods_id != Id && item.goods_color != Color
    });
    // 修改本地存储
    localStorage.setItem('carData', JSON.stringify(dataNew));
    // 修改数据库 数据
    carDel(Id, Color, loginCookie)

    // 重新渲染
    renderYes(dataNew)
})

// 点击全选按钮框 
$('.container').on('click ', '.checkAll', function () {
    // 获取本地存储
    let data = JSON.parse(localStorage.getItem("carData"));
    console.log(data);
    if (this.checked) {
        data.forEach(item => {
            item.is_select = 1;
        });
    } else {
        data.forEach(item => {
            item.is_select = 0;
        });
    }
    // 修改本地存储
    localStorage.setItem('carData', JSON.stringify(data));
    // 重新渲染
    renderYes(data)
})

// 点击单个复选框
$('.container').on('click ', '.check', function () {
    // 获取自定义的ID和颜色，ID颜色筛选
    let Id = this.parentNode.parentNode.getAttribute("goods_id");
    let Color = this.parentNode.parentNode.getAttribute("goods_color");

    // // 获取本地存储的数据循环，改变里面的is_select值
    let data = JSON.parse(localStorage.getItem('carData'));
    data.forEach(item => {
        if (item.goods_id == Id && item.goods_color == Color) {
            item.is_select = this.checked ? 1 : 0;
        }
    })
    // // 需要把 修改后的数据存储本地存储中
    localStorage.setItem('carData', JSON.stringify(data));
    // 重新渲染
    renderYes(data)
})

// 结算功能(结算选中的数据，然后在数据库删除结算的数据)
$('.container').on('click', '.go-pay', function (event) {

    // 获取本地存储
    let data = JSON.parse(localStorage.getItem('carData'));
    // 把选择到的数据筛选出来（is_select = 1）
    data1 = data.filter(function (item) {
        return item.is_select == 1;
    })
    console.log(data1);

    // 选中商品的价钱
    let jiaqian = $('.span2 b').html();
    // 点击弹窗取消的话，就不会执行if之下的代码了
    if (!confirm("共需要支付 :" + jiaqian + "，确定购买吗！")) {
        return;
    }
    // 如果已经点击确认支付 把选中的数据这个些数据，拿到去数据库删除掉
    let ID;
    let Color;
    data1.forEach(item => {
        ID = item.goods_id;
        Color = item.goods_color;
        payMoney(ID, Color, loginCookie);
    });
    
    // 把没有选择到的数据筛选出来（is_select = 0）需要重新加入本地存储，然后重新渲染
    data2 = data.filter(function (item) {
        return item.is_select == 0;
    })
    // 把没有选择到的数据加入本地存储
    localStorage.setItem('carData', JSON.stringify(data2));
    // 若没有剩下了的数据，就显示购物车空了，如果还有，就渲染剩下的数据
    if (data2.length == 0) {
        renderNO()
    } else {
        // 重新渲染
        renderYes(data2);
    }

});

// 渲染不存在数据的函数
function renderNO() {
    let strNo = `
        <div id="cart">
            <div class="cart-empty">
                <div class="empty-container">
                    <div class="left">
                        <div class="h1">
                            您的购物车还是空的 <br>赶紧行动吧！
                        </div>
                        <a href="/html/shopp.html" class="btn-gobuy">马上去购物</a>
                    </div>
                    <div class="right">
                        <img src="/images/1608082129.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>`;
    $('.cart').html(strNo);
}

// 渲染有数据的函数
function renderYes(res) {
    console.log(res);  
    // 判断是否已经全部的复选框都点亮了（所有的数据的is_select == 1）， 是的话就会返回ture,全选按钮就会亮
    let allChecked = res.every(item => {
        return item.is_select == 1;
    });

    // 把选择到的数据筛选出来（is_select = 1）
    let data = res.filter(function (item) {
        return item.is_select == 1;
    })
    // 循环这个数据，拿到一个选择了多少个商品数量（一种商品可以有好几个）, 顺便计算总价格
    // console.log(data);
    let Number = 0; //数量
    let priceNum = 0; // 总价
    data.forEach(item => {
        Number += +item.goods_num;
        priceNum += item.goods_num * item.goods_price;
    });

    // 下面为真正的渲染
    let strCar = `
                <div class="cart-con">
                    <div class="cart-h1">
                        <input type="checkbox" class="checkAll" ${allChecked?'checked' :''}>全选 &nbsp;商品清单:
                    </div>
                </div>`;
    res.forEach(item => {
        strCar += `
            <div class="goods" goods_id='${item.goods_id}' goods_color='${item.goods_color}'>
                <div><input type="checkbox" class="check" ${item.is_select == 1 ? "checked" : ""}></div>
                <div><img src="//oss.static.nubia.cn/${item.goods_img}" alt=""></div>
                <div><a href='/html/detail.html?goods_id=${item.goods_id}'>${item.goods_name}  ${item.goods_color}</a></div>
                <div>￥${(item.goods_price*1).toFixed(2)}</div>
                <div style=" padding-left: 40px; padding-right: 40px; ">
                    <div>
                        <div class="red but" goods_id='${item.goods_id}' goods_color='${item.goods_color}'>-</div>
                        <span class="num_goods">${item.goods_num}</span>
                        <div class="add but" goods_id='${item.goods_id}' goods_color='${item.goods_color}'>+</div>
                    </div>
                </div>
                <div>￥${(item.goods_num * item.goods_price).toFixed(2)}</div>
                <div class="del" style="padding-top: 60px;">×</div>
            </div>`
    });
    strCar += `
            <div class="jisuan">
                <div>已选择<b style="color : red;"> ${Number} </b>件商品</div>
            </div>
            <div class="jiesuan">
                <div class="jiesuan_R">
                    <div class="jiesuan_R_top">
                        <p>
                            <span class="span1">合计（不含运费）</span>
                            <span class="span2"><i style="color : red;">￥</i><b style="color : red;"> ${priceNum.toFixed(2)} </b></span>
                        </p>
                    </div>
                    <div class="jiesuan_R_foot">
                        <a href="/html/shopp.html" class="jixu">继续购物</a>
                        <a class="go-pay">去结算</a>
                    </div>
                </div>
            </div> `
    $('.container').html(strCar);
}