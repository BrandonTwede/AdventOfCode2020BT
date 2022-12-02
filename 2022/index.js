import { AocClient } from 'advent-of-code-client';

import fs from 'fs';
var path = process.cwd();

(async () => {
    try {
        const day = new Date();
        const dayOfMonth = process.argv[3] || day.getDate();
        const part = Number(process.argv[2]) || 1;
        const useLocal = process.argv[4];

        const client = new AocClient({
          year: 2022, // the year of the challenge
          day: dayOfMonth, // the day of the challenge
          token: process.env.AOC_TOKEN // the session cookie from adventofcode.com
        });

        let code = await import(`./day_${dayOfMonth}.js`);
        let input = useLocal == "test" ? fs.readFileSync(path + "/test.txt").toString() :await client.getInput();
        let result;
        if (part === 1)
            result = await code.part1(input);
        else if (part === 2)
            result = await code.part2(input);

        if(result && useLocal != "test")
            console.log(await client.submit(part, result));

        
    } catch (e) {
        console.log(e);
    }
    process.exit();
})();