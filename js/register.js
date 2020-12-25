var BASE_URL='http://106.52.134.23:3000/';

 (function(){
	var oTelInput =document.querySelector('.telInput');
	var oMemo1 = document.querySelector('.memo1');
	var oCodeInput = document.querySelector('.codeInput');
	var oRandon = document.querySelector('.random');
	var oAgain = document.querySelector('.again');
	var oMemo2 = document.querySelector('.memo2');
	var oSetInput = document.querySelector('.setInput');
	var oMemo3 = document.querySelector('.memo3');
	var oMemo4 = document.querySelector('.memo4');
	var oSetLabel = document.querySelector('.setLabel');
	var oContent=document.querySelector('.content');
	var oConfirmInput =document.querySelector('.confirmInput');
	var oRegBtn=document.querySelector('.regbtn');
	var oSetSpan1 = document.querySelector('.setSpan1');
	var oSetSpan2 = document.querySelector('.setSpan2');
	
	// 随机验证码
	randomCoding(4);
	oAgain.onclick=function(){
	   randomCoding(4);
	}
	// 手机号
	oTelInput.onblur =function(){
		var TelVal= oTelInput.value;
		if(TelVal == ''){
			oMemo1.innerHTML = '手机号不能为空';
			oMemo1.style.color = 'red';
		}
		var telreg= /^[0-9]{11}$/g;
		if(!telreg.test(TelVal)){
			oMemo1.innerHTML ='手机号错误';
		    oMemo1.style.color = 'red';
		}
		
		myAjax.post(BASE_URL + 'api_user',{
			status:'check',
			username:TelVal,
		}, function(res){
			if(res.code!=0){
				oMemo1.innerHTML ='手机号错误';
				oMemo1.style.color = 'red';
			}else{
				oMemo1.innerHTML ='手机号正确';
				oMemo1.style.color = 'green';
			}	
		})	
	}
	
	oCodeInput.onblur =function(){
		if(oCodeInput.value!=oRandon.innerHTML){
		    oMemo2.innerHTML='验证码错误';
		    oMemo2.style.color='red';
		    randomCoding(4);
		}else{
		    oMemo2.innerHTML='验证码正确';
		    oMemo2.style.color='green';
		}
		
	} 
	
	oSetInput.onfocus=function(){
	        oMemo3.style.display='block';
	    }
	
	oSetInput.onblur=function(){
	        oMemo3.style.display='none';
	    }
    oSetInput.onkeyup=function(){
		var SetInputVal=oSetInput.value;
            if(SetInputVal.length<6||SetInputVal.length>20){
				oSetSpan1.style.color='red';
            }else{
		        oSetSpan1.style.color='green';
		    };
	    var re1=/\s|[\u4e00-\u9fa5]/g;
	           if(re1.test(SetInputVal)){
	               oSetSpan2.style.color = 'red';
	           }else{
	               oSetSpan2.style.color = 'green';
	           };	
		var re2=/^[0-9]{6}$/g;	
		var re3=/^[0-9]{9}$/g;
		var re4=/^[0-9]{11}$/g;
		if(re2.test(SetInputVal)){
			oContent.className='content ' + 'low';
		}else if(re3.test(SetInputVal)){
			oContent.className='content ' + 'mid';
		}else if(re4.test(SetInputVal)){
			oContent.className='content ' + 'high';
		}
	};
	oConfirmInput.onblur=function(){
	        if(oConfirmInput.value!=oSetInput.value){
	            oMemo4.innerHTML='密码不一致';
	            oMemo4.style.color='red';
	        }else{
	            oMemo4.innerHTML='密码正确';
	            oMemo4.style.color='green';
	        }
	    }
		
	oRegBtn.onclick =function(){
		var TelVal= oTelInput.value;
		var SetInputVal = oSetInput.value;
		if(oTelInput.value=='' || oCodeInput.value==''|| oSetInput.value==''||oConfirmInput.value==''){
		    alert('手机号、验证码、密码不能为空');
		}
		myAjax.post(BASE_URL+'api_user',{
			   status:'register',
			   username:TelVal,
			   password:SetInputVal,
			
		},function(res){
			console.log(res);
			if(res.code !=0){return};
			oTelInput.value= '';
			oCodeInput.value=='';
			oSetInput.value=='';
			oConfirmInput.value=='';
			alert('注册成功，请登录')
			location.href = 'login1.html'; 
		});
 
		
	}
	
	
 })();	
	
	
	
	

 function randomCoding(code){
    var oRandon=document.querySelector('.random');
    var arr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',0,1,2,3,4,5,6,
    7,8,9];
    var n =code;
    var idvalue='';
    for(var i=0;i<code;i++){
        idvalue+=arr[Math.floor(Math.random()*62)];
    }
	console.log(idvalue);
    oRandon.innerHTML=idvalue;
 }