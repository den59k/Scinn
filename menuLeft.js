function animate(draw, end, duration) {
  var start = performance.now();
  requestAnimationFrame(function animate(time) {
    var timePassed = time - start;
    if (timePassed > duration){
    	timePassed = duration;
    	draw(timePassed/duration);
    	end(); }
    else
    	draw(timePassed/duration);
    if (timePassed < duration)  requestAnimationFrame(animate);
  });
}
var nowP;
var nowB;
var open = false;
function openDrop(op, elem){
	if(op){
	var panel = document.getElementById(op);
	if(nowP != panel){
		open = true;
		panel.hidden = false;
		elem.children[0].src = "../ArrowBack.png";
		elem.style.backgroundColor = "#3768a0";
		if(nowB){
			nowB.style.backgroundColor = "transparent";
			nowB.children[0].src = "../Arrow.png";
		}
		nowB = elem;
		var mas = panel.children;
		panel.style.left = '250px';
		panel.style.opacity = '0';
		if(nowP)
			nowP.style.zIndex = 3;
		panel.style.zIndex = 4;
		animate(function(time){
			time = Math.sqrt(time);
			/*
			for(var i = mas.length-1; i >= 0; i--){
				var t = time+i*0.2;
				if(t > 1)
					t = 1;
				mas[i].style.right = 200-t*200+'px';
			}*/

			if(nowP){
				nowP.style.left = 290-time*50+'px';
				nowP.style.opacity = 1-time;
			}

			panel.style.left = 250+time*40+'px';
			panel.style.opacity = time;
		}, function(){
			open = false;
			if(nowP)
				nowP.hidden = true;
			nowP = panel;
		}, 300);
	}
}else
	alert("Кнопка пока еще не работает!");
}

document.onclick = function a(){
	if(nowP){
		if(open)return;
		nowB.children[0].src = "../Arrow.png";
		nowB.style.backgroundColor = "transparent";
		animate(function(time){
			if(open)return;
			time = Math.sqrt(time);
			nowP.style.left = 290-time*50+'px';
			nowP.style.opacity = 1-time;
		}, function(){
			nowP.hidden = true;
			nowP = null;
			nowB = null;
		}, 150);
	}
}