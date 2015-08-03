$(function(){
		function ConvertFormToJSON(form){
			var json = {};
			jQuery.each(jQuery(form).serializeArray(), function() {
				json[this.name] = this.value || '';
			});
			return json;
		}
	var send=function(){
		$.ajax({url:"/save",type:"post",data:ConvertFormToJSON($("form"))});
	};
	$("#commentbox").on("change blur keyup",_.debounce(send,200)).focus();
	$("#renamed").on("change blur keyup",_.debounce(send,200));
	$(".reload-after-focus").click(function(){
		$(window).focus(function(){location.reload();});
	});
});



(function(i,s,o,g,r,a,m){i.GoogleAnalyticsObject=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-65903787-1', 'auto');
ga('send', 'pageview');

