import { Condition } from "../models";

export function evaluateCondition(condition: Condition, attributeValue: string): boolean | undefined {

    switch (condition.ConditionOptionId) {
        // is one of
        case 1: {
            return condition.Values.some(v => attributeValue === v);
        }
        // is not one of
        case 2: {
            return !condition.Values.some(v => attributeValue === v);
        }
        // contains
        case 3: {
            return condition.Values.some(v => attributeValue.includes(v));
        }
        // does not contain
        case 4: {
            return !condition.Values.some(v => attributeValue.includes(v));
        }
        // starts with
        case 5: {
            return condition.Values.some(v => attributeValue.startsWith(v));
        }
        // does not start with
        case 6: {
            return !condition.Values.some(v => attributeValue.startsWith(v));
        }
        // ends with
        case 7: {
            return condition.Values.some(v => attributeValue.endsWith(v));
        }
        // does not end with
        case 8: {
            return !condition.Values.some(v => attributeValue.endsWith(v));
        }
        // less than
        case 9: {
            return condition.Values.some(v => attributeValue < v);
        }
        // greater than
        case 10: {
            return condition.Values.some(v => attributeValue > v);
        }
        // less than or equal
        case 11: {
            return condition.Values.some(v => attributeValue <= v);
        }
        // greater than or equal
        case 12: {
            return condition.Values.some(v => attributeValue >= v);
        }
    }

    return undefined;
}
