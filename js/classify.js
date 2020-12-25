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
									<a href="">${resultArr[i].cat_name}</a>
								</div>
						</div>
					</dt>
				</dl>`;
	   };
	   oStoreLeft.innerHTML = str;
	});

})();
	
	(function(){
	  //页面刷新拿地址栏参数值
	  var catId = getUrlVal('catid');
	  var keyWords = decodeURIComponent(getUrlVal('keywords'));
	  var api = '';
	  console.log(catId, keyWords)
	  //验证是分类商品还是搜索商品
	  if(catId){
	    api = 'api_goods';
	  }else if(keyWords){
	    api = 'api_search';
	  };
	   var oHotList = document.querySelector('.shopList');
	    
	    //定义页
	    var page = 1;
	    //页面刷新先调用一次
	    getClassifyGoods(page);
	    
	    //封装分类请求
	    function getClassifyGoods(page){
	      //请求分类商品  
	      myAjax.get(BASE_URL + api, {
	        catId : catId, 
	        keywords : keyWords,
	        page : page,
	        pagesize : 6
	      }, function(res){
	        // console.log(keyWords);
	        console.log(res);
	        if(res.code != 0){return};
	        var catArr = res.data;
	        //验证当前分类下面有没有商品
	        if(catArr.length == 0){
	          oHotList.innerHTML = '正在上新中...'
	          return;
	        };
	        
	        //有商品并且为page
	        if(res.page){
	          var maxPage = res.page;        
	        }else{
	          var maxPage = Math.ceil(res.count/3);
	        };
	  
	        //调用分页器
	        getPagination(maxPage);
	        
	        //调用数据渲染
	        renderData(catArr);
	      });
	    };
	    
	    //加数据渲染
	    function renderData(catArr){
	      var str = ``;
	      for(var i = 0; i < catArr.length; i++){
				 str += `
				 <div class="img first">
				 	<a href="#">
				 		<img class="first-img" src="${catArr[i].goods_thumb}" >
				 	</a>
				 	<a href="#" class="goodsInfo">
				 		<p class="money">${catArr[i].price}</p>
				 		<p class="tle">${catArr[i].goods_name}</p>
				 		<p class="desc">${catArr[i].goods_desc}</p>
				 	</a>
				 	<div class="bar">
				 		<a href="#"class="who">
				 			<img src="${catArr[i].brand_thumb}" >
				 			<span>${catArr[i].brand_name}</span>
				 		</a>
				 		<a href="#" class="fav-count">catArr[i].star_number</a>
				 	</div>
				 </div>`;
	      };
	      //覆盖添加到页面
	      oHotList.innerHTML = str;
	    };
	    
	    //分页交互
	    function getPagination(maxPage){
	      $('.pagination-container').pagination({
	        pageCount : maxPage,
	        current : 1,
	        prevContent : '上一页',
	        nextContent : '下一页',
	        mode : 'fixed',
	        count : 5,
	        coping : true,
	        homePage : '首页',
	        endPage : '末页',
	        isHide : true,
	        keepShowPN : false,
	        jump : true,
	        callback : function(obj){
	          //拿到当前点击的页码
	          page = obj.getCurrent();
	          //再去发起请求
	          // myAjax.get(BASE_URL + api, {
	          //   catId : catId,
	          //   keywords : keyWords,
	          //   page : page,
	          //   pagesize : 3
	          // }, function(res){
	          //   console.log(res);
			    	console.log(page);
			    myAjax.get(BASE_URL + api, { 
			        catId:catId,
			    	keywords:keywords,
			    	page:page,
			        pagesize:6
			      }, function(res){
			                        console.log(res)
	            if(res.code != 0){return};
	            var catArr = res.data;
	            //验证当前分类下面有没有商品
	            if(catArr.length == 0){
	              oHotList.innerHTML = '正在上新中...'
	              return;
	            };
	            
	            //调用渲染数据
	            renderData(catArr);         
	          });
	        },
	      });
	    };
    })();