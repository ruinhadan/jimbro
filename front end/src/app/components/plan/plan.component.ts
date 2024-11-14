import { AsyncPipe, CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { ExerciseDTO, Plan, PlanDTO, RightPanel, WorkoutDTO } from '../../shared/types';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { RecordComponent } from "../record/record.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
// import { plans } from '../../shared/dummy_data';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatIconModule, MatDivider, MatInputModule, MatSelectModule, MatFormFieldModule, MatTableModule, RecordComponent, MatDatepickerModule],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }, provideNativeDateAdapter()]
})
export class PlanComponent {
  plans: PlanDTO[] = [];
  selectedPlan: PlanDTO | undefined;
  workouts: WorkoutDTO[] = [];
  selectedWorkout: WorkoutDTO | undefined;
  downloadPlanURI: SafeUrl = '';
  planFilename: string = '';
  displayedColumns = ["name", "actions"]
  RightPanelDisplay: typeof RightPanel = RightPanel
  rightPanel = RightPanel.EXERCISEFORM
  exerciseFormControl: FormControl = new FormControl('');
  planFormControl: FormControl = new FormControl('');
  workoutFormControl: FormControl = new FormControl('');
  exercises = [{ name: 'Something' }, { name: 'Something' }, { name: 'Something' }, { name: 'Something' }, { name: 'Something' }]
  recordFormGroup: FormGroup = new FormGroup(
    {
      date: new FormControl(formatDate(Date.now(), 'yyyy-MM-dd', 'en_IN'), Validators.required),
      weight: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*.?[0-9]*")]),
      units: new FormControl("kg", Validators.required),
      sets: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*")]),
      reps: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*")])
    }
  )
  constructor(public backendService: BackendService) {
  }

  ngOnInit(): void {
    this.backendService.fetchAllPlans().subscribe({
      next: (plans: PlanDTO[]) => { this.plans = plans; },
      error: (error: Error) => { console.log(error); }
    }
    )
  }

  createPlan() {

  }

  changePlan() {
    this.selectedWorkout = undefined;
    this.backendService.fetchWorkoutsForPlan(this.selectedPlan!).subscribe({
      next: (workouts: WorkoutDTO[]) => { this.workouts = workouts; },
      error: (error: Error) => { console.log(error); }
    }
    )
  }

}
