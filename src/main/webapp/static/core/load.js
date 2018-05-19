//加载信息
function loading(name, overlay) {
	alert("进入加载信息");
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