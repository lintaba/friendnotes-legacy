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
	}
	$("#commentbox").on("change blur keyup",_.debounce(send,200)).focus();
	$(".reload-after-focus").click(function(){
		$(window).focus(function(){location.reload();})
	})
})
