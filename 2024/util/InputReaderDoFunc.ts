import { InputReaderDecoratorInterface } from "./InputReaderDecoratorInterface";
import { InputReaderInterface } from "./InputReaderInterface";

export interface Func { (val: any): any }

export class InputReaderDoFunc extends InputReaderDecoratorInterface {
    private func;

    constructor(inputReader: InputReaderInterface, func: Func) {
        super(inputReader);
        this.func = func;
    }

    public async read(): Promise<any> {
        let input = await super.read();
        return this.func(input);
    }
}