import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: []
})
export class LayoutModule { }
