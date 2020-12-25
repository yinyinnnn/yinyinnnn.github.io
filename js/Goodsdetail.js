



var BASE_URL='http://106.52.134.23:3000/';

// 分类
(function(){
	
  myAjax.get(BASE_URL + 'api_cat',{},function(res){
	   // console.log(res);
	   // 验证数据
	   if(res.code !=0){return};
	   var resultArr =res.data;
	   var oStoreLeft = document.querySelector('.storeLeft');
	   // console.log(resultArr);
	   var str = ``;
	   for(var i =0;i<resultArr.length;i++){
		  str+=`<dl>
					<dt>
						<div class="cat_img">
								<img src="img/img${i+1}.png"" >
								<div class="cat_name">
									<a href="classify.html">${resultArr[i].cat_name}</a>
								</div>
						</div>
					</dt>
				</dl>`;
	   };
	   oStoreLeft.innerHTML = str;
	});
})();





























//固定二维码 
var oCloseBtn = document.querySelector('.closeBtn');
var oRightSideCode = document.querySelector('.right-side-code');
oCloseBtn.onclick = function(){
	oRightSideCode.remove();
}