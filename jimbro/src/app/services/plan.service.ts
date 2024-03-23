import { EventEmitter, Injectable } from "@angular/core";
import { Plan, Workout, Exercise, Record } from "../shared/types";
import { formatDate } from "@angular/common";

@Injectable()
export class PlanService {
    plan: Plan;
    planUpdated: EventEmitter<Plan>;
    selectedWorkoutIndex: number;
    selectedExerciseIndex: number;

    constructor() {
        this.plan = {
            name: '',
            dayCount: 0
        }

        this.planUpdated = new EventEmitter<Plan>();
        this.selectedExerciseIndex = 0;
        this.selectedWorkoutIndex = 0;
    }

    public getPlan() {
        return JSON.parse(JSON.stringify(this.plan))
    }

    public addWorkout() {
        if(this.plan.workouts) this.plan.workouts.push({name: 'New Workout', exerciseCount: 0})
        else this.plan.workouts = [{name: 'New Workout', exerciseCount: 0}]
        this.plan.dayCount+=1
        this.updateSelectedWorkoutIndex(this.plan.dayCount-1)
        this.planUpdated.emit(this.plan);
    }

    public addExercise() {
        if(this.plan.workouts![this.selectedWorkoutIndex].exercises) this.plan.workouts![this.selectedWorkoutIndex].exercises!.push({name: 'New Exercise'})
        else this.plan.workouts![this.selectedWorkoutIndex].exercises = [{name:'New Exercise'}]
        this.plan.workouts![this.selectedWorkoutIndex].exerciseCount+=1
        this.updateSelectedExerciseIndex(this.plan.workouts![this.selectedWorkoutIndex].exerciseCount-1)
        this.planUpdated.emit(this.plan);
    }

    public addRecord() {    
        if(this.plan.workouts![this.selectedWorkoutIndex].exercises![this.selectedExerciseIndex].records) this.plan.workouts![this.selectedWorkoutIndex].exercises![this.selectedExerciseIndex].records!.push({date: formatDate(Date.now(), 'yyyy-MM-dd', 'en_IN'), weight: 0, unit: 'kg', sets: 0, reps: 0})
        else this.plan.workouts![this.selectedWorkoutIndex].exercises![this.selectedExerciseIndex].records = [{date: formatDate(Date.now(), 'yyyy-MM-dd', 'en_IN'), weight: 0, unit: 'kg', sets: 0, reps: 0}]
        this.planUpdated.emit(this.plan);
    }

    public getSelectedWorkoutIndex() {
        return this.selectedWorkoutIndex;
    }

    public getSelectedExerciseIndex() {
        return this.selectedExerciseIndex;
    }

    public updateSelectedWorkoutIndex(index: number) {
        this.selectedWorkoutIndex = index;
    }

    public updateSelectedExerciseIndex(index: number) {
        this.selectedExerciseIndex = index;
    }
}