import { InputReaderInterface } from "./InputReaderInterface";

export class InputReaderDecoratorInterface implements InputReaderInterface {
    protected inputReader: InputReaderInterface;

    constructor(inputReader: InputReaderInterface) {
        this.inputReader = inputReader;
    }

    public async read(): Promise<any> {
        return await this.inputReader.read();
    }
}