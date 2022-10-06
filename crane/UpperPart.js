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

        this.cabin = new Cabin(app);
        this.cabin.initBuffers();

        this.rightWire = new Wire(app);
        this.rightWire.initBuffers();

        this.translationX = 0;
        this.rotationY = 0;
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
        //
        // modelMatrix = this.stack.peekMatrix();
        // modelMatrix.scale(1.5, 1.4, 1.5);
        // this.rightWire.draw(shaderInfo, elapsed, modelMatrix);
    }
}


