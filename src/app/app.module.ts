import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ProgressComponent } from "./pages/progress/progress.component";
import { Graficas1Component } from "./pages/graficas1/graficas1.component";
import { HeaderComponent } from "./shared/header/header.component";
import { SiderbarComponent } from "./shared/siderbar/siderbar.component";
import { BreadcrumbsComponent } from "./shared/breadcrumbs/breadcrumbs.component";

import { PagenotfoundComponent } from "./shared/pagenotfound/pagenotfound.component";
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    HeaderComponent,
    SiderbarComponent,
    BreadcrumbsComponent,
    PagenotfoundComponent,
    PagesComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
