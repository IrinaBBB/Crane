import {WebGLShader} from './helpers/WebGLShader.js';
import {WebGLCanvas} from './helpers/WebGLCanvas.js';
import {Camera} from './helpers/Camera.js';
import {Coord} from './shapes/Coord.js';


export class BaseApp {
    constructor(drawCoord = true) {

        this.canvas = new WebGLCanvas('myCanvas', document.body, window.innerWidth, window.innerHeight);
        this.gl = this.canvas.gl;
        this.drawCoord = drawCoord;

        this.initBaseShaders();
        this.initKeyPress();

        this.fpsData = {
            frameCount: 0,
            lastTimeStamp: 0
        };
        this.lastTime = 0;

        this.currentlyPressedKeys = [];

        this.camera = new Camera(this.gl, this.currentlyPressedKeys);
        this.camera.set();

        if (this.drawCoord) {
            this.coord = new Coord(this);
            this.coord.initBuffers();
        }
    }

    initBaseShaders() {
        const vertexShaderSourceBase = `
			attribute vec4 aVertexPosition;
		    attribute vec4 aVertexColor;
		    uniform mat4 uModelViewMatrix;
		    uniform mat4 uProjectionMatrix;
		    varying lowp vec4 vColor;
		    void main(void) {
		        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		        vColor = aVertexColor;
		        gl_PointSize = 10.0;    
		    }
			`;
        const fragmentShaderSourceBase = `
			varying lowp vec4 vColor;
		    void main(void) {
		        gl_FragColor = vColor;
		    }
		`;
        const glslBaseShader = new WebGLShader(this.gl, vertexShaderSourceBase, fragmentShaderSourceBase);
        this.baseShaderInfo = {
            program: glslBaseShader.shaderProgram,
            attribLocations: {
                vertexPosition: this.gl.getAttribLocation(glslBaseShader.shaderProgram, 'aVertexPosition'),
                vertexColor: this.gl.getAttribLocation(glslBaseShader.shaderProgram, 'aVertexColor'),
            },
            uniformLocations: {
                projectionMatrix: this.gl.getUniformLocation(glslBaseShader.shaderProgram, 'uProjectionMatrix'),
                modelViewMatrix: this.gl.getUniformLocation(glslBaseShader.shaderProgram, 'uModelViewMatrix'),
            },
        };
    }

    handleKeyUp(event) {
        this.currentlyPressedKeys[event.which] = false;
    }

    handleKeyDown(event) {
        this.currentlyPressedKeys[event.which] = true;
    }


    initKeyPress() {
        document.addEventListener('keyup', this.handleKeyUp.bind(this), false);
        document.addEventListener('keydown', this.handleKeyDown.bind(this), false);
    }

    clearCanvas() {
        this.gl.clearColor(0.9, 0.9, 0.9, 1);  // Clear screen color
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);           // Enable "depth testing".
        this.gl.depthFunc(this.gl.LEQUAL);            // Nære objekter dekker fjerne objekter.
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    handleKeys(elapsed) {
        this.camera.handleKeys(elapsed);
    }

    draw(elapsed) {
        if (this.drawCoord)
            this.coord.draw(this.baseShaderInfo, elapsed);
    }

    animate(currentTime) {
        window.requestAnimationFrame(this.animate.bind(this)); //Merk bind()
        let elapsed = this.calculateFps(currentTime);
        this.clearCanvas();
        this.handleKeys(elapsed);
        this.draw(elapsed);
        this.fpsData.frameCount++;
    }

    calculateFps(currentTime) {
        if (currentTime === undefined)
            currentTime = 0;

        if (currentTime - this.fpsData.lastTimeStamp >= 1000) {
            document.getElementById('fps').innerHTML = this.fpsData.frameCount;
            this.fpsData.frameCount = 0;
            this.fpsData.lastTimeStamp = currentTime;
        }

        let elapsed = 0.0;
        if (this.lastTime !== 0.0)
            elapsed = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        return elapsed;
    }
}
