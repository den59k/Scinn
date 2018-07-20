function animate(draw, end, duration) {
			  var start = performance.now();
			  requestAnimationFrame(function animate(time) {
			    var timePassed = time - start;
			    if(timePassed < 0)timePassed=0;
			    if (timePassed > duration){
			    	end(); }
			    else{
			    	draw(timePassed/duration);
			 		requestAnimationFrame(animate);
				}
			  });
			}
		var nowLab = 1;
		const maxLab = 5;
		var sli = false;
		const labNames = ['',
							'',
							'',
							'',
							''];



		function sets(timeFraction){
			//return Math.sin(timeFraction*Math.PI/2);
			return (1-Math.cos(timeFraction*Math.PI))/2;
		}
		var timerId = setTimeout(change, 5000);
		function change(inRight){
			 if (inRight === undefined) {
    			inRight = true;
  			}
			clearTimeout(timerId);
			if(!sli){
			sli = true;
			var base = document.getElementById("imageLabs");
			var baseTwo = document.getElementById("imageLabsTwo");
			var gradient = document.getElementById((inRight?("gradientR"):("gradientL")));
			var label = document.getElementById("nameLab");
			gradient.hidden = false;
			if(inRight){
				nowLab++;
				if(nowLab>maxLab)nowLab=1;
			}else{
				nowLab--;
				if(nowLab<1)nowLab=maxLab;
			}
			baseTwo.src = "Labs/Lab"+nowLab+".jpg";
			baseTwo.parentElement.hidden = false;
			let a = false;
			animate(function(time){
				time = sets(time);
				if(time < 0.5)
					label.style.opacity = 1-time*2;
				else
					label.style.opacity = time*2-1;
				if(time > 0.5 && !a){
					a = true;
					label.innerHTML = labNames[nowLab-1];
				}
				if(inRight){
					baseTwo.style.left = -100+time*100+"%";
					baseTwo.parentElement.style.left = 100-time*100+"%";
					gradient.style.left = 90-time*100+"%";
				}else{
					baseTwo.style.left = 100-time*100+"%";
					baseTwo.parentElement.style.left = -100+time*100+"%";
					gradient.style.left = -10+time*100+"%";
				}
				gradient.style.opacity = (time < 0.8)? ((time < 0.2)?(time*5):1) : (1-(time-0.8)*5);
			}, function(){
				gradient.hidden = true;
				baseTwo.parentElement.hidden = true;
				base.src = "Labs/Lab"+nowLab+".jpg";
				sli = false;
				timerId = setTimeout(change, 5000);
			}, 1500);
			}
		}