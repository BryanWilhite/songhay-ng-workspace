import { IndexCssVariables } from './index-css-variables';

/**
 * defines a name-value pair for a CSS variable
 */
export interface IndexCssOption {
    /**
     * CSS variable name
     */
    variableName: IndexCssVariables;

    /**
     * CSS variable value
     */
    variableValue: string;
}
