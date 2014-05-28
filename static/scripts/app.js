
$(function(){
		function ConvertFormToJSON(form){
			var array = jQuery(form).serializeArray();
			var json = {};

			jQuery.each(array, function() {
				json[this.name] = this.value || '';
			});

			return json;
		}


	var send=function(){
		$.ajax({url:"/save",method:"post",data:ConvertFormToJSON($("form"))});
	}
	$("#commentbox").change(_.debounce(send,500));
})
