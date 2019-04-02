import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IndexOptions } from '../models/index-options';
import { IndexStyles } from '../models/index-styles';
import { IndexEntriesStore } from '../services/index-entries.store';

@Component({
    selector: 'rx-index-container',
    templateUrl: './index-container.component.html',
    styleUrls: ['./index-container.component.scss']
})
export class IndexContainerComponent implements OnInit {

  viewStyle: IndexStyles;

    constructor(
        public indexService: IndexEntriesStore,
        private indexOptions: IndexOptions,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
          this.viewStyle = params['style'] as any;
      });

      this.indexService.load(this.indexOptions.indexStoreUri);
  }
}
