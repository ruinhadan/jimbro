import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewPlanComponent } from './components/new-plan/new-plan.component';

export const routes: Routes = [
    {"path": '', component: HomeComponent},
    {
        "path": 'new-plan', component: NewPlanComponent
    }
];
