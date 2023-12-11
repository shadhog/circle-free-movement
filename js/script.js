
$( document ).ready(function() {
	
	
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = decodeURIComponent(window.location.search.substring(1)),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};
	
	var mkw = getUrlParameter('mkw');
	

	var winDiv = $('#win');
	var container = document.getElementById('container');
	var canvas = document.getElementById('background');
	canvasSize = 600;
	canvas.width = canvasSize;
	canvas.height = canvasSize;
	var c = canvas.getContext('2d');
	
	window.addEventListener('resize', function(event) {
		canvasWidth = container.offsetWidth;
		if(canvasWidth > canvasSize) canvasWidth = canvasSize;
		canvas.width = canvasSize;
		canvas.height = canvasSize;
	});
	
	var centerX = canvas.width / 2,
		centerY = canvas.height / 2,
		run = true,
		score = 0,
		scoreDiv = $('#score'),
		info = true,
		lastHitX,
		lastHitY;
		
	var isUp,
		isLeft,
		isRight,
		isDown,
		isShift,
		lastDirection;
			
	
	
	function Ball() {
		this.width = 10;
		this.height = this.width;
		this.posX = canvasSize / 2 - this.width/2;
		this.posY = canvasSize / 2 - this.height/2;
		this.color = 'yellow';
		this.acc = 0.5;
		this.dec = 0.25;
		this.speedX = 0;
		this.speedY = 0;
		
		this.move = function() {
			this.makeAstep();
			this.draw();
		}
		
		this.makeAstep = function() {

			if(!isLeft && !isRight && this.speedX !== 0) {
				this.speedX = this.speedX > 0 ? this.speedX -= this.dec : this.speedX += this.dec;
				
			}

			if(isLeft) {
				this.speedX -= this.acc;
				//lastDirection = 'left';				
			}

			if(isRight) {
				this.speedX += this.acc;
				//lastDirection = 'right';
			}
			
			
			
			if(!isUp && !isDown && this.speedY !== 0) {
				this.speedY = this.speedY > 0 ? this.speedY -= this.dec : this.speedY += this.dec;
			}

			if(isUp) {
				this.speedY -= this.acc;
				//lastDirection = 'up';				
			}

			if(isDown) {
				this.speedY += this.acc;
				//lastDirection = 'down';
			}

			
				
			if(this.checkBoundaries()) {
				this.posX += this.speedX;
				this.posY += this.speedY;
			}

		}
		
		this.checkBoundaries = function() {
			if(this.posX - this.width + this.speedX < 0) {
				this.posX = this.width;
				this.speedX = 0;
				this.speedY = 0;
				return false;
			}
			if(this.posX + this.width + this.speedX > canvasSize) {
				this.posX = canvasSize - this.width;
				this.speedX = 0;
				this.speedY = 0;
				return false;
			}
			if(this.posY - this.height + this.speedY < 0) {
				this.posY = this.height;
				this.speedX = 0;
				this.speedY = 0;
				return false;
			}
			if(this.posY + this.height + this.speedY > canvasSize) {
				this.posY = canvasSize - this.height;
				this.speedX = 0;
				this.speedY = 0;
				return false;
			}
			return true;
		}
		
		this.draw = function() {
			c.beginPath();
			c.arc(this.posX, this.posY, this.width, 0, 2*Math.PI);
			c.fillStyle = this.color;
			c.fill();
		}	
	}
	
	/*
	
	function Ball() {
		this.posX = canvasSize / 2;
		this.posY = canvasSize / 2;
		this.color = 'blue';
		this.size = 10,
		this.speed = 5;
		this.angle = 60;
		
		this.move = function() {
			this.makeAstep();
			this.draw();
		}
		
		this.makeAstep = function() {
		
			if (this.posX + this.size > canvasSize || this.posX - this.size < 0 ) {
				this.angle = 180 - this.angle;
			} else if (this.posY - this.size < 0) {
				this.angle = 360 - this.angle;
			}
			
			radians = this.angle * Math.PI/ 180;
			this.posX += Math.cos(radians) * this.speed;
			this.posY += Math.sin(radians) * this.speed;
			
		}
		
		
		this.draw = function() {
			c.beginPath();
			c.arc(this.posX, this.posY, this.size, 0, 2*Math.PI);
			c.fillStyle = this.color;
			c.fill();
		}	
	}
	
	
	function Block(x,y,width,height) {
		this.posX = x;
		this.posY = y;
		this.color = 'red';
		this.width = width;
		this.height = height;
		
		this.draw = function() {
			c.beginPath();
			c.rect(this.posX, this.posY, this.width, this.height);
			c.fillStyle = this.color;
			c.fill();
		}
		
	}
	
	function degreesToRadians(degrees) { return (degrees * Math.PI) / 180; }
	function sinDegrees(angle) {return Math.sin(angle/180*Math.PI);}
	function cosDegrees(angle) {return Math.cos(angle/180*Math.PI);}
	
	*/
	
	
	
	
	
	
	
	

	
	if( typeof mkw !== 'undefined') win = mkw;
	console.log('>> MKW: ' + win);
	/*
	var blocks = [];
	createLevel();
	var board = new Pong();
	*/
	var ball = new Ball();
	initilaize();
	/*
	function createLevel() {
		var numberOfBlocks = 35;
		var blockWidth = 70;
		var blockHeight = 25;
		var blockSpaces = 13;
		var x = blockSpaces;
		var row = 0;
		for(var i=0 ; i < numberOfBlocks ; i++) {
			if(x+blockWidth > canvasSize) {row += blockHeight + blockSpaces; x = blockSpaces;}
			blocks.push(new Block(x ,blockSpaces + row,blockWidth,blockHeight));
			x += blockSpaces + blockWidth;
		}
	}
	*/
	function initilaize() {
		c.lineWidth=0.3;
		clearBoard();
		drawFrame();
		//drawInfo();
		loop();
	}
	
	function clearBoard() {
		c.beginPath();
		c.rect(0, 0, canvas.width, canvas.height); 
		c.fillStyle = 'rgba(0,0,0,0.4)';
		//c.fillStyle = 'rgba(0,0,0)';
		c.strokeStyle = '#ffffff';
		c.fill();
		c.stroke();
	}

	function drawInfo() {
		c.beginPath();
		c.font = '16px Arial';
		c.fillStyle = 'white';
		c.textAlign = 'center';
		c.fillText('BALL',ball.posX, ball.posY - ball.size - 10);
		c.fillText('<< MOVE >>',board.posX + board.width/2, board.posY - board.height);
		var last = blocks.length - 1;
		c.fillText('^ BREAK US ^',canvasSize/2, blocks[last].posY + blocks[last].height * 2);
	}
	
	function drawFrame() {
		//board.move();
		ball.move();
		//for(var i=0 ; i < blocks.length ; i++) blocks[i].draw();
	}
	
	function loop() {
		if(run) requestAnimationFrame(loop);
		
		//if(!info) {
			clearBoard();
			
			//checkPing();
			drawFrame();
			
			//checkGotPoint();
			//checkFailed();
		//}
		
	}
		
		
	function checkFailed() {
		if(ball.posY + ball.size > canvasSize) {
			gameOver();
		}
	}
		
	function checkPing() {
		if(circleRect(ball, board)) {
			var angleShift = CalcPrecent(ball.posX, board.posX, board.posX + board.width) / 5;
			ball.angle = 360 - ball.angle + angleShift;
		}
	}
	/*function precent(ball,board) {
		return (ball.posX * 100) / board.width;
	}*/
	
	/*function CalcPrecent(input, min, max) {
		var range = max - min;
		var i = input - min;
		return ( (i * 100) / range );
	}*/
	
	function checkGotPoint() {
		for(var i=0 ; i < blocks.length ; i++) {
			if(circleRect(ball, blocks[i])) {
				if(lastHitX > lastHitY) ball.angle = 180 - ball.angle; 
				else ball.angle = 360 - ball.angle; 
				scoreDiv.text(++score);
				removeBlock(i);
				return true;
			}
		}
		return false;
	}
		
	function removeBlock(index) {
		if (index > -1) {
			blocks.splice(index, 1);
		}
	}

	function gameOver() {
		run = false;
		console.error('Game Over');
	}
	
	function drawGotPoint(x, reyct) {
			c.beginPath();
			c.font = '16px Arial';
			c.textAlign = 'center';
			c.fillStyle = 'white';
			c.fillText('+1',this.posX, this.posY - this.width - 10);
			c.fillStyle = this.color;
			c.fill();
	}

	function circleRect(circle, rect) {
		
		var cx = circle.posX,
			cy = circle.posY,
			radius = circle.size,
			rx = rect.posX,
			ry = rect.posY,
			rw = rect.width,
			rh = rect.height;

		var testX = cx;
		var testY = cy;

		// which edge is closest?
		if (cx < rx)         testX = rx;      // test left edge
		else if (cx > rx+rw) testX = rx+rw;   // right edge
		if (cy < ry)         testY = ry;      // top edge
		else if (cy > ry+rh) testY = ry+rh;   // bottom edge

		// get distance from closest edges
		var distX = cx-testX;
		var distY = cy-testY;
		var distance = Math.sqrt( (distX*distX) + (distY*distY) );
		lastHitX = distX;
		lastHitY = distY;
		// if the distance is less than the radius, collision!
		if (distance <= radius) {
		return true;
		}
		return false;
	}
	
	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("keyup", onKeyUp);
	
	function onKeyDown(evt) {
		info = false;
		var key = evt.keyCode;
		switch (key) {
			case 38:
				isUp = true;
				break;
			case 37:
				isLeft = true;
				break;
			case 40:
				isDown = true;
				break;
			case 39:
				isRight = true;
				break;
			case 16:
				isShift = true;
				break;
		}
	}

	function onKeyUp(evt) {
		var key = evt.keyCode;
		switch (key) {
			case 38:
				isUp = false;
				break;
			case 37:
				isLeft = false;
				break;
			case 40:
				isDown = false;
				break;
			case 39:
				isRight = false;
				break;
			case 16:
				isShift = false;
				break;
		}
	}
	
	

	

});

