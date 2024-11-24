import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlanComponent } from './components/plan/plan.component';

export const routes: Routes = [
    {"path": '', component: HomeComponent},
    {"path": 'plan', component: PlanComponent}
];
