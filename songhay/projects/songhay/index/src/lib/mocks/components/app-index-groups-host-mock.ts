import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BlogEntriesService } from '../../services/songhay-blog-entries.service';

import { AppIndexGroupsComponent } from '../../components/app-index-groups/app-index-groups.component';

@Component({
    selector: 'rx-index-groups-host-component',
    template:
        '<app-index-groups [indexService]="indexService" class="view groups" fxFlex="100"></app-index-groups>'
})
export class AppIndexGroupsHostMockComponent implements AfterViewInit {
    @ViewChild(AppIndexGroupsComponent)
    hostedComponent: AppIndexGroupsComponent;

    constructor(public indexService: BlogEntriesService) {}

    ngAfterViewInit() {
        console.log('AppIndexGroupsHostMockComponent.hostedComponent: ', this.hostedComponent);
    }
}
