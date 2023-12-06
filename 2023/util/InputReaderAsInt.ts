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
                if (!Array.isArray(y)) {
                    innerResult.push(Number(y));
                    continue;
                }
                let inner2Result = [];
                for (let z of y) {
                    inner2Result.push(Number(z));
                }
                innerResult.push(inner2Result);
            }
            result.push(innerResult);
        }
        return result;
    }
}