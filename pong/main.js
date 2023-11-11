// https://www.youtube.com/watch?v=fhd7FfGCdCo

// setup
var canvas;
var ctx;
var ballCoords;
var ballDirections;
var bat1Coords;
var bat2Coords;
var ballInPlay = 1;
var intervalId = null;

var score = {
	a: 0,
	b: 0
};

var showDebug = false;
var ballMoving = true;
var ballSpeed;

var paused = false;

let keys = {};

const BALL_SIZE = 20;
const INITIAL_BALL_SPEED = 4;
const BAT_WIDTH = 15;
const BAT_HEIGHT = 100;
const BAT_SPEED = 14;

// resources
var soundBounce = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

window.onresize = event => {
	setup();
};


document.onkeydown = e => {
  if (!keys[e.key]) {
    keys[e.key] = true;
  }
};

document.onkeyup = e => (keys[e.key] = false);

function readKeys() {
    if (keys["w"]) {
        if (bat1Coords.y > BAT_SPEED) {
            bat1Coords.y -= BAT_SPEED;
        } else {
            bat1Coords.y = 0;
        }
    }
    if (keys["s"]) {
        if (bat1Coords.y < canvas.height - BAT_HEIGHT) {
            bat1Coords.y += BAT_SPEED;
        } else {
            bat1Coords.y = canvas.height - BAT_HEIGHT;
        }
    }
    if (keys["ArrowUp"]) {
        if (bat2Coords.y > BAT_SPEED) {
            bat2Coords.y -= BAT_SPEED;
        } else {
            bat2Coords.y = 0;
        }
    }
    if (keys["ArrowDown"]) {
        if (bat2Coords.y < canvas.height - BAT_HEIGHT) {
            bat2Coords.y += BAT_SPEED;
        } else {
            bat2Coords.y = canvas.height - BAT_HEIGHT;
        }
    }
    if (keys["p"]) {
    	if (!paused) {
    		paused = true;
	    	drawInfoText("Paused");
	    } else {
	    	paused = false;
	    }
    }
    if (keys["d"]) {
    	showDebug = !showDebug;
    }
    if (keys["b"]) {
    	ballMoving = !ballMoving;
    }
    if (keys["n"]) {
    	ballSpeed++;
    }
    if (keys["m"]) {
    	if (ballSpeed > 0) {
    		ballSpeed--;
    	}
    }

    clearKeys(["p", "d", "b", "n", "m"]);

};

function clearKeys(keysToClear) {
	keysToClear.forEach(k => keys[k] = false)
}


function setup() {
	canvas = document.getElementById("canvas");
	canvas.style.width ='100%';
	canvas.style.height='100%';
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight - 20;
	ctx = canvas.getContext("2d");
	
	bat1Coords = {
		x: (canvas.width * 0.15 | 0) - BAT_WIDTH,
		y: canvas.height * 0.5 | 0
	};

	bat2Coords = {
		x: canvas.width * 0.85 | 0,
		y: canvas.height * 0.5 | 0
	};

	resetBall();
}


function doIt() {
	readKeys();

	if (!paused) {
	    draw();

	    if (showDebug) {
		    drawStatusText(`Ball (x: ${ballCoords.x}, y: ${ballCoords.y}) | Bat1 (x: ${bat1Coords.x}, Bat2 (x: ${bat2Coords.x}) | Canvas: ${canvas.width}x${canvas.height} | ballSpeed: ${ballSpeed} | ballInPlay: ${ballInPlay}`)
	    }

	    if (ballCoords.x + BALL_SIZE >= canvas.width) {
	    	score.a++;
	    	resetBall();
	    }
	    if (ballCoords.x < 0) {
	    	score.b++;
	    	resetBall();
	    }

	    if (ballCoords.y + BALL_SIZE >= canvas.height) {
	        ballDirections.y = -1;
	        bounceSound();
	    }

	    if (ballCoords.y <= 4) {
	        ballDirections.y = 1;
	        bounceSound();
	    }

	    if (ballMoving) {
		    ballCoords.x = ballCoords.x + (ballSpeed * ballDirections.x);
		    ballCoords.y = ballCoords.y + (ballSpeed * ballDirections.y);
		}

	    if (ballCoords.x <= bat1Coords.x + BAT_WIDTH && ballCoords.x >= bat1Coords.x && ballCoords.y >= bat1Coords.y && ballCoords.y <= bat1Coords.y + BAT_HEIGHT) {
	        ballDirections.x = -ballDirections.x;
	        ballInPlay++;
	    	if (ballInPlay % 10 == 0) {
	    		ballSpeed++;
	    	}
	        bounceSound();
	    }

	    if (ballCoords.x + BALL_SIZE >= bat2Coords.x && ballCoords.x + BALL_SIZE <= bat2Coords.x + BAT_WIDTH && ballCoords.y >= bat2Coords.y && ballCoords.y <= bat2Coords.y + BAT_HEIGHT) {
	        ballDirections.x = -ballDirections.x;
	        ballInPlay++;
	    	if (ballInPlay % 10 == 0) {
	    		ballSpeed++;
	    	}
	        bounceSound();
	    }

	}
	window.requestAnimationFrame(doIt);
}

function start() {
	setup();
	window.requestAnimationFrame(doIt);
}

function drawStatusText(status) {
	ctx.beginPath();
	ctx.font = "12px Courier New";
	ctx.fillStyle = "white";
	ctx.fillText(status, (canvas.width - (status.length * 6)) / 2, canvas.height - 20);
	ctx.closePath();
}

function drawInfoText(info) {
	ctx.beginPath();
	ctx.font = "64px Courier New";
	ctx.fillStyle = "lightgreen";
	ctx.strokeStyle = "lightgreen";
	ctx.lineWidth = 5;
	ctx.setLineDash([]);
	ctx.clearRect((canvas.width - (info.length * 40)) * 0.5 - 5, canvas.height * 0.5 - 100, info.length * 40 + 5, 170);
	ctx.rect((canvas.width - (info.length * 40)) * 0.5 - 5, canvas.height * 0.5 - 100, info.length * 40 + 5, 170);
	ctx.stroke();
	ctx.fillText(info, (canvas.width - (info.length * 40)) * 0.5, canvas.height * 0.5);
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.strokeStyle = "lightgreen";
	ctx.fillStyle = "lightgreen";

    ctx.lineWidth = 5;
	ctx.setLineDash([15, 15]);

	// mid line
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.stroke();

	// ball
	ctx.fillRect(ballCoords.x, ballCoords.y, BALL_SIZE, BALL_SIZE);

	// bat 1
	ctx.fillRect(bat1Coords.x, bat1Coords.y, BAT_WIDTH, BAT_HEIGHT);

	// bat 2
	ctx.fillRect(bat2Coords.x, bat2Coords.y, BAT_WIDTH, BAT_HEIGHT);

    // score
	ctx.font = "64px Courier New";
	ctx.fillText(score.a, (canvas.width - (score.a.toString().length * 10)) * 0.25, 60);
	ctx.fillText(score.b, (canvas.width - (score.b.toString().length * 10)) * 0.75, 60);
}

function resetBall() {
	ballCoords = {
		x: canvas.width / 2 | 0,
		y: canvas.height / 2 | 0
	};
	ballDirections = {
		x: Math.random() < 0.5 ? 1 : -1,
		y: Math.random() < 0.5 ? 1 : -1
	};
	ballInPlay = 1;
	ballSpeed = INITIAL_BALL_SPEED;
}

function bounceSound() {
    soundBounce.play();
}