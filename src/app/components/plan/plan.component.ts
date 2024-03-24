import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../shared/types';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss'
})
export class PlanComponent {
  plan: Plan = {name: '', dayCount: 0};
  selectedWorkoutIndex: number = 0;
  selectedExerciseIndex: number = 0;
  downloadPlanURI: SafeUrl = '';
  planFilename: string = '';

  constructor(private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.plan = history.state;
    this.downloadPlanURI = this.sanitizer.bypassSecurityTrustUrl("data:application/json;charset=UTF-8," + encodeURIComponent(JSON.stringify(this.plan)))
    this.planFilename = this.plan.name.split(' ').join('_')+'.json'
    
    
  }

  displaySelectedWorkout(index: number) {
    this.selectedWorkoutIndex = index;
  }

  displaySelectedExercise(index: number) {
    this.selectedExerciseIndex = index;
  }

  public setPlan(plan: string) {
    this.plan = JSON.parse(plan);
}

public addWorkout() {
    if(this.plan.workouts) this.plan.workouts.push({name: 'New Workout', exerciseCount: 0})
    else this.plan.workouts = [{name: 'New Workout', exerciseCount: 0}]
    this.plan.dayCount+=1
}

public addExercise() {
    if(this.plan.workouts![this.selectedWorkoutIndex].exercises) this.plan.workouts![this.selectedWorkoutIndex].exercises!.push({name: 'New Exercise'})
    else this.plan.workouts![this.selectedWorkoutIndex].exercises = [{name:'New Exercise'}]
    this.plan.workouts![this.selectedWorkoutIndex].exerciseCount+=1
}

public addRecord() {    
    if(this.plan.workouts![this.selectedWorkoutIndex].exercises![this.selectedExerciseIndex].records) this.plan.workouts![this.selectedWorkoutIndex].exercises![this.selectedExerciseIndex].records!.push({date: formatDate(Date.now(), 'yyyy-MM-dd', 'en_IN'), weight: 0, unit: 'kg', sets: 0, reps: 0})
    else this.plan.workouts![this.selectedWorkoutIndex].exercises![this.selectedExerciseIndex].records = [{date: formatDate(Date.now(), 'yyyy-MM-dd', 'en_IN'), weight: 0, unit: 'kg', sets: 0, reps: 0}]
}

public updatePlanFile() {
  this.downloadPlanURI = this.sanitizer.bypassSecurityTrustUrl("data:application/json;charset=UTF-8," + encodeURIComponent(JSON.stringify(this.plan)))
    this.planFilename = this.plan.name.split(' ').join('_')+'.json'
}

}
