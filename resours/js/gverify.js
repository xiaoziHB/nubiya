class GVerify{
    constructor(options){
        this.options = {
            id:options.id,
            canvasId:options.canvasId || "verifyCanvas", // canvas的ID
            width: options.width || "100", // 默认canvas宽度
            height:options.height || "30", // 默认canvas高度
            type:  options.type || "blend", // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母

            // length 验证码的长度，默认为4位数的验证码
            length:options.length || 4,
            code: "",
            numArr : [1,2,3,4,5,6,7,8,9,0]
        };
        this.options.letterArr = this.getAllLetter();
        this.init();
        this.refresh();

    }
    init(){
        var con = document.getElementById(this.options.id);
        var canvas = document.createElement("canvas");
        // 如果元素有宽度p的元素有宽高就使用宽高，没有就使用传进来的宽高
        this.options.width = con.offsetWidth > 0 ? con.offsetWidth :this.options.width;
        this.options.height = con.offsetHeight > 0 ? con.offsetHeight : this.options.height;
        
        canvas.id = this.options.canvasId;
        canvas.width = this.options.width;
        canvas.height = this.options.height;
        canvas.style.cursor = "pointer";
        canvas.innerHTML = "您的浏览器版本不支持canvas";
        con.appendChild(canvas);
        canvas.onclick = ()=>{
            this.refresh();
        }
    }
    /** 生成验证码* */
    refresh() {
        this.options.code = "";
        var canvas = document.getElementById(this.options.canvasId);
        if(canvas.getContext) {
            var ctx = canvas.getContext('2d');
        }else{
            return;
        }
        
        ctx.textBaseline = "middle";

        ctx.fillStyle = this.randomColor(180, 240);
        ctx.fillRect(0, 0, this.options.width, this.options.height);

        if(this.options.type == "blend") { // 判断验证码类型
            var txtArr = this.options.numArr.concat(this.options.letterArr);
        } else if(this.options.type == "number") {
            var txtArr = this.options.numArr;
        } else {
            var txtArr = this.options.letterArr;
        }

        for(var i = 1; i <= this.options.length; i++) {
            var txt = txtArr[this.randomNum(0, txtArr.length)];
            this.options.code += txt;
            ctx.font = this.randomNum(this.options.height/2, this.options.height) + 'px SimHei'; // 随机生成字体大小
            ctx.fillStyle = this.randomColor(50, 160); // 随机生成字体颜色
            ctx.shadowOffsetX = this.randomNum(-3, 3);
            ctx.shadowOffsetY = this.randomNum(-3, 3);
            ctx.shadowBlur = this.randomNum(-3, 3);
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            var x = this.options.width / (this.options.length+1) * i;
            var y = this.options.height / 2;
            var deg = this.randomNum(-30, 30);
            /** 设置坐标原点 位移 设置字母之间的距离* */
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            /** 恢复旋转角度和坐标原点* */
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        /** 绘制干扰线* */
        for(var i = 0; i < this.options.length; i++) {
            ctx.strokeStyle = this.randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(this.randomNum(0, this.options.width), this.randomNum(0, this.options.height));
            ctx.lineTo(this.randomNum(0, this.options.width), this.randomNum(0, this.options.height));
            ctx.stroke();
        }
        /** 绘制干扰点* */
        for(var i = 0; i < this.options.width/this.options.length; i++) {
            ctx.fillStyle = this.randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(this.randomNum(0, this.options.width), this.randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    /** 验证验证码* */
    validate(code){
        var code = code.toLowerCase();
        var v_code = this.options.code.toLowerCase();
        if(code == v_code){
            return true;
        }else{
            return false;
        }
    }
    getAllLetter() {
        var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        return letterStr.split(",");
    }
    randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    randomColor(min, max) {
        var r = this.randomNum(min, max);
        var g = this.randomNum(min, max);
        var b = this.randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
}
