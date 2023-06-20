
//logo for the site
const c = document.getElementById('myCanvas');
const ctx = c.getContext('2d');
var img = document.getElementById("logoImage");
ctx.drawImage(img, 10, 10);
ctx.font = "bold 40px Arial";
ctx.textAllign='center';
ctx.fillStyle= "#964B00";
ctx.textBaeline='middle';
const text='COCO Jewlery';
ctx.fillText(text, c.width/2, c.height/2);

