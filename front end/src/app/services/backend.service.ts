import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Exercise, ExerciseDTO, PlanDTO, Record, RecordDTO, WorkoutDTO } from '../shared/types';
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
    return this.httpClient.get<Exercise[]>(`${environment.backendURL}/workouts/${workout.id}/exercises`);
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

  addExerciseToWorkout(workout: WorkoutDTO, exercise: Exercise) {
    return this.httpClient.post(`${environment.backendURL}/workouts/${workout.id}/exercises`, exercise)
  }

  fetchAllExercises() {
    return this.httpClient.get<Exercise[]>(`${environment.backendURL}/exercises`);
  }

  fetchRecordsForExercise(workout: WorkoutDTO, exercise: Exercise) {
    return this.httpClient.get<RecordDTO[]>(`${environment.backendURL}/workouts/${workout.id}/exercises/${exercise.id}/records`);
  }

  addRecordToWorkout(workout: WorkoutDTO, exercise: Exercise, record: any) {
    record.exercise = exercise
    return this.httpClient.post(`${environment.backendURL}/workouts/${workout.id}/exercises/${exercise.id}/records`, record)
  }

  deletePlan(plan: PlanDTO) {
    return this.httpClient.delete(`${environment.backendURL}/plans/${plan.id}`);
  }

  deleteWorkout(plan: PlanDTO, workout: WorkoutDTO) {
    return this.httpClient.delete(`${environment.backendURL}/plans/${plan.id}/workouts/${workout.id}`);
  }

  deleteExerciseFromWorkout(workout: WorkoutDTO, exercise: Exercise) {
    return this.httpClient.delete(`${environment.backendURL}/workouts/${workout.id}/exercises/${exercise.id}`);
  }

  deleteRecord(workout: WorkoutDTO, exercise: Exercise, record: RecordDTO) {
    console.log(workout, record, exercise)
    return this.httpClient.delete(`${environment.backendURL}/workouts/${workout.id}/exercises/${exercise.id}/records/${record.id}`);
  }

}
