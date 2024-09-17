import { NgModule } from '@angular/core';
import { RsvpHomeComponent } from './rsvp-home/rsvp-home.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RsvpHomeComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RsvpModule { }
