import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        SiderbarComponent,
        BreadcrumbsComponent,
        PagenotfoundComponent
    ],
    imports: [
         CommonModule,
         RouterModule
         ],
    exports: [
        HeaderComponent,
        SiderbarComponent,
        BreadcrumbsComponent,
        PagenotfoundComponent
    ],
    providers: [],
})
export class SharedModule {}
