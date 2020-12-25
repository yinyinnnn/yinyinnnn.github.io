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

// 轮播图
(function(){
	 var conUl = document.querySelector('.conUl');
	myAjax.get(BASE_URL + 'api_banner',{bannerId :1},function(res){
		// console.log(res);
		 if(res.code != 0){return};
		    var bannerArr = res.data;
		    console.log(bannerArr);
			var str = ``;
			var oa=``;
			for( var i=0;i<bannerArr.length;i++){
			    str +=`<li class="v1">
				          <a href="product.html?goodsId=${bannerArr[i].goods_id}">
				             <img src="${bannerArr[i].goods_thumb}" />
				          </a>
						</li>`;
			}
		    conUl.innerHTML = str;
	})
})();
// 人气良品
(function(){
	var page = 1;
	var oShopList = document.querySelector('.shopList');
	var oMoreBtn =document.querySelector('.moreBtn');
	 getHotGoods();
	var lock =false;
	
	oMoreBtn.onclick =function(){
		if(lock){return};
		lock=true;
		page++;
		getHotGoods(page);
	};
	
	function getHotGoods(page){
		myAjax.get(BASE_URL + 'api_goods',{page:page,pagesize:6},function(res){
			// console.log(res);
			if(res.code !=0){return};
			var hotArr = res.data;
			// console.log(hotArr);
			// 遍历渲染数据
		    hotGoods(hotArr,oShopList);
			wjLoadSrc('.hot-list');
			lock = false;
			// oMoreBtn.innerHTML = 'MORE';
		})
	};
	// 封装热门商品
	function hotGoods(hotArr,oShopList){
		for(var i=0;i< hotArr.length;i++){
			
			var div1= document.createElement('div');
			div1.className= 'img';
			var a1 = document.createElement('a');
			a1.className='img-hover';
			
			var GoodsImg = document.createElement('img');
			GoodsImg.className='first-img';
			GoodsImg.src =hotArr[i].goods_thumb;
			oShopList.appendChild(div1);
			div1.appendChild(a1);
			a1.appendChild(GoodsImg);
			
			var a2 = document.createElement('a');
			a2.className ='goodsInfo';
			var price =document.createElement('p');
			price.className ='money';
			price.innerHTML = '￥' + hotArr[i].price;
			var name =document.createElement('p');
			name.className ='tle';
			name.innerHTML = hotArr[i].goods_name; 
			var desc =document.createElement('p');
			desc.className ='desc';
			desc.innerHTML = hotArr[i].goods_desc;
			a2.appendChild(price);
			a2.appendChild(name);
			a2.appendChild(desc);
			div1.appendChild(a2);
			
			
			var div2 = document.createElement('div');
			div2.className = 'bar';
		    var a3 = document.createElement('a');
			a3.className = 'who';
			var BrandImg = document.createElement('img');
			BrandImg.className ='who-img';
			BrandImg.src =hotArr[i].brand_thumb;
			var span =document.createElement('span');
			span.className = 'who-span';
			span.innerHTML = hotArr[i].brand_name;
			var a4=document.createElement('a');
			a4.className = 'fav-count';
			a4.innerHTML = hotArr[i].star_number;
			div2.appendChild(a3);
			a3.appendChild(BrandImg);
			a3.appendChild(span);
			div2.appendChild(a4);
			div1.appendChild(div2);
			
			
			
		};
	};
	// var ofavCount =document.querySelector('.fav-count');
	// ofavCount.onclick = function(){
	// 	var favCount =  hotArr[i].star_number;
	// 	favCount ++;
	// }
	// hotArr[i].star_number = favCount;
		
	
})();

//固定二维码 
var oCloseBtn = document.querySelector('.closeBtn');
var oRightSideCode = document.querySelector('.right-side-code');
oCloseBtn.onclick = function(){
	oRightSideCode.remove();
}