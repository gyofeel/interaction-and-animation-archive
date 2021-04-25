import {
    Wave
} from './wave.js';

export class WaveGroup {
    constructor() {
        this.totalWaves = 3;
        this.totalPoints = 6;
        this.color = ['rgba(30, 150, 200, 0.4)', 'rgba(200, 150, 30, 0.4)', 'rgba(200, 30, 150, 0.4)'];
    
        this.waves = [];
    
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(
                i,
                this.totalPoints,
                this.color[i]
            );
            this.waves[i] = wave;
        }
    }

    resize(stageWidth, stageHeight) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.draw(ctx);
        }
    }

}