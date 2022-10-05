'use strict';
import {BaseShape} from './BaseShape.js';

export class Cylinder extends BaseShape {
    constructor(app, color1 = {red: 0.6, green: 0.2, blue: 0.6, alpha: 1}, color2 = {red: 0.7, green: 0.3, blue: 0.6, alpha: 1}) {
        super(app);
        this.color1 = color1;
        this.color2 = color2;
        this.numberOfTriangles = 200;
        this.sidesVertexCount = 0;
        this.circleVerexCount = 0;
    }

    setPositions() {
        let lowerCircle = 0;
        let upperCircle = 0;
        let origoX = 0;
        let origoZ = 0;
        let radius = 1;
        let coordY = 0;
        let height = 1;
        const incrementAngle = 2 * Math.PI / this.numberOfTriangles;
        let currentAngle = 0;

        for (let i = 0; i <= this.numberOfTriangles; i++) {
            this.sidesVertexCount += 2;
            const xCoordinate = origoX + Math.cos(currentAngle) * radius;
            const zCoordinate = origoZ + Math.sin(currentAngle) * radius;
            this.positions.push(xCoordinate);
            this.positions.push(coordY);
            this.positions.push(zCoordinate);
            this.positions.push(xCoordinate);
            this.positions.push(coordY + height);
            this.positions.push(zCoordinate);
            currentAngle += incrementAngle;
        }

        for (let i = 0; i <= this.numberOfTriangles; i++) {
            this.circleVerexCount++;
            const xCoordinate = origoX + Math.cos(currentAngle) * radius;
            const zCoordinate = origoZ + Math.sin(currentAngle) * radius;
            lowerCircle++;
            this.positions.push(xCoordinate);
            this.positions.push(coordY);
            this.positions.push(zCoordinate);
            currentAngle += incrementAngle;
        }

        for (let i = 0; i <= this.numberOfTriangles; i++) {
            upperCircle++;
            const xCoordinate = origoX + Math.cos(currentAngle) * radius;
            const zCoordinate = origoZ + Math.sin(currentAngle) * radius;
            this.positions.push(xCoordinate);
            this.positions.push(coordY + height);
            this.positions.push(zCoordinate);
            currentAngle += incrementAngle;
        }
    }

    setColors() {
        for (let i = 0; i < this.sidesVertexCount; i++) {
            this.colors.push(this.color1.red, this.color1.green, this.color1.blue, this.color1.alpha);
        }

        for (let i = 0; i < this.circleVerexCount * 2; i++) {
            this.colors.push(this.color2.red, this.color2.green, this.color2.blue, this.color2.alpha);
        }
    }

    handleKeys(elapsed) {}

    draw(shaderInfo, elapsed, modelMatrix = (new Matrix4()).setIdentity()) {
        super.draw(shaderInfo, elapsed, modelMatrix);
        if (this.isWireframe) {
            this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.sidesVertexCount);
            this.gl.drawArrays(this.gl.LINE_STRIP, this.sidesVertexCount, this.circleVerexCount);
            this.gl.drawArrays(this.gl.LINE_STRIP, this.sidesVertexCount + this.circleVerexCount, this.circleVerexCount);
        } else {
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.sidesVertexCount);
            this.gl.drawArrays(this.gl.TRIANGLE_FAN, this.sidesVertexCount, this.circleVerexCount);
            this.gl.drawArrays(this.gl.TRIANGLE_FAN, this.sidesVertexCount + this.circleVerexCount, this.circleVerexCount);
        }
    }
}
