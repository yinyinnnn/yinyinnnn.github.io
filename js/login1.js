// 全局的基础路径
var BASE_URL = 'http://106.52.134.23:3000/';

(function(){
	
	var goodsId = getUrlVal('goodsId');
	var oLoginUsername = document.querySelector('.loginInput');
	var oLoginPwd =document.querySelector('.psw-input');
	var oLoginBtn = document.querySelector('.login-btn');
	
	oLoginBtn.onclick = function(){
		var username = oLoginUsername.value;
		var pwd = oLoginPwd.value;
		if(username == ''&&pwd == ''){
			alert('用户名或密码不能为空');
			return;
		};
		
		  myAjax.post(BASE_URL + 'api_user', {
		      status : 'login',
		      username : username,
		      password : pwd,
		    }, function(res){
		      console.log(res);
		      
		      if(res.code == 1007 || res.code == 1008){
		        alert('用户名或密码错误');
		      }else if(res.code == 0){
		        oLoginUsername.value = '';
		        oLoginPwd.value = '';
		        localStorage.setItem('username', res.username);
		        localStorage.setItem('token', res.user_id);
		        if(goodsId){
		          location.href = 'product.html?goodsId=' + goodsId;         
		        }else{
		          location.href = 'index.html';         
		        }
		
		
		      }else{
		        alert('服务器繁忙...');
		      };
		      
		    });
	};
})();
function getUrlVal(property){
  var urlStr = window.location.search.substring(1);
  var re = new RegExp('(^|&)'+ property +'=([^&]*)(&|$)');
  var result = urlStr.match(re);
  if(result == null){return null};
  return result[2];
};