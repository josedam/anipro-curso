import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { PagesModule } from "./pages/pages.module";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ServicesModule } from "./services/services.module";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    PagesModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
