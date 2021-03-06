import { Component } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'songhay-ng-workspace';

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIconSetInNamespace(
            'rx',
            sanitizer.bypassSecurityTrustResourceUrl('assets/svg/sprites.svg')
        );
    }
}
