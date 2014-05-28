
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
	$("#commentbox").change(_.debounce(send,500));
})
