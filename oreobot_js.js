var O_t = new Image();
var RE = new Image();
var O = new Image();

O_t.src = "./O_t.png";
RE.src = "./RE.png";
O.src = "./O.png";

var O_num = 20;
var max_num = 100;

window.onload = function(){
  document.getElementById("OreoButton").addEventListener("click", generateOreo);
  document.getElementById("OreoNumber").addEventListener("change", max_value_change);
  document.addEventListener("keyup", function(evt){
    if(evt.key == "Enter" || evt.key == " "){
      evt.preventDefault();
      generateOreo();
    }
  });
  window.addEventListener("resize", debounce(dynamicSize, 400));
  dynamicSize();
  generateOreo();
};

function dynamicSize(){
 let vh = window.innerHeight * 0.01;
 document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function generateOreo(){
  let OreoDiv = document.getElementById("OreoImage");
  while (OreoDiv.lastChild) {
    OreoDiv.removeChild(OreoDiv.lastChild);
  }
  let r = Math.floor(Math.random()*O_num + 1);
  let oreo = new Array(r);

  for(let i=0; i < oreo.length; i++){
    let c = Math.floor(Math.random()*2);
    if(c){
      oreo[i] = "RE";
    }else{
      oreo[i] = "O"
    }
  }

  document.getElementById('OreoDescription').innerHTML = oreo.join('');

  drawOreo(oreo);
}

function drawOreo(O_array){

  function first_draw(){
    let tmp_can = document.createElement("canvas");
    tmp_can.width = O_t.width;
    tmp_can.height = O_t.height + O_t.height*((O_array.length - 1)*0.3);
    let tmp_ctx = tmp_can.getContext("2d");
    tmp_ctx.clearRect(0, 0, tmp_can.width, tmp_can.height)
    tmp_ctx.imageSmoothingEnabled = 0;

    for(let i=0; i < O_array.length; i++){
      if(O_array[i] == "O"){
        if(i == O_array.length - 1){
          tmp_ctx.drawImage(O_t, tmp_can.width/2 - O_t.width/2, tmp_can.height - O_t.height - i*O_t.height/4);
        }else{
          tmp_ctx.drawImage(O, tmp_can.width/2 - O.width/2, tmp_can.height - O.height - i*O.height/4);
        }
      }else{
        tmp_ctx.drawImage(RE, tmp_can.width/2 - RE.width/2, tmp_can.height - RE.height - i*RE.height/4);
      }
    }
    return tmp_can;
  }

  function scaling(canvas, n){
    if(n == 0){
      return canvas;
    }else{
      n--;
      let tmp_can = document.createElement("canvas");
      tmp_can.width = canvas.width*0.5;
      tmp_can.height = canvas.height*0.5;
      let tmp_ctx = tmp_can.getContext("2d");
      tmp_ctx.imageSmoothingEnabled = 1;
      tmp_ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, tmp_can.width, tmp_can.height);

      return scaling(tmp_can, n);
    }
  }
  let tmp_can = first_draw();
  let steps = Math.ceil(Math.log(tmp_can.width / ((document.getElementById("OreoImage")).clientWidth)) / Math.log(2));
  tmp_can = scaling(tmp_can, steps);

  document.getElementById("OreoImage").appendChild(tmp_can);
}

function max_value_change(){
  let new_n = document.getElementById("OreoNumber");
  if(!isNaN(new_n.value)){
    if(new_n.value > max_num){
      O_num = max_num;
      new_n.value = max_num;
    }else if(new_n.value <= 0){
      O_num = 1;
      new_n.value = 1;
    }else{
      O_num = new_n.value;
    }
  }
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
