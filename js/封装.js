   /*
   * 作者：wj
   * qq:3228798988@qq.com
   * 版本：1.0.1
   * 
   * 
   * 功能介绍：
   * 一、运动方法：
   *  使用: animate(运动对象, 目标JSON, 运动时间ms, [缓冲], [回调函数]);
   * 
   * 二、计算后样式：
   *  使用：fetchComputedStyle(要求的对象, 对象样式的属性);
   * 
   * 三、获取子元素节点:
   *  使用：children(父节点对象, [下标])
   * 
   * 四、获取第一个和最后个子节点:
   *  使用: firstLastChild(父节点对象, 'first | last')
   * 
   * 五、求top的净位置
   *  使用：getAllTop(对象);
   * 
   * 六、求left的净位置
   *  使用：getAllLeft(对象);
   * 
   * 七、封装ajax
   *  使用：myAjax.get(路径, 参数, 回调函数)
   *  使用：myAjax.post(路径, 参数, 回调函数)
   *  使用：myAjax.ajax(方法, 路径, 参数, 回调函数)
   * 
   * 八、表单序列化
   *  使用：queryJsonOrder(JSON);
   * 
   * 九、字符串模板
   *  使用：compile(字符串模板, 数据);
   * 
   * 十、图片预加载
   *  使用：给需要预加载的图片要绑定自定义属性 lazySrc 值为真实图片路径
   *       再调用此方法  wjLoadSrc('图片父级');
   * 
   * 十一、获取地址栏参数的值
   *  使用：调用方法 getUrlVal('参数属性');
   * */
  
  //一、运动方法
  function animate(obj, targetJSON, times, tweenName, callback){
    //验证参数
    if(arguments.length == 3){
      
      if(typeof arguments[0] == 'object' && typeof arguments[1] == 'object' && typeof arguments[2] == 'number'){
        //OK
        //要默认设置缓冲名 linear和回调函数
        tweenName = 'linear';
        
      }else{
        //是要传三个传参数
        throw new Error('必传三个参数：要运动的对象、目标点JSON、时间ms');
      };  
      
    }else if(arguments.length == 4){
      //要么是缓冲名，要么是回调函数
      switch (typeof arguments[3]){
      	case 'string':
      	  var tweenName = arguments[3];
      		break;
      	case 'function':
      	  //先赋值给回调，再设置缓冲！！！ 
          var callback = arguments[3];
      	  var tweenName = 'linear';
      	  break;      	 
      	default:
          throw new Error('第四个参数要么是缓冲名，要么是回调函数');  	   
      		break;
      };
      
    }else if(arguments.length == 5){
      if(typeof arguments[0] != 'object' || typeof arguments[1] != 'object' || typeof arguments[2] != 'number' || typeof arguments[3] != 'string' || typeof arguments[4] != 'function'){
        throw new Error('五个参数为：对象，目标点，时间，缓冲名，函数');
      };
    };
 
    //这里面定义一把锁 上锁
    obj.lock = true;
    
    //定时器  20  用 3000运动到目标点
    var interval = 20;
    
    //把目标点JSON里面的值转为number
    var targetsJSON = {};
    for(var k in targetJSON){
      targetsJSON[k] = parseFloat(targetJSON[k]);
    };
  
    //初始值
    var startJSON = {};
    for(var k in targetsJSON){
      startJSON[k] = fetchComputedStyle(obj, k);
    };
    
    //总帧数
    var maxCount = parseInt(times / interval);
    
    //求一个元素真实运动的距离
    var moveJSON = {};
    for(var k in targetsJSON){
      moveJSON[k] = targetsJSON[k] - startJSON[k];
    };
  
    //开定时器
    var timer;
    //计数器
    var count = 0;
    
    timer = setInterval(function(){
      //累加当前帧
      count++;
          
      //设置
      for(var k in startJSON){
        if(k == 'opacity'){
          obj.style[k] = Tween[tweenName](count, startJSON[k], moveJSON[k], maxCount);
        }else{
          obj.style[k] = Tween[tweenName](count, startJSON[k], moveJSON[k], maxCount) + 'px';
        }
      };
      
      //验证在设置后面
      if(count == maxCount){
        //停表拉终
        clearInterval(timer);       
        //动画停止后做的事情
        //console.log(callback)
        callback && callback.call(obj);     
        //运动完这后放开锁
        obj.lock = false;        
      };
      
    }, interval);
    
    
  };
  
  //二、计算后样式方法
  function fetchComputedStyle(obj, property){
    if(window.getComputedStyle){
      //现代浏览器
      return parseFloat(getComputedStyle(obj)[property]);
    }else{
      //IE低版本678
      return parseFloat(obj.currentStyle[property]);
    }
  }
  
  //三、获取子元素节点方法
  function children(obj, num){
    var arrNode = [];
    for(var i = 0; i < obj.childNodes.length; i++){
      if(obj.childNodes[i].nodeType == 1){
        arrNode.push(obj.childNodes[i]);
      };
    };
    return num ? arrNode[num] : arrNode;
  };
  
  //四、获取第一个子元素节点和最后一个子节点方法
  function firstLastChild(obj, n){
    var arrNode = [];
    for(var i = 0; i < obj.childNodes.length; i++){
      if(obj.childNodes[i].nodeType == 1){
        arrNode.push(obj.childNodes[i]);
      };
    };
    
    switch(n){
      case 'first':
        return arrNode[0];
        break;
      case 'last':
        return arrNode[arrNode.length - 1];
        break;
      default:
        return arrNode;
    }
  };
  
  //五、求top净位置
  function getAllTop(obj){
    //先拿自己的
    var sum = obj.offsetTop;
    //能过遍历去拿父级的父级...
    while(obj = obj.offsetParent){
      sum += obj.offsetTop;
      //累加上边框
      sum += fetchComputedStyle(obj, 'border-top-width');
    };
    return sum;
  };
  
  //六、求Left净位置
  function getAllLeft(obj){
    //先拿自己的
    var sum = obj.offsetLeft;
    //能过遍历去拿父级的父级...
    while(obj = obj.offsetParent){
      sum += obj.offsetLeft;
      //累加上边框
      sum += fetchComputedStyle(obj, 'border-left-width');
    };
    return sum;
  };

  //七、封装ajax
  var myAjax = {
    //get方法
    get : function(url, data, callback){
      //写ajax的模板s
      //第一步
      var xhr = new XMLHttpRequest();
      
      //第二步
      xhr.onreadystatechange = function(){
        //验证ajax过程
        if(xhr.readyState == 4){
          //验证HTTP状态码
          if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            //console.log(xhr.responseText)
            //传递数据
            //做兼容
            if(JSON.parse){
              var obj = JSON.parse(xhr.responseText);
            }else{
              var obj = eval('(' + xhr.responseText + ')');
            }            
            callback(obj);
          };
        };
      };
      
      //先把参数进行序列化
      var queryString = queryJsonOrder(data);
      //解决无参数情况下
      queryString = queryString ? '?' + queryString : '';
      //console.log(queryString)
      //第三步
      xhr.open('get', url  + queryString);
      
      //第四步
      xhr.send();
    },
    
    //post方法
    post : function(url, data, callback){
      //写ajax的模板s
      //第一步
      var xhr = new XMLHttpRequest();
      
      //第二步
      xhr.onreadystatechange = function(){
        //验证ajax过程
        if(xhr.readyState == 4){
          //验证HTTP状态码
          if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            //传递数据
            //做兼容
            if(JSON.parse){
              var obj = JSON.parse(xhr.responseText);
            }else{
              var obj = eval('(' + xhr.responseText + ')');
            }            
            callback(obj);
          };
        };
      };
      
      //先把参数进行序列化
      var queryString = queryJsonOrder(data);
      //console.log(queryString)
      
      //第三步
      xhr.open('post', url);
      //设置请求头
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      //第四步
      xhr.send(queryString);
    },
    
    //综合方法
    ajax : function(method, url, data, callback){
      //第一步
      var xhr = new XMLHttpRequest();
      
      //第二步
      xhr.onreadystatechange = function(){
        //验证ajax过程
        if(xhr.readyState == 4){
          //验证HTTP状态码
          if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            //传递数据
            //做兼容
            if(JSON.parse){
              var obj = JSON.parse(xhr.responseText);
            }else{
              var obj = eval('(' + xhr.responseText + ')');
            }            
            callback(obj);
          };
        };
      };
      
      //先把参数进行序列化
      var queryString = queryJsonOrder(data);
      
      //验证方法
      if(method.toUpperCase() == 'GET'){
        //解决无参数情况下
        queryString = queryString ? '?' + queryString : '';
        //第三步
        xhr.open('GET', url + queryString);
        //第四步
        xhr.send();
      }else if(method.toUpperCase() == 'POST'){
        //第三步
        xhr.open('POST', url);
        //设置请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //第四步
        xhr.send(queryString);
      }else{
        throw new Error('请求方法只能是 GET | POST');
      };      
    }   
  };
  
  //八、封装一个表单序列化格式
  function queryJsonOrder(obj){
    //用数组存储
    var arr = [];
    //进行遍历
    for(var k in obj){
      arr.push(k + '=' + encodeURIComponent(obj[k]));
    }
    //console.log(arr); //数组转字符串  'page=3&pagesize=6'
    //console.log(arr.join('&'));
    return arr.join('&');
  };
  
  //九、模板引擎
  function compile(templateString, data){
    return templateString.replace(/\$\{(\w+)\}/g, function(match, $1, index, oldStr){
      //返回带数据的字符串
      return data[$1];
    });   
  };
  
  //十、图片预加载
  function wjLoadSrc(parent){
    parent = parent ? parent : 'body';
    var aImg = document.querySelectorAll(parent + ' img[lazySrc]');
    for(var i = 0; i < aImg.length; i++){
      var lazySrc = aImg[i].getAttribute('lazySrc');    
      var oImg = new Image();
      oImg.src = lazySrc;
      (function(m){
        oImg.onload = function(){
          aImg[m].src = this.src;
        };  
      })(i);      
    };
  };
  
  //十一、获得地址栏参数值
  function getUrlVal(property){
    var urlStr = window.location.search.substring(1);
    var re = new RegExp('(^|&)'+ property +'=([^&]*)(&|$)');
    var result = urlStr.match(re);
    if(result == null){return null};
    return result[2];
  };
  
  //缓冲方法
var Tween = {
    linear: function(t, b, c, d) {
        return c * t / d + b;
    },
    //二次的
    quadEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    quadEaseOut: function(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    quadEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    //三次的
    qubicEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    qubicEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    qubicEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    //四次的
    quartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    quartEaseOut: function(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    quartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    quartEaseIn: function(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    quartEaseOut: function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    quartEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    //正弦的
    sineEaseIn: function(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    sineEaseOut: function(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    sineEaseInOut: function(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    expoEaseIn: function(t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    expoEaseOut: function(t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    expoEaseInOut: function(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    circEaseIn: function(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    circEaseOut: function(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    circEaseInOut: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    elasticEaseIn: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    elasticEaseOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    elasticEaseInOut: function(t, b, c, d, a, p) {
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    //冲过头系列
    backEaseIn: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    backEaseOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    backEaseInOut: function(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    //弹跳系列
    bounceEaseIn: function(t, b, c, d) {
        return c - Tween.bounceEaseOut(d - t, 0, c, d) + b;
    },
    bounceEaseOut: function(t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    bounceEaseInOut: function(t, b, c, d) {
        if (t < d / 2) return Tween.bounceEaseIn(t * 2, 0, c, d) * .5 + b;
        else return Tween.bounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
}
