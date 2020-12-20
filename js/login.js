// 用户名：7个汉字或者 14个英文（保证只有14个以内的字节） [u4e00-u9fa5]
//     - 手机号：11位数字  /^1[356789]\d{9}$/
//       - 只能以1开头
//       - 第二位数 3 5 6 7 8 9
//     - 密码： /^[0-9a-zA-Z,\.]{8，14}$/
//       - 8-14个字符
//       - 数字 字母 标点标点符号 组成
//     - 验证码：给一个6位数的随机数
//     - 注册按钮：当上面所所有条件都要满足才能注册成功 
let register = document.getElementById("register");
        var loginBtn = document.getElementById("loginBtn");
        let yzmhq = document.getElementById("yzmhq");
        let yzmInput = document.getElementById("yzmInput");

        // 点击注册按钮去注册页面
        loginBtn.onclick = function () {
            location.href = "./register.html"
        }
        // 判断，是否点击同意隐私声明
        checkBox.onclick = function () {
            if (checkBox.checked == true) {
                register.removeAttribute("disabled");
            } else {
                register.disabled = "disabled";
            }
        }

        //初始化验证码
        let yzjg
        yzmhq.onclick = function () {
            yzmhq.innerText = "";
            let verifyCode = new GVerify({
                id: "yzmhq",
                length: 4
            });
            yzmInput.onblur = function () {
                // 拿到验证的结果
                yzjg = verifyCode.validate(yzmInput.value);
                if (yzjg) {
                    yzmInput.style.border = "1px solid #ccc"
                    yzmInput.style.background = "url(../img/g.png) no-repeat center right";
                    yzmInput.style.backgroundSize = "18px";
                } else {
                    yzmInput.style.background = "none";
                    yzmInput.style.border = "1px solid red"

                }
            }
        }

        register.onclick = function () {
            let usernameInput = document.getElementById("usernameInput");
            let passwordInput1 = document.getElementById("passwordInput1");
            // 如果验证码有误的话，直接不用发送AJAX请求了，return；
            if (!yzjg) {
                alert('验证码有误');
                return;
            }
            ajax({
                type: 'post',
                url: '../api/login.php',
                data: {
                    username: usernameInput.value,
                    password: passwordInput1.value,
                },
                callback: fun
            });

            function fun(res) {
                if (res) {
                   // 登陆成功设置cookie
                    // 若有expires参数传入是，参数单位为秒。
                    // 当没有传递过期时间的时候，那么默认为会话时间，不设置 expires=${date}
                    setCookie("login", usernameInput.value, (7 * 24 * 60 * 60));
                    // 获取在那个地方跳到登陆页面的路径
                    let url = localStorage.getItem('url');
                    // 如果是从别的页面跳转过的，就跳转回相应的页面   否则就直接跳回首页（）
                    if (url) {
                        location.href = url;
                        // 登录成功的时候把url的这个值清除
                        localStorage.removeItem('url');
                    } else {
                        location.href = "/index.html";
                    }
                } else {
                    alert("登陆失败，请检查用户名或密码");
                }
            }
        }