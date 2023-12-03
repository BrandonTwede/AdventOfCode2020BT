import { InputReaderDecoratorInterface } from "./InputReaderDecoratorInterface";
import { InputReaderInterface } from "./InputReaderInterface";

export class InputReaderTakeFromArray extends InputReaderDecoratorInterface {
    private index;

    constructor(inputReader: InputReaderInterface, index: number) {
        super(inputReader);
        this.index = index;
    }

    public async read(): Promise<any> {
        let input = await super.read();
        if (!Array.isArray(input)) {
            throw Error ("Can't take from array when input is not an array");
        }
        let result = [];
        if (!Array.isArray(input[0])) {
            return input[this.index];
        }
        for(let x of input) {
            result.push(x[this.index]);
        }
        return result;
    }
}