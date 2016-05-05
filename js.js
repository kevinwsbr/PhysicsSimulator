        function animate() {
            update();
            draw();
            setTimeout(animate, 33);

            reqAnimFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

            reqAnimFrame(animate);
        }
     
        function update() {
        }