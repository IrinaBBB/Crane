import {BaseShape} from "../base/shapes/BaseShape.js";

export class Wire extends BaseShape {
    constructor(app, color = {red: 0.5, green: 0.5, blue: 0.5, alpha: 1}) {
        super(app);
        this.color = color;
    }

    setPositions() {
        this.positions = [
            0, 0, 0,
            1, 0, 0,
        ];
    }

    setColors() {
        for (let i = 0; i < this.positions.length / 3; i++) {
            this.colors.push(this.color.red, this.color.green, this.color.blue, this.color.alpha);
        }
    }

    handleKeys(elapsed) {
    }

    draw(shaderInfo, elapsed, modelMatrix = (new Matrix4()).setIdentity()) {
        super.draw(shaderInfo, elapsed, modelMatrix);
        if (this.isWireframe) {
            this.gl.drawArrays(this.gl.LINE_STRIP, 0, this.vertexCount);
        } else {
            this.gl.drawArrays(this.gl.LINES, 0, this.vertexCount);
        }
    }
}



