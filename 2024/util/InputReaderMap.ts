import { InputReaderDecoratorInterface } from "./InputReaderDecoratorInterface";
import { InputReaderInterface } from "./InputReaderInterface";

export interface mapFunc { (val: any, idx: number): any }

export class InputReaderMap extends InputReaderDecoratorInterface {
    private mapFunc;

    constructor(inputReader: InputReaderInterface, mapFunc: mapFunc) {
        super(inputReader);
        this.mapFunc = mapFunc;
    }

    public async read(): Promise<any> {
        let input = await super.read();
        if (!Array.isArray(input)) {
            return this.mapFunc(input);
        }
        let result = [];
        for(let x of input) {
            if (!Array.isArray(x)) {
                return input.map(this.mapFunc);
            }

            let innerResult = [];
            for (let y of x) {
                if (!Array.isArray(y)) {
                    result.push(x.map(this.mapFunc));
                    break;
                }
                innerResult.push(y.map(this.mapFunc));
            }
            if (innerResult.length) {
                result.push(innerResult);
            }
            
        }
        return result;
    }
}