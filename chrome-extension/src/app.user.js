var config={server:"//lintabapp.herokuapp.com/",version:"0.0.1"};

if(!window.binded_lintaba){
	document.addEventListener("DOMNodeInserted",function(e){window.domInsertion(e)},false);
	window.binded_lintaba=true;
}
window.domInsertion=function(e){
	if(e&&e.target&&e.target.nodeName!="#text"&&e.target.querySelectorAll("._53ij").length){
		var t,u=e.target.querySelectorAll("input"),uid=0,debounce;
		for(var t in u)
			if(!u[t].getAttribute || (uid=u[t].getAttribute("data-profileid"))){break;}
		var hld=e.target.querySelector("._53ij");
		if(!uid){
			uid=hld.querySelector("._h5y a")&&hld.querySelector("._h5y a").href.match(/facebook.com\/([a-zA-Z0-9_-]+)\?/)[1];
		}
		uid=uid.replace(/[^a-zA-Z0-9_-]/g,"");
		if(!uid){return;}
		if(hld.querySelector(".edbx")){
			var a=hld.querySelector(".edbx");
			a.parentNode.removeChild(a);
		}
		//console.log("dealing with ",uid)
		var el=document.createElement("div");
		el.className="_7lo _572u topborder uiBoxGray edbx";
		el.innerHTML="<iframe width='345' height='100' border='none' src='"+config.server+"comment/"+uid+"'></iframe>";
		hld.appendChild(el);
		el.focus();
	}
};

