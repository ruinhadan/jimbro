import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ExerciseDTO, PlanDTO, Record, RecordDTO, WorkoutDTO } from '../shared/types';
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

  fetchExercisesForWorkout(workout: WorkoutDTO) {
    return this.httpClient.get<ExerciseDTO[]>(`${environment.backendURL}/workouts/${workout.id}/exercises`);
  }

  createPlan(planName: string) {
    const requestBody = {
      name: planName
    }
    return this.httpClient.post(`${environment.backendURL}/plans`, requestBody);
  }

  createWorkout(plan: PlanDTO, workoutName: string) {
    const requuestBody = {
      name: workoutName
    }
    return this.httpClient.post(`${environment.backendURL}/plans/${plan.id}/workouts`, requuestBody);
  }

  addExerciseToWorkout(workout: WorkoutDTO, exercise: ExerciseDTO) {
    return this.httpClient.post(`${environment.backendURL}/workouts/${workout.id}/exercises`, exercise)
  }

  fetchAllExercises() {
    return this.httpClient.get<ExerciseDTO[]>(`${environment.backendURL}/exercises`);
  }

  fetchRecordsForExercise(exercise: ExerciseDTO, workout: WorkoutDTO) {
    return this.httpClient.get<RecordDTO[]>(`${environment.backendURL}/workouts/${workout.id}/exercises/${exercise.id}/records`);
  }

}
