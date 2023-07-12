import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSidenavModule
  ]
})
export class SharedModule { }
