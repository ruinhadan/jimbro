import { CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { Plan, RightPanel } from '../../shared/types';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { RecordComponent } from "../record/record.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { plans } from '../../shared/dummy_data';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule, MatDivider, MatInputModule, MatSelectModule, MatFormFieldModule, MatTableModule, RecordComponent, MatDatepickerModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }, provideNativeDateAdapter()]
})
export class PlanComponent {
  plans: Plan[] = [];
  selectedPlanIndex: number = 0;
  selectedWorkoutIndex: number = 0;
  selectedExerciseIndex: number = 0;
  downloadPlanURI: SafeUrl = '';
  planFilename: string = '';
  displayedColumns = ["name", "actions"]
  RightPanelDisplay: typeof RightPanel = RightPanel
  rightPanel = RightPanel.EXERCISEFORM
  exerciseFormControl: FormControl = new FormControl('');
  planFormControl: FormControl = new FormControl('');
  workoutFormControl: FormControl = new FormControl('');
  exercises = [{name: 'Something'}, {name: 'Something'}, {name: 'Something'}, {name: 'Something'}, {name: 'Something'}]
  recordFormGroup: FormGroup = new FormGroup(
    {
      date: new FormControl(formatDate(Date.now(), 'yyyy-MM-dd', 'en_IN'), Validators.required),
      weight: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*.?[0-9]*")]),
      units: new FormControl("kg", Validators.required),
      sets: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*")]),
      reps: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*")])
    }
  )
  constructor(private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.plans = plans;
    let groupedRecords = [];
    // this.plans.forEach((plan) => {
    //   plan.workouts.forEach((workout) => {
    //     workout.exercises.forEach((exercise) => {
    //       groupedRecords = [];
    //       exercise.records.
    //     })
    //   })
    // })

  }

  createPlan() {

  }

}
