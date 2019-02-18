import { NgModule } from '@angular/core';

import { PipesModule } from '../pipes/pipes.module';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SiderbarComponent } from './siderbar/siderbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RouterModule } from '@angular/router';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SiderbarComponent,
        BreadcrumbsComponent,
        PagenotfoundComponent,
        ModalUploadComponent
    ],
    imports: [
         CommonModule,
         RouterModule,
         PipesModule
         ],
    exports: [
        HeaderComponent,
        SiderbarComponent,
        BreadcrumbsComponent,
        PagenotfoundComponent,
        ModalUploadComponent
    ],
    providers: [],
})
export class SharedModule {}
