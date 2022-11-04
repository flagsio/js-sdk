import { Percentage } from "./Percentage";
import { Rule } from "./Rule";

export interface FeatureConfiguration {

    Key: string;
    Timestamp: number;
    Enabled: boolean;
    Deleted: boolean;
    TargetId: number;
    Percentages: Percentage[];
    TargetingRules: Rule[];
}
