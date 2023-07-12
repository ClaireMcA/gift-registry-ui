import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistryItemsComponent } from './registry-items/registry-items.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthModule } from './auth/auth.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { LayoutModule } from './layout/layout.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { ErrorInterceptor } from './error.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RsvpModule } from './rsvp/rsvp.module';

@NgModule({
  declarations: [
    AppComponent,
    RegistryItemsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,

    LayoutModule,
    RsvpModule,
    AuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
