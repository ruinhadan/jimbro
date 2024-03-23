import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { Plan } from '../../shared/types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [PlanService],
  templateUrl: './new-plan.component.html',
  styleUrl: './new-plan.component.scss'
})
export class NewPlanComponent implements OnInit {
  plan: Plan = {name: '', dayCount: 0};
  selectedWorkoutIndex: number = 0;
  selectedExerciseIndex: number = 0;

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.plan = this.planService.getPlan();

    this.planService.planUpdated.subscribe(
      (plan: Plan) => {
        this.plan = plan;
        this.selectedWorkoutIndex = this.planService.getSelectedWorkoutIndex();
        this.selectedExerciseIndex = this.planService.getSelectedExerciseIndex();
      }
    )
  }

  displaySelectedWorkout(index: number) {
    this.selectedWorkoutIndex = index;
    this.planService.updateSelectedWorkoutIndex(index);
  }

  displaySelectedExercise(index: number) {
    this.selectedExerciseIndex = index;
    this.planService.updateSelectedExerciseIndex(index);
  }

  addWorkout() {
    this.planService.addWorkout()
  }

  addExercise() {
    this.planService.addExercise()
  }

  addRecord() {
    this.planService.addRecord()
  }
}
