"use strict";$(function(){$("#carHeader").load("../html/head.html"),$("#carFoot").load("../html/foot.html")});var loginCookie=getCookie("login");function carUpd(o){console.log(o),$.ajax({url:"/api/updCarData.php",data:{username:o.username,goods_id:o.goods_id,goods_num:o.goods_num,goods_color:o.goods_color},success:function(o){}})}function carDel(o,a,s){$.ajax({url:"/api/clearCarData.php",data:{username:s,goods_id:o,goods_color:a},success:function(o){console.log(o)}})}function payMoney(o,a,s){$.ajax({url:"/api/removeCarData.php",data:{username:s,goods_id:o,goods_color:a},success:function(o){console.log(JSON.parse(o))}})}function renderNO(){$(".cart").html('\n        <div id="cart">\n            <div class="cart-empty">\n                <div class="empty-container">\n                    <div class="left">\n                        <div class="h1">\n                            您的购物车还是空的 <br>赶紧行动吧！\n                        </div>\n                        <a href="/html/shopp.html" class="btn-gobuy">马上去购物</a>\n                    </div>\n                    <div class="right">\n                        <img src="/images/1608082129.jpg" alt="">\n                    </div>\n                </div>\n            </div>\n        </div>')}function renderYes(o){console.log(o);var a=o.every(function(o){return 1==o.is_select}),s=o.filter(function(o){return 1==o.is_select}),n=0,e=0;s.forEach(function(o){n+=+o.goods_num,e+=o.goods_num*o.goods_price});var t='\n                <div class="cart-con">\n                    <div class="cart-h1">\n                        <input type="checkbox" class="checkAll" '+(a?"checked":"")+">全选 &nbsp;商品清单:\n                    </div>\n                </div>";o.forEach(function(o){t+='\n            <div class="goods" goods_id=\''+o.goods_id+"' goods_color='"+o.goods_color+'\'>\n                <div><input type="checkbox" class="check" '+(1==o.is_select?"checked":"")+'></div>\n                <div><img src="//oss.static.nubia.cn/'+o.goods_img+'" alt=""></div>\n                <div><a href=\'/html/detail.html?goods_id='+o.goods_id+"'>"+o.goods_name+"  "+o.goods_color+"</a></div>\n                <div>￥"+(+o.goods_price).toFixed(2)+'</div>\n                <div style=" padding-left: 40px; padding-right: 40px; ">\n                    <div>\n                        <div class="red but" goods_id=\''+o.goods_id+"' goods_color='"+o.goods_color+'\'>-</div>\n                        <span class="num_goods">'+o.goods_num+'</span>\n                        <div class="add but" goods_id=\''+o.goods_id+"' goods_color='"+o.goods_color+"'>+</div>\n                    </div>\n                </div>\n                <div>￥"+(o.goods_num*o.goods_price).toFixed(2)+'</div>\n                <div class="del" style="padding-top: 60px;">×</div>\n            </div>'}),t+='\n            <div class="jisuan">\n                <div>已选择<b style="color : red;"> '+n+' </b>件商品</div>\n            </div>\n            <div class="jiesuan">\n                <div class="jiesuan_R">\n                    <div class="jiesuan_R_top">\n                        <p>\n                            <span class="span1">合计（不含运费）</span>\n                            <span class="span2"><i style="color : red;">￥</i><b style="color : red;"> '+e.toFixed(2)+' </b></span>\n                        </p>\n                    </div>\n                    <div class="jiesuan_R_foot">\n                        <a href="/html/shopp.html" class="jixu">继续购物</a>\n                        <a class="go-pay">去结算</a>\n                    </div>\n                </div>\n            </div> ',$(".container").html(t)}$.ajax({url:"/api/getCarData.php",data:{username:loginCookie},success:function(o){0==(o=JSON.parse(o)).length?renderNO():(localStorage.setItem("carData",JSON.stringify(o)),renderYes(o))}}),$(".container").on("click",".add",function(){var o=JSON.parse(localStorage.getItem("carData"));console.log(o);var a=$(this).attr("goods_id"),s=$(this).attr("goods_color"),n=o.filter(function(o){return o.goods_id==a&&o.goods_color==s});n[0].goods_num=+n[0].goods_num+1,localStorage.setItem("carData",JSON.stringify(o)),carUpd({username:loginCookie,goods_id:n[0].goods_id,goods_color:n[0].goods_color,goods_num:n[0].goods_num}),renderYes(o)}),$(".container").on("click",".red",function(){var o=JSON.parse(localStorage.getItem("carData")),s=$(this).attr("goods_id"),n=$(this).attr("goods_color"),a=o.filter(function(o,a){return o.goods_id==s&&o.goods_color==n});a[0].goods_num<=1?(console.log(1),a[0].goods_num=1):a[0].goods_num=+a[0].goods_num-1,localStorage.setItem("carData",JSON.stringify(o)),console.log(a[0]),carUpd({username:loginCookie,goods_id:a[0].goods_id,goods_color:a[0].goods_color,goods_num:a[0].goods_num}),renderYes(o)}),$(".container").on("click",".del",function(){var s=$(this.parentNode).attr("goods_id"),n=$(this.parentNode).attr("goods_color"),o=JSON.parse(localStorage.getItem("carData")).filter(function(o,a){return o.goods_id!=s&&o.goods_color!=n});localStorage.setItem("carData",JSON.stringify(o)),carDel(s,n,loginCookie),renderYes(o)}),$(".container").on("click ",".checkAll",function(){var o=JSON.parse(localStorage.getItem("carData"));console.log(o),this.checked?o.forEach(function(o){o.is_select=1}):o.forEach(function(o){o.is_select=0}),localStorage.setItem("carData",JSON.stringify(o)),renderYes(o)}),$(".container").on("click ",".check",function(){var a=this,s=this.parentNode.parentNode.getAttribute("goods_id"),n=this.parentNode.parentNode.getAttribute("goods_color"),o=JSON.parse(localStorage.getItem("carData"));o.forEach(function(o){o.goods_id==s&&o.goods_color==n&&(o.is_select=a.checked?1:0)}),localStorage.setItem("carData",JSON.stringify(o)),renderYes(o)}),$(".container").on("click",".go-pay",function(o){var a=JSON.parse(localStorage.getItem("carData"));data1=a.filter(function(o){return 1==o.is_select}),console.log(data1);var s,n,e=$(".span2 b").html();confirm("共需要支付 :"+e+"，确定购买吗！")&&(n=s=void 0,data1.forEach(function(o){s=o.goods_id,n=o.goods_color,payMoney(s,n,loginCookie)}),data2=a.filter(function(o){return 0==o.is_select}),localStorage.setItem("carData",JSON.stringify(data2)),0==data2.length?renderNO():renderYes(data2))});