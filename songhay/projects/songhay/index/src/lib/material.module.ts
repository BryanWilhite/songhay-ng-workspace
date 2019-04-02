import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule
} from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatToolbarModule,
        NgxPaginationModule
    ],
    exports: [
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatToolbarModule,
        NgxPaginationModule
    ]
})
export class MaterialModule {}
