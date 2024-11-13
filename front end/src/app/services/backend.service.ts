import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExerciseDTO, PlanDTO, WorkoutDTO } from '../shared/types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  exerciseList: ExerciseDTO[] = []
  planList: PlanDTO[] = []  

  constructor(private httpClient: HttpClient) { 
    this.httpClient.get(`${environment.backendURL}/plans`)
  }

  getAllPlans() {
    this.httpClient.get(`${environment.backendURL}/plans`).subscribe(
      (plans) => {return plans;}
    )
  }

  getWorkoutsForPlan(plan: PlanDTO) {
    this.httpClient.get(`${environment.backendURL}/plans/${plan.id}/workouts`).subscribe(
      (workouts) => {return workouts;}
    )
  }

}
