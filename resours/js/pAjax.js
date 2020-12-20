

function ajax(option){
    // 【1】判断url是否传递参数
    if(!option.url){
        // 手动抛出一个错误，
        throw new  Error('url的参数时必填的');
    }


    // 设置默认值
    let defOption = {
        type:'get',
        async:true
    }

    // 把传递过去来的参数写入默认值当中
    for(let key in option){
        defOption[key] = option[key]
    }

    //【1】如果传递的type不是 get 或者post的时候，抛出错误提示使用者，type的值只能为get 或者 post
    if(!(defOption.type == 'get' || defOption.type == 'post')){
        throw new Error('type参数只能为get 或者 post');
    }

    // 【3】判断async 是否布尔值
    // console.log(Object.prototype.toString.call(defOption.async));
    if(Object.prototype.toString.call(defOption.async) != '[object Boolean]'){
        throw new Error('async 的值只能为布尔值');
    }

    if(defOption.data){ 
        // 【4】判断参数 data 是否是对象 和字符串的数据类型
        let dataType = Object.prototype.toString.call(defOption.data);
        if(!(dataType== '[object String]' || dataType == '[object Object]')){
            throw new Error('data的格式只能为key=value&key=value 或者 {key:value}');
        }

        // 判断data参数是否 是对象，如果是对象需要把参数处理为 key=value&key=value
        if(dataType == '[object Object]'){
            let str = '';
            for(let key in defOption.data){
                str += key + '=' + defOption.data[key] + '&';
            }
            defOption.data = str.substr(0,str.length-1);
        }
        // 当参数为字符串的时候，判断是否有=号
        if(dataType == '[object String]' && !defOption.data.includes('=')){
            throw new Error('data格式只能为key=value')
        }
    }
    

    // 【5】判断callback回调函数 
    if(!defOption.success){
        throw new Error('success是必须存在的参数')
    }

    // 判断callback 是否是函数
    if(Object.prototype.toString.call(defOption.success) != '[object Function]'){
        throw new Error('success必须是函数')
    }

    // try  catch
    // try 尝试执行 try代码，如果try中灭有错误的时候不执行catch方法中代码
    // try 有逻辑错误的时候 就会执行 catch中代码
    try{
        let xhr = new XMLHttpRequest();
        // 判断请求的是类型 来写请求携带参数
        if(defOption.type == 'get'){
            xhr.open(defOption.type,defOption.url + (defOption.data ? '?' + defOption.data : '') ,defOption.async);
            xhr.send()
        }else if(defOption.type == 'post'){
            xhr.open(defOption.type,defOption.url,defOption.async);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.send(defOption.data);
        }
    
        // 判断请求异步还是同步
        if(defOption.async){
            xhr.onload = function(){
                defOption.success(xhr.responseText);
            }
        }else{
            defOption.success(JSON.parse(xhr.responseText));
        } 
    }catch(err){
        defOption.error(err)
    }  
}

function pAjax(params){
   return new Promise(function (resolve, reject) {
        ajax({
            url: params.url,
            data:params.data,
            type:params.type || 'get',
            async:params.async || true,
            success: function(res){
                resolve(res);
            },
            // error当执行请求数据出错的时候执行方法
            error:function(res){
                reject(res)
            }
        })
    });
}