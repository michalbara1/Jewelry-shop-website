// using canvas to write the logo
document.addEventListener("DOMContentLoaded", function() {
    const c = document.getElementById('myCanvas');
    const ctx = c.getContext('2d');
  
    ctx.font = "bold 40px Arial";
    ctx.textAlign = 'center';
    ctx.fillStyle = "#964B00";
    ctx.textBaseline = 'middle';
    const text = 'COCO Jewelry';
    ctx.fillText(text, c.width / 2, c.height / 2);
  });
  