$(document).ready(function() {
	$("#userAccount").focus();
	$("#changImg").click(function() {
		var $img = $(this).prev().children()[0];
		$img.src ="/defaultCaptcha?"+Math.random();
	});
	$('#login').click(function(e) {
		submitform();
	});
});

function getVerify(obj) {
	obj.src ="/defaultCaptcha?"+Math.random();
}

//回车登录
$(document).keydown(function(e){
	if(e.keyCode == 13) {
		submitform();
	}
});

function submitform(){
	$("#err").text("");
	if($("#userAccount").val() == ""){
		$("#err").text("请输入用户名！");
		return false;
	}
	if($("#password").val() == ""){
		$("#err").text("请输入密码！");
		return false;
	}
	if($("#valid").val() == ""){
		$("#err").text("请输入验证码！");
		return false;
	}
	if($("#valid").val().trim().length < 4){
		$("#err").text("请输入4位数验证码！");
		return false;
	}
	
	var actionurl = $('form').attr('action');
	var checkurl = $('form').attr('check');
	var userAccount = "userAccount="+$("#userAccount").val();
	var password = "password="+$("#password").val();
	var captcha = "captcha="+$("#valid").val();
	var formData = userAccount+"&"+password+"&"+captcha;
	$.ajax({
		type : 'POST',
		url : checkurl,// 请求的action路径
		data : formData,
		error : function() {// 请求失败处理函数
		},
		success : function(data) {
			console.log(data);
			if (data.status == "success") {
				window.location.href = actionurl;
			}else{
				$("#err").text(data.msg);
				return false;
			}
		}
	});
	//loading('登陆中..', 1);
	/*setTimeout(function () { 
		//unloading();
		
    }, 1000);*/
	return false;
}

//加载信息
function loading(name, overlay) {
	$('section').append('<div id="overlay"></div><div id="preloader">' + name + '</div>');
	if (overlay == 1) {
		$('#overlay').css('opacity', 0.1).fadeIn(function() {
			$('#preloader').fadeIn();
		});
		return false;
	}
	$('#preloader').fadeIn();
}

function unloading() {
	$('#preloader').fadeOut('fast', function() {
		$('#overlay').fadeOut();
	});
}
