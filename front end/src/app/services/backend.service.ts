import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ExerciseDTO, PlanDTO, WorkoutDTO } from '../shared/types';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private httpClient: HttpClient) {
  }

  fetchAllPlans(){
    return this.httpClient.get<PlanDTO[]>(`${environment.backendURL}/plans`);
  }

  fetchWorkoutsForPlan(plan: PlanDTO) {
    return this.httpClient.get<WorkoutDTO[]>(`${environment.backendURL}/plans/${plan.id}/workouts`);
  }

  

}
