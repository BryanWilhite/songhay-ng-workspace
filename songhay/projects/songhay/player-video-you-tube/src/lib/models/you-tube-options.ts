import { Injectable } from '@angular/core';

import { YouTubeCssOption } from './you-tube-css-option';

@Injectable()
export class YouTubeOptions {
    /**
     * @see @type {IndexCssOption}
     */
    youTubeCssOptions?: YouTubeCssOption[];

    /**
     * location of the Index data
     * @remarks `./assets/svg/sprites.svg`
     */
    youTubeSpritesUri: string;
}
