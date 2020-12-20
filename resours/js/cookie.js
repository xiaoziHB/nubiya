

/* 
    设置cookie，删除，修改
    如果cookie中没有key就添加，如果有这个可以 就是修改
    删除，直接设置cookie的过期时间为负数
*/
function setCookie(key,value,expires){
    // 若有expires参数传入是，参数单位为秒。
    // 当没有传递过期时间的时候，那么默认为会话时间，不设置 expires=${date}  
    if(expires){
        let date = new Date();
        let time = date.getTime() - 8*60*60*1000 + expires*1000;
        date.setTime(time);
    
        document.cookie = `${key}=${value};expires=${date};path=/`;
        return
    }
    document.cookie = `${key}=${value}`;    
}


/* 
    获取cookie，需要传递一个参数，为key
*/
function getCookie(key){
    let cookie = document.cookie;
    // a=1;b=2;c=3;
    // 先把字符串分割为数组，然后再把数组转化为对象
    // console.log(cookie);
    let arr = cookie.split("; ");
    
    let obj = {};
    arr.forEach((item)=>{
        let newArr = item.split("=");
        obj[newArr[0]] = newArr[1];
    });

    return obj[key]
}
