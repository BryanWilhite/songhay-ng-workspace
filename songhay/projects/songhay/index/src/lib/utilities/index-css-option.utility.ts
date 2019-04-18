import { IndexCssOption } from '../models/index-css-option';

/**
 * static members for @type {IndexCssOption}
 */
export class IndexCssOptionUtility {
    /**
     * gets the default CSS variables
     *
     * these defaults are based on the akyinkyin theme
     */
    public static getDefaultOptions(): IndexCssOption[] {
        return [
            {
                variableName: '--link-color',
                variableValue: '#006633' // $akyinkyin-base
            },
            {
                variableName: '--link-active-color',
                variableValue: '#006633' // $akyinkyin-base
            },
            {
                variableName: '--link-visited-color',
                variableValue: '#006633' // $akyinkyin-base
            },
            {
                variableName: '--link-hover-text-decoration-color',
                variableValue: '#006633' // $akyinkyin-base
            },
            {
                variableName: '--mat-card-background-color',
                variableValue: '#1d241d' // $akyinkyin-background
            },
            {
                variableName: '--mat-option-selected-color',
                variableValue: '#00ee3b' // $akyinkyin-light-tint
            },
            {
                variableName: '--ngx-pagination-page-number-selected-background-color',
                variableValue: '#006633' // $akyinkyin-base
            },
            {
                variableName: '--link-text-decoration',
                variableValue: 'none'
            },
            {
                variableName: '--link-hover-text-decoration',
                variableValue: 'underline'
            }
        ];
    }

    /**
     * reduces @type {IndexCssOption} data into a string for `Component.style` binding
     */
    public static getStyle(options: IndexCssOption[]): string {
        if (!options) { throw new Error('The expected CSS options are not here.'); }
        return options.reduce((a, i) => a += `${i.variableName}: ${i.variableValue};`, '');
    }
}
