window.onload = function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.src = "img/sapin.png";
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;
  var red = 254;
  var green = 220;
  var blue = 220;
  var mp = 40;
  var speed = 0.01225;
  var angle = 0;
  var rayon = 100;
  var posx ;
  var posy ;
  var state = true;
  var particles = [];
  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W, 
      y: Math.random() * H, 
      r: Math.random() * 4 + 1, 
      d: Math.random() * mp,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.shadowColor = "grey";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(posx, posy, rayon, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(img, 0, H-140,W,200);
    ctx.beginPath();
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    ctx.closePath();
    update();
  }
  //217   179   143
  var angle = 0;
  function update() {
    W = window.innerWidth;
    H = window.innerHeight;
    posx = W/2+Math.sin(-angle)*500;
    posy = H+Math.cos(-angle)*500;
    angle += speed;
    if(red > 37 && state == true){
      red -= 0.85;
    }else{
      state = false;
    }
    if(green > 41 && state == true){
      green -= 0.69;
    }else{
      state = false;
    }
    if(blue > 77 && state == true){
      blue -= 0.56;
    }else{
      state = false;
    }
    if(red < 254 && state == false){
      red += 0.85;
    }else{
      state = true;
    }
    if(green < 220 && state == false){
      green += 0.69;
    }else{
      state = true;
    }
    if(blue < 220 && state == false){
      blue += 0.56;
    }else{
      state = true;
    }
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;

      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
        } else {
          if (Math.sin(angle) > 0) {
            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
          } else {
            particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
          }
        }
      }
    }
    document.getElementsByTagName("body")[0].style.background = 'linear-gradient(180deg, rgb('+red+', '+green+', '+blue+') 62.14%,rgba(217, 217, 217,0) 100%)'
  }

  setInterval(draw, 33);
};
