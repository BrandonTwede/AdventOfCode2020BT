import { AocClient } from 'advent-of-code-client';
import { DayInterface } from './days/DayInterface';

async function loadDay(dayOfMonth: number): Promise<DayInterface> {
    let importedCode = await import(`./days/day_${dayOfMonth}`);
    return new importedCode.default();
}

(async () => {
    try {
        const dayOfMonth = Number(process.argv[2] || new Date().getDate());
        const part = Number(process.argv[3]) || 1;
        const useLocal = process.argv[4] === 'test';
        console.log("Running day", dayOfMonth, "part", part);
        let day = await loadDay(dayOfMonth);
        let client = useLocal ? null : new AocClient({year: 2024, day:dayOfMonth, token:process.env.AOC_TOKEN});

        let result = await day.run(part, await day.getInputReader(client, part, useLocal).read());
        if(result && result != 'NaN' && result != '0' && !useLocal) {
            console.log(`Submitting result for part ${part}: ${result}`);
            console.log("Submit status: ", await client.submit(part, result));
        } else {
            console.log(`Result for part ${part}:`, result);
        }

        
    } catch (e) {
        console.log(e);
    }
    process.exit();
})();