//1、获取数据
$.ajax({
    url: "/nbyFoot",
    success: function (res) {
        res = res.data.result
        // 存到本地存储
        localStorage.setItem('footNav', JSON.stringify(res));

        // console.log(res);
        renderFoot(res);
    }
});
// 渲染函数
function renderFoot(res) {

    let str = "";
    res.forEach((item, index) => {
        // console.log(res);
        str += `
        <div>
            <p>${item.name}</p>
            <ul>`
        item.menus_list.forEach(value => {
            str += `<li><a href="">${value.title}</a></li>`;
        });
        str += `
            </ul>
            </div>`;
    });
    str += `
    <div class="zhong_last">
        <div class="kefu">
            <a href="">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
                <span>在线客服</span>
            </a>
        </div>
        <p>全国服务热线</p>
        <p><strong>400-700-6600</strong></p>
        <p>周一到周日<strong>8:30-20:30</strong>(全年无休)</p>
        <div class="guanzhu">
            <span>关注我们:</span>
            <a href="">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-weixin"></use>
                </svg>
            </a>
            <a href="">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-weibo"></use>
                </svg>
            </a>
        </div>
    </div>`;
    $('.zhong').html(str);
}