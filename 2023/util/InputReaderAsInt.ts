import { InputReaderDecoratorInterface } from './InputReaderDecoratorInterface';

export class InputReaderAsInt extends InputReaderDecoratorInterface {
    public async read(): Promise<any> {
        let input = await super.read();
        let result = [];
        for(let x of input) {
            if (!Array.isArray(x)) {
                result.push(Number(x));
                continue;
            }
            
            let innerResult = [];
            for (let y of x) {
                innerResult.push(Number(y));
            }
            result.push(innerResult);
        }
        return result;
    }
}