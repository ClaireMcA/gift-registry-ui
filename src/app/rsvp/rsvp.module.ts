import { NgModule } from '@angular/core';
import { RsvpHomeComponent } from './rsvp-home/rsvp-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RsvpHomeComponent],
  imports: [
    SharedModule
  ]
})
export class RsvpModule { }
