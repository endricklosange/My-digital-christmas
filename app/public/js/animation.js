window.onload = function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.src = "https://lh3.googleusercontent.com/X-DaUQlvbqonboifbS2eT5pdWMFEAlmZTWH09SS_VRtkbfZ482rlTbMoE7t-OfomK3rP3R7VO_MGvR_FihO_KYQ3qzVZ2MZ573D80BWb54wHGlkQ3OQ4llsWLAugwQuPIHIGVPeRZ3fqGzNMIk5ivig_Nz1Q1q-IdES0BEyfZLvhFALSsoW0Sjf4wfZgtvIpTfdAFkIvGTCB5Y7e7hfmBJzfyrAmgc3xuLYVJt0DMBMIWVmbufH_ZCFPSiX1iWkjSPfeLhew_sKd1606frFDq3X15nHoPY8mXb0CIscfJsOq964y1r0fhQXig3A7tSGVhAcmfeXnX_Nhe0ZAC__jTK8gFr_UJDq4peVdl3VxEO2k582LHyI0E-pmF3F1GaQo0vaSJ3mu12Iqn4LLaDawlrCctWBJEgw-Bp57c-dt46Li9-tTsLGukmllZR7x8RibZbNm_ioHze5sLU0Jst16TVeKQdABeGDR-87i3VHMOc5F9HZqIkcdPbA3ZRDc41xivFv38IaXyKmKufKTE63af_WJyACEq2pmqtzRsJ4Ln62riiX6PXXXXhstbwXjpxSA-j380u65bWfOsQ8B9hkeZ_YpqBpy14Gg3af65wx_ntY6FIQkF1yYYQ1yb2DEa44gp9ENFEVs06O1yag-4ctsifQLqymNsuQpPaI2CUTMjs2hBCvgqzdchRviejm8cw2f-NV71hU0QLvVBt_L4Brhc4XXCvghcHRudoOfk5a8GFePHluP6AsOk_jOwbsOgYttu-e3A8qyb_oJ4fHWwp6KBPhDxEehOPwWchJkK4LCHD68lJzlJi0q-lAeCSGU3sopN1JOjCwgTnoYKBRaZERC9VeH-FPE9g=w815-h149-no?authuser=2";
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
    document.getElementsByTagName("body")[0].style.background = 'linear-gradient(180deg, rgb('+red+', '+green+', '+blue+') 80.14%,rgba(217, 217, 217,0) 100%)'
  }

  setInterval(draw, 33);
};
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})