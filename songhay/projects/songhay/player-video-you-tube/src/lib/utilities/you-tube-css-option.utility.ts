import { YouTubeCssOption } from '../models/you-tube-css-option';

/**
 * static members for @type {YouTubeCssOption}
 */
export class YouTubeCssOptionUtility {
    /**
     * gets the default CSS variables
     *
     * these defaults are based on the akyinkyin theme
     */
    public static getDefaultOptions(): YouTubeCssOption[] {
        return [
            {
                variableName: '--thumbs-header-link-color',
                variableValue: '#fff'
            },
            {
                variableName: '--thumbs-header-link-text-decoration',
                variableValue: 'none'
            },
            {
                variableName: '--thumbs-set-header-color',
                variableValue: '#fff'
            },
            {
                variableName: '--thumbs-set-header-position',
                variableValue: 'fixed'
            },
        ];
    }

    /**
     * reduces @type {YouTubeCssOption} data into a string for `Component.style` binding
     */
    public static getStyle(options: YouTubeCssOption[]): string {
        if (!options) { throw new Error('The expected CSS options are not here.'); }
        return options.reduce((a, i) => a += `${i.variableName}: ${i.variableValue};`, '');
    }
}
