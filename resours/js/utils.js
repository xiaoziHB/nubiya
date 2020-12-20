/* 
    js工具库：封装一些比较常用的函数
*/

// 计算任意参数之和
function sum() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    // 把结果返回出去
    return sum;
}


function maxNum() {
    // 假设第一个为最大值
    var max = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i]
        }
    }
    return max;
}


function minNum() {
    // 假设第一个为最小值
    var min = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] < min) {
            min = arguments[i]
        }
    }
    return min;
}


// 封装一个函数，求 n-m之间随机整数
function randomNumber(n, m) {
    if (n > m) {
        return parseInt(Math.random() * (n - m + 1) + m)
    } else {
        return parseInt(Math.random() * (m - n + 1) + n)
    }
}

// 封装一个函数 把url的参数转化为 对象
function changeObj(str) {
    var arr = str.split("&");
    var obj = {}; //定义一个空对象用
    arr.forEach(function (item) {
        var newArr = item.split("=");
        obj[newArr[0]] = newArr[1];
    });
    return obj
}

// 封装一个随机颜色函数
function randomColor() {
    return "rgb(" + randomNumber(0, 255) + "," + randomNumber(0, 255) + "," + randomNumber(0, 255) + ")";
}

// 封装一个时间格式的函数 2020-11-07  15:30:32  星期六 格式的时间
function formatTime(date, fuhao) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    var day = date.getDate();
    // 如果 日期是 10号之后的 直接写本身，如果日期小于 10 的是，需要在日期前面 +0
    day = day >= 10 ? day : "0" + day;
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var week = date.getDay(); //返回值的是 数字

    var arr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    week = arr[week];

    fuhao = fuhao ? fuhao : "/";
    // 如果不传递符号这个参数的时候  ，需要做一个处理
    return `${year}${fuhao}${month}${fuhao}${day}  ${hours}:${min}:${sec}  ${week}`
}

// 封装一个计算两个时间差的函数
function timeDifference(date1, date2) {
    // 先算两个时间对象到格林威治时间的时间差
    var time1 = date1.getTime();
    var time2 = date2.getTime();

    // 两个时间的时间差的时间戳
    var time = Math.abs(time1 - time2);

    // 计算两个时间差的天数
    var day = parseInt(time / 1000 / 60 / 60 / 24);

    // 计算小时 
    // var hours = time / 1000 / 60 / 60 / 24 - day;
    var hours = parseInt((time / 1000 / 60 / 60) % 24);

    // 计算 分钟
    var min = parseInt((time / 1000 / 60) % 60);

    // 计算秒数
    var sec = parseInt(time / 1000 % 60);

    // 昨天2020年 11月 8号 12:10:20
    // 今天2020年 11月 9号 13:10:10
    // 1天 0小时 59分50秒

    // 把计算的day hours min sec 当成函数的返回值
    var obj = {
        day: day,
        hours: hours,
        min: min,
        sec: sec
    }
    return obj;
    // console.log(`两个时间相差${day}天${hours}小时${min}分${sec}秒`);
}

// 封装一个函数 兼容的获取元素的样式
// 你要获取哪个元素的什么样式  box width
function getStyle(ele, attr) {
    var res;
    if (window.getComputedStyle) {
        res = window.getComputedStyle(ele)[attr];
    } else {
        res = ele.currentStyle[attr];
    }
    return res;
}

// 封装一个事件监听的函数
// 事件源ele，事件类型type, 事件处理函数callback 可变
function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback)
    } else {
        ele.attachEvent("on" + type, callback);
    }
}

function animation(ele, obj, callback) {
    // 记录定定时器的个数
    let timerLen = 0;
    for (let key in obj) {
        // 没for循环一次 那么timerLen 加一次
        timerLen++;
        let attr = key;
        let target = obj[key];
        // 获取元素的当前值
        let style;
        let speed;
        // 开启这次定时器之前 先清空定时器
        clearInterval(ele[attr]);

        // 定义一个定时器 来执行动画的
        // 把定时器当成元素的属性存储起来
        // attr = width ele[attr] = ele.width
        // ele.height
        ele[attr] = setInterval(() => {
            // 没执行一次定时器的时候就需要获取元素的最新的当前值
            // opacity 的取值为 0-1 ===》0-100
            if (attr == "opacity") {
                // 不能取整， 因为透明度没有单位 而且透明度的取整为0-1 有小数
                style = getStyle(ele, attr) * 100;
            } else {
                style = parseInt(getStyle(ele, attr));
            }
            speed = (target - style) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;
            if (target == style) {
                clearInterval(ele[attr]);
                // 没结束一个定时器，就让timerLen - 1
                timerLen--;
                // 如果在这个位置 去写动画结束 执行的代码，会执行多次，有几个定时就会执行几次
                //    ele.style.backgroundColor = "green";
            }

            // 如果属性为透明度的时候 ，样式是不需要单位的
            if (attr == "opacity") {
                // 因为上面获取的时候 *100
                ele.style[attr] = style / 100;
            } else {
                ele.style[attr] = style + 'px';
            }

            console.log(timerLen);
            // 当timerLen = 0的时候说明所有动画都结束
            if (timerLen == 0) {
                //  当有callback的时候那么久执行callback
                // 如果没有callback 就不用 当callback没有传递参数的时候，callback = undefined
                callback && callback();
            }
        }, 30)
    }
}