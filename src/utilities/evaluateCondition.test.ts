import {describe, expect, test} from '@jest/globals';
import { evaluateCondition } from './evaluateCondition';
import { Condition } from "../models";

describe('evaluateCondition function', () => {
    test("evaluates 'is one of' condition", () => {
        
        // Arrange
        let condition = {
            ConditionOptionId: 1,
            Values: [
                "val"
            ]
        } as Condition;

        let value = "val";
        
        // Act
        var result = evaluateCondition(condition, value);
        
        // Assert        
        expect(result).toBeTruthy();
    });
});
