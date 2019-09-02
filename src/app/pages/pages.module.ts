import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonutComponent } from '../components/grafica-donut/grafica-donut.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
    imports: [
        SharedModule,
        PagesRoutingModule,
        FormsModule,
        ChartsModule
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficaDonutComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    providers: [],
})
export class PagesModule { }
