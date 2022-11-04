import { Condition } from "./Condition";

export interface Rule {
    IsDefault: boolean;
    Value: boolean;
    Conditions: Condition[];
}
