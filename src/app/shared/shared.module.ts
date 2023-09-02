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
import { ToolbarGraphicComponent } from './toolbar-graphic/toolbar-graphic.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ToolbarGraphicComponent,
    ToolbarComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    RouterModule
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
    MatSidenavModule,
    ToolbarGraphicComponent,
    ToolbarComponent
  ]
})
export class SharedModule { }
