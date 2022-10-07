'use strict';

import {Stack} from '../base/helpers/Stack.js';
import {Sphere} from '../base/shapes/Sphere.js';
import {Cylinder} from '../base/shapes/Cylinder.js';
import {Cabin} from "./Cabin.js";
import {Beams} from "./Beams.js";
import {Wire} from "./Wire.js";

export class UpperPart {
    constructor(app) {
        this.app = app;
        this.stack = new Stack();

        this.cylinder = new Cylinder(app, {red: 0.5, green: 0.5, blue: 0.5, alpha: 1},
            { red: 0.4, green: 0.4, blue: 0.4, alpha: 1});
        this.cylinder.initBuffers();

        this.cylinderUpperRight = new Cylinder(app, {red: 0.5, green: 0.5, blue: 0.9, alpha: 1},
            { red: 0.1, green: 0.5, blue: 0.9, alpha: 1});
        this.cylinderUpperRight.initBuffers();

        this.sphere = new Sphere(app, {red: 0.5, green: 0.5, blue: 0.5, alpha: 1});
        this.sphere.initBuffers();

        this.rightArm = new Beams(app);
        this.rightArm.haveSpheres = false;
        this.rightArm.rotationZ = -90;

        this.rightArmUpper = new Beams(app);
        this.rightArmUpper.haveSpheres = false;
        this.rightArmUpper.rotationZ = -45;

        this.leftArm = new Beams(app);
        this.leftArm.haveSpheres = false;
        this.leftArm.rotationZ = 60;
        this.leftArm.frontBeam = true;

        this.cabin = new Cabin(app);
        this.cabin.initBuffers();

        this.rightWire = new Wire(app);
        this.rightWire.initBuffers();

        this.upperWire = new Wire(app);
        this.upperWire.initBuffers();

        this.leftWire = new Wire(app);
        this.leftWire.initBuffers();

        this.translationX = 0;
        this.rotationY = 0;

        this.upperWireLength = 18;  // 16.5
        this.upperWireAngle = 183; // 178

        this.leftWireX = -12; // -11
        this.leftWireY = -3; // -0.8

        this.cylinderY = -3;
    }

    handleKeys(elapsed) {
        if (this.app.currentlyPressedKeys[89]) {    //Y
            this.translationX = this.translationX + 1 * elapsed;
        }
        if (this.app.currentlyPressedKeys[85]) {    //U
            this.translationX = this.translationX - 1 * elapsed;
        }
        if (this.app.currentlyPressedKeys[82]) {    //r
            this.rotationY = this.rotationY - 30 * elapsed;
        }

        if (this.app.currentlyPressedKeys[73]) {    // i
            this.upperWireLength = (this.upperWireLength > 16.5) ? this.upperWireLength - 5 * elapsed : 16.5;
            this.upperWireAngle = (this.upperWireAngle > 178) ? this.upperWireAngle - 10 * elapsed : 178;

            this.leftWireX = (this.leftWireX < -11) ? this.leftWireX + 0.1  : -11;
            this.leftWireY = (this.leftWireY < -0.8) ? this.leftWireY + 0.4 * elapsed : -0.8;

            this.cylinderY = (this.cylinderY > -3) ? this.cylinderY + 1 * elapsed : -3;
        }

        if (this.app.currentlyPressedKeys[79]) {    // o
            this.upperWireLength = (this.upperWireLength < 18) ? this.upperWireLength + 3 * elapsed : 18;
            this.upperWireAngle = (this.upperWireAngle < 183) ? this.upperWireAngle + 6.5 * elapsed : 183;

            this.leftWireX = (this.leftWireX > -12) ? this.leftWireX - 0.05  : -12;
            this.leftWireY = (this.leftWireY > -1.8) ? this.leftWireY - 0.05 * elapsed : -1.8;
        }
    }

    draw(shaderInfo, elapsed, modelMatrix = new Matrix4()) {
        modelMatrix.setIdentity();
        modelMatrix.translate(this.translationX, 10.7, 0);
        modelMatrix.rotate(this.rotationY, 0, 1, 0);
        this.stack.pushMatrix(modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(2, 0.9, 2);
        this.cylinder.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(2.4, 2.4, 2.4);
        modelMatrix.translate(-0.4, 0.37, 0);
        this.cabin.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(1.5, 1.7, 0.5);
        this.stack.pushMatrix(modelMatrix);
        this.rightArm.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        this.rightArmUpper.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(-3, 0.5, 0);
        this.leftArm.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(1.8, 1.4, 1.8);
        modelMatrix.translate(4, 5, -0.3);
        this.cylinderUpperRight.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(8, 8, 8);
        modelMatrix.translate(0.9, 0, 0);
        modelMatrix.rotate(90, 0, 0, 1);
        this.rightWire.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(6, 7, 0);
        modelMatrix.rotate(this.upperWireAngle, 0, 0, 1);
        modelMatrix.scale(this.upperWireLength, 0, 0);
        this.upperWire.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.translate(this.leftWireX, this.leftWireY, -0.5);
        modelMatrix.rotate(90, 0, 0, 1);
        modelMatrix.scale(8, 0, 0);
        this.leftWire.draw(shaderInfo, elapsed, modelMatrix);

        modelMatrix = this.stack.peekMatrix();
        modelMatrix.scale(1.8,1.4, 1.8);
        modelMatrix.translate(-6.5, this.cylinderY, -0.5);
        this.cylinderUpperRight.draw(shaderInfo, elapsed, modelMatrix);
    }
}


