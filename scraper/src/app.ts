require('dotenv').config();
require('debug')('lottery-scraper');

import { SanDiegoSource } from './sources/sandiego';

function formatData(data: any[]) {
    let log = '';
    data.forEach((e) => {
        let eLog = '';
        eLog += e.title + '\n';
        const { numbers } = e;
        for (let i = 0; i < numbers.length / 2; i++) {
            const [numberA, numberB] = [numbers[i], numbers[i + 10]];
            eLog += `|${numberA.order}| ${numberA.number} || ${numberB.order}| ${numberB.number}|\n`;
        }

        log += eLog + '\n';
    });

    return log;
}

async function main() {
    const source = new SanDiegoSource(null);

    const [nodePath, scriptPath, date, type, turn] = process.argv;
    const results = await source.getData(date, type, turn);

    return formatData(results);
}

main().then((r) => console.log(r));
