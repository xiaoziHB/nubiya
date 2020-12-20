/* ---------------------------------- */
// 给validate自定验证规则  jQuery.validator.addMethod(规则名字,函数,'验证错误的提示信息')
// 用户名
$.validator.addMethod('testTel', function (value) {
    let reg2 = /^1[3,5,6,7,8]\d{9}$/;
    if (reg2.test(value)) {
        return true
    } else {
        return false
    }
}, '*请输入正确的手机号码格式');
// 手机号
jQuery.validator.addMethod("nameRed", function (value) {
    var reg3 = /^[a-zA-Z]([-_a-zA-Z0-9]{5,11})$/;
    if (reg3.test(value)) {
        return true
    } else {
        return false
    }
}, "*请输以英文数字组成英文开头的6-12位用户名");
//密码
jQuery.validator.addMethod("passRed", function (value) {
    var reg3 = /^[a-zA-Z]([-_a-zA-Z0-9]{7,15})$/;
    if (reg3.test(value)) {
        return true
    } else {
        return false
    }
}, "*请输以字母开头，数字字母标点符号组成8-16位密码");
// 验证码
let yzjg
jQuery.validator.addMethod("yzmRed", function (value) {
    let a = value.toUpperCase()
    if (yzjg == a) {
        return true
    } else {
        return false
    }
}, "*验证码有误");


$('#registerForm').validate({
    // 规则
    rules: {
        username: {
            required: true,
            nameRed: true


        },
        phone: {
            required: true,
            testTel: true
        },
        password: {
            required: true,
            passRed: true
        },
        yzyzm: {
            required: true,
            yzmRed: true
        }
    },


    // 当不满足规则的是 编写的提示信息
    messages: {
        username: {
            required: '*用户名是必填项目',
        },
        password: {
            required: '*密码是必填项目',
        },
        phone: {
            required: '*手机号是必填项目',
            // testTel : "请输入正确的手机号格式"
        },
        yzyzm: {
            required: '*验证码是必填项目',
        }
    },

    submitHandler: function () {
        // 当界面中所有的表单验证都成功的时候 执行此方法
        // 发送ajax请求
        // console.log(1);
        console.log($('#usernameInput')[0].value);
        console.log($('#passwordInput1')[0].value);
        console.log($('#phoneInput')[0].value);
        pAjax({
            url: "../api/register.php",
            data: {
                username: $('#usernameInput')[0].value,
                password: $('#passwordInput1')[0].value,
                phone: $('#phoneInput')[0].value
            },
            type: "post"
        }).then(data => {
            data = JSON.parse(data);
            console.log(data);

            zhuce(data)
        });
    }
});


function zhuce(data) {
    if (data.code == true) {
        if (confirm("注册成功，是否马上去登陆")) {
            location.href = './login.html';
        } else {
            $('#usernameInput')[0].value = "";
            $('#passwordInput1')[0].value = "";
            $('#phoneInput')[0].value = "";
            $('#yzmInput')[0].value = "";
        } ;
    } else {
        alert("注册失败，该用户已存在");
    }
}

// 判断，是否点击同意隐私声明
checkBox.onclick = function () {
    // console.log(1);

    if (checkBox.checked == true) {
        register.removeAttribute("disabled");
    } else {
        register.disabled = "disabled";
    }
}

//初始化验证码
yzmhq.onclick = function () {
    yzmhq.innerText = "";
    let verifyCode = new GVerify({
        id: "yzmhq",
        length: 4
    });
   
    yzjg = verifyCode.options.code.toUpperCase();
}


// 点击去登陆回去登陆页面
loginBtn.onclick = function () {
    location.href = "./login.html"
}

