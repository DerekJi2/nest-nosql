import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {

    /**
     *
     */
    public randomName(maxLen?: number) {
        let name = '';

        maxLen = maxLen ? maxLen : this.random(5, 3);
        for (let i = 0; i < maxLen; i++) {
            const charCode = this.random(90, 65);
            const code = String.fromCharCode(charCode);
            name += code;
        }

        return name;
    }

    /**
     * 
     * @param seed number
     */
    public randomBoolean(seed: number = 1): boolean {
        const value = this.random(seed, 0);
        const result = (value > 0);
        return result;
    }

    /**
     *
     * @param {*} max
     * @param {*} min
     */
    public random(max: number, min: number): number {
        min = min || 0;
        let value = Math.floor(Math.random() * (max + 1));
        while (value < min) {
            value = Math.floor(Math.random() * (max + 1));
        }
        return value;
    }
}
