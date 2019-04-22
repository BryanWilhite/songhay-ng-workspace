import { YouTubeCssVariables } from './you-tube-css-variables';

/**
 * defines a name-value pair for a CSS variable
 */
export interface YouTubeCssOption {
    /**
     * CSS variable name
     */
    variableName: YouTubeCssVariables;

    /**
     * CSS variable value
     */
    variableValue: string;
}
