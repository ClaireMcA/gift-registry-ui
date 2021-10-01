import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent, DetailsComponent],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class LayoutModule { }
