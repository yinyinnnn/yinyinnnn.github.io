var USERNAME = localStorage.getItem('username');
var TOKEN = localStorage.getItem('token');
//console.log(username, token);

//页面刷新验证登录状态
(function(){
  var oWelcome = document.querySelector('.welcome');
  var oLoginOut = document.querySelector('.login-out');
  var oLogin = document.querySelector('.login');
  var oRegister = document.querySelector('.register');
  var oCart = document.querySelector('.cart');
  
  //验证
  if(TOKEN){
    oWelcome.style.display = 'inline-block';
    oWelcome.innerHTML = '欢迎,' + USERNAME;
    oLoginOut.style.display = 'inline-block';
    oLogin.style.display = 'none';
    oRegister.style.display = 'none';
    oCart.style.display = 'inline-block';    
  }else{
    oWelcome.style.display = 'none';
    oWelcome.innerHTML = '';
    oLoginOut.style.display = 'none';
    oLogin.style.display = 'inline-block';
    oRegister.style.display = 'inline-block';
    oCart.style.display = 'none';
  };
  
  //点击退出按钮
  oLoginOut.onclick = function(){
    //删除本地存储
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    //跳首页
    location.href = 'index.html';
  };
  
})();


//全局的基础路径
var BASE_URL = 'http://106.52.134.23:3000/';

//页面加载就请求分类的数据
//作用域隔开,变量不污染  IIFE
(function(){
  var oNavContainer = document.querySelector('.nav-container');
  
  myAjax.get(BASE_URL + 'api_cat', {}, function(res){
    //console.log(res);
    //验证这个数据
    if(res.code != 0){return};
    //拿到数据就开始渲染
    var resultArr = res.data;
    //console.log(resultArr);
    var str = ``;
    for(var i = 0; i < resultArr.length; i++){
      str += `<li><a href="classify.html?catid=${resultArr[i].cat_id}">${resultArr[i].cat_name}</a></li>`;
    };
    //console.log(str);
    //添加数据结构到页面
    oNavContainer.innerHTML = str;
  });
  
})();

//点击搜索按钮
(function(){
  var oSearchText = document.querySelector('.search-text');
  var oSearchBtn = document.querySelector('.search-btn');
  
  oSearchBtn.onclick = function(){
    //验证不为空
    if(oSearchText.value == ''){
      oSearchText.placeholder = '请输入要搜索的商品';
      return;
    };
    
    //跳转到分类页面，因为搜索商品和分类商品共用一页面;
    console.log(location);
    //设置
    location.href = 'classify.html?keywords=' + oSearchText.value;
  };
  
  
})();
