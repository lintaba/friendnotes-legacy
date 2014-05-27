

var config={server:"//lintabapp.herokuapp.com/",version:"0.0.1"};
console.log("loading my app42");
/*
GM_xmlhttpRequest=function(obj) {
	if (obj && obj.url && obj.url.indexOf('facebook.')>0) {
		// If going back to facebook, don't go through the extension
		var request=new XMLHttpRequest();
		request.onreadystatechange=function() { if(request.readyState==4) { obj.onload(request); } }
		request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
		try { request.open(obj.method,obj.url,true); } catch(e) { alert(e); return; }
		if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
		request.send(obj.data); return {};
	}
	else {
		chrome.extension.sendRequest({'command':'ajax','data':obj}, function(o) {
			if (obj.onload && o.request) {
				obj.onload(o.request);
			}
		});
	}
};
function ajax(url,p,cb,r){
	/*
	if(r=new XMLHttpRequest)
		with(r){
			cb&&(onreadystatechange=function(){r.readyState-4||cb(r.responseText,r)});
			open(p?"POST":"GET",url,!0);
			p&&setRequestHeader("Content-type","application/x-www-form-urlencoded")
			send(p?JSON.stringify(p):"");
		}*/
/*
	GM_xmlhttpRequest({
	  method: "GET",
	  url: url,
	  onload: function(response) {
	    cb(response.responseText);
	  }
	});

}
/*
function ajax(url,p,cb,r){
	if(r=new XMLHttpRequest)
		with(r){
			cb&&(onreadystatechange=function(){r.readyState-4||cb(r.responseText,r)});
			open(p?"POST":"GET",url,!0);
			p&&setRequestHeader("Content-type","application/x-www-form-urlencoded")
			send(p?JSON.stringify(p):"");
		}
}/*
function ajax(url,p,cb,s){
	s=document.createElement("script");
	p.jsonp="fn_"+(!ajax.fnp?(ajax.fnp=1):++ajax.fnp);
	window["fn_"+ajax.fnp]=function(data){cb(data)};
	url = url+"?"+Object.keys(p).map(function(k) {return encodeURIComponent(k) + '=' + encodeURIComponent(p[k])}).join('&');
	s.src=url;
	s.type="text/javascript";
	document.querySelector("head").appendChild(s);
}
function ajax(url,p,cb,s){
	s=document.createElement("script");
	p.jsonp="fn_"+(!ajax.fnp?(ajax.fnp=1):++ajax.fnp);
	window["fn_"+ajax.fnp]=function(data){cb(data)};
	url = url+"?"+Object.keys(p).map(function(k) {return encodeURIComponent(k) + '=' + encodeURIComponent(p[k])}).join('&');
	s.src=url;
	s.type="text/javascript";
	document.querySelector("head").appendChild(s);
}
*/
function save(ownid,uid,text,callback){
	console.log("saving:",arguments);
	var req={ownid:ownid,uid:uid,text:text,version:config.version};
	ajax(config.server,req,callback);
}
function load(ownid,uid,callback){
	console.log("loading:",arguments);
	ajax(config.server,{ownid:ownid,uid:uid,version:config.version},function(res){callback&&callback(res.error,res.text);} );
}
function getCookie(cname){
	var name = cname+"=",ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}
if(!window.binded_lintaba){
	document.addEventListener("DOMNodeInserted",function(e){window.domInsertion(e)},false);
	window.binded_lintaba=true;
}
window.domInsertion=function(e){
	if(e&&e.target&&e.target.nodeName!="#text"&&e.target.querySelectorAll("._53ij").length){
		var t,u=e.target.querySelectorAll("input"),uid=0,debounce,ownid=getCookie("c_user");
		for(var t in u)
			if(!u[t].getAttribute || (uid=u[t].getAttribute("data-profileid"))){break;}
		var hld=e.target.querySelector("._53ij");
		if(!uid){
			uid=hld.querySelector("._h5y a")&&hld.querySelector("._h5y a").href.match(/facebook.com\/([a-zA-Z0-9_-]+)\?/)[1];
		}
		if(!uid){return;}
		if(hld.querySelector(".edbx")){
			var a=hld.querySelector(".edbx");
			console.log(a);
			a.parentNode.removeChild(a);
		}
		console.log("dealing with ",uid)
		var el=document.createElement("div");
		el.className="_7lo _572u topborder uiBoxGray edbx";
		el.innerHTML="<iframe width=345 border=0 src='"+config.server+"?uid="+uid+"&ownid="+ownid+"'></iframe>";
		hld.appendChild(el);
		/*el.innerHTML='<textarea style="width: 345px;resize: none;">loading...</textarea>';
		(t=el.querySelector("textarea")).value=uid+" loading...";
		t.setAttribute("disabled",true);
		load(ownid,uid,function(err,val){if(err){alert(err);return;}t.value=val;t.setAttribute("disabled",false);});
		t.addEventListener("change",function(){
			clearTimeout(debounce);
			debounce=setTimeout(save,500,ownid,uid,t.value);
		},false);*/
	}
};

