import { InputReaderDecoratorInterface } from "./InputReaderDecoratorInterface";
import { InputReaderInterface } from "./InputReaderInterface";

export class InputReaderSplit extends InputReaderDecoratorInterface {
    private splitChar;

    constructor(inputReader: InputReaderInterface, splitChar: string) {
        super(inputReader);
        this.splitChar = splitChar;
    }

    public async read(): Promise<any> {
        let input = await super.read();
        if (!Array.isArray(input)) {
            return String(input).split(this.splitChar);
        }
        let result = [];
        for(let x of input) {
            if (!Array.isArray(x)) {
                result.push(String(x).split(this.splitChar).filter(i => i));
                continue;
            }

            let innerResult = [];
            for (let y of x) {
                innerResult.push(String(y).split(this.splitChar).filter(i => i));
            }
            result.push(innerResult);
        }
        return result;
    }
}