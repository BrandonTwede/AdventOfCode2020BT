import { AocClient } from "advent-of-code-client";
import { InputReaderInterface } from "../util/InputReaderInterface";
import { InputReader } from "../util/InputReader";
import DayBase from "./DayBase";
import { InputReaderSplit } from "../util/InputReaderSplit";
import { InputReaderDoFunc } from "../util/InputReaderDoFunc";

type position = 'before' | 'after';
type rule = {pos:position,page:string};
type ruleset = {[key:string]:rule[]};
type updateIndices = {[key:string]:number};
type update = {
    updateIndices: updateIndices,
    updateList: number[]
}

type inputFormat = {
    rules: ruleset,
    updates: update[],
}

export default class Day5 extends DayBase {

    ruleIsUpheldForPage(page: string, rule: rule, update: updateIndices) {
        if (!(rule.page in update)) {
            return true;
        }
        let pageIdx = update[page];
        let comparisonPageIdx = update[rule.page];
        
        if (rule.pos == 'before') {
            return pageIdx < comparisonPageIdx;
        } else {
            return pageIdx > comparisonPageIdx;
        }
    }

    pageFollowsAllRules(page: string, rules: rule[], update: updateIndices) {
        for (let rule of rules) {
            if (!this.ruleIsUpheldForPage(page, rule, update)) {
                return false;
            }
        }
        return true;
    }

    updateIsValid(rules: ruleset, update: updateIndices): boolean {
        for (let page of Object.keys(update)) {
            if (!this.pageFollowsAllRules(page, rules[page], update)) {
                return false;
            }
        }

        return true;
    }

    runPartOne(input: inputFormat): string {
        const validUpdates = [] as update[];
        for(let update of input.updates) {
            if (this.updateIsValid(input.rules, update.updateIndices)) {
                validUpdates.push(update);
            }
        }

        let result = validUpdates
            .map((u) => u.updateList)                   // Get the list of strings
            .map((u) => u[Math.floor(u.length / 2)])    // Get middle item
            .reduce((p, c) => p + c, 0);                // Sum
        return result.toString();
    }

    applyRulesToOrdering(rules: ruleset, update: update): update {
        update.updateList.sort((a, b) => {
            let atobRule = rules[String(a)].filter(r => r.page == String(b))[0];
            if (!atobRule) return 0;
            return atobRule.pos == 'before' ? -1 : 1;
        });

        return update;
    }

    runPartTwo(input: inputFormat): string {
        const invalidUpdates = [] as update[];
        for(let update of input.updates) {
            if (!this.updateIsValid(input.rules, update.updateIndices)) {
                invalidUpdates.push(update);
            }
        }

        let result = invalidUpdates
            .map(u => this.applyRulesToOrdering(input.rules, u))
            .map((u) => u.updateList)                   // Get the list of strings
            .map((u) => u[Math.floor(u.length / 2)])    // Get middle item
            .reduce((p, c) => p + c, 0);                // Sum
        return result.toString();
    };

    getInputReader(aocClient: AocClient, part: Number, useLocal: boolean): InputReaderInterface {
        let reader = new InputReader(aocClient, useLocal);
        let splitSections = new InputReaderSplit(reader, '\n\n');
        let splitLines = new InputReaderSplit(splitSections, '\n');
        let parseInput = new InputReaderDoFunc(splitLines, (input) => {
            let instructionsRaw = input[0];
            let updatesRaw = input[1];
            let rules = {} as ruleset;
            for(let rule of instructionsRaw) {
                let parts = rule.split('|');
                if (parts[0] in rules) {
                    rules[parts[0]].push({pos:'before', page: parts[1]});
                } else {
                    rules[parts[0]] = [{pos: 'before', page: parts[1]}]
                }
                if (parts[1] in rules) {
                    rules[parts[1]].push({pos:'after', page: parts[0]});
                } else {
                    rules[parts[1]] = [{pos: 'after', page: parts[0]}]
                }
            };
            let updates = [] as update[];
            for(let update of updatesRaw) {
                let updateIndices = {};
                let pages = update.split(',');
                for(let i = 0; i < pages.length; i++) {
                    updateIndices[pages[i]] = i;
                }
                updates.push({updateIndices, updateList: pages.map((p) => Number(p))});
            }
            const finalInput = {rules, updates} as inputFormat;
            return finalInput;
        })
        return parseInput;

    }
}