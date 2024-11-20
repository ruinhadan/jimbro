import { AsyncPipe, CommonModule, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { Exercise, Plan, PlanDTO, Record, RecordDTO, RightPanel, WorkoutDTO } from '../../shared/types';
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
  workoutExercises: Exercise[] = [];
  availableExercises: Exercise[] = [];
  displayedColumns = ["name", "actions"]
  RightPanelDisplay: typeof RightPanel = RightPanel
  rightPanel = RightPanel.HOWTO
  exerciseFormControl: FormControl = new FormControl('');
  planFormControl: FormControl = new FormControl('');
  workoutFormControl: FormControl = new FormControl('');
  exercises: Exercise[] = [];
  selectedExercise: Exercise | undefined;
  records: RecordDTO[] = [];
  recordFormGroup: FormGroup = new FormGroup(
    {
      date: new FormControl(formatDate(Date.now(), 'yyyy-MM-dd', 'en_IN'), [Validators.required]),
      weight: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*.?[0-9]*")]),
      unit: new FormControl(0, [Validators.required, Validators.pattern("[01]?")]),
      sets: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*")]),
      reps: new FormControl(0, [Validators.required, Validators.pattern("[0-9]*")])
    }
  )
  constructor(public backendService: BackendService) {
  }

  ngOnInit(): void {
    this.getAllPlans();
    this.getAllExercises();
  }

  openPlanForm() {
    this.rightPanel = this.RightPanelDisplay.PLANFORM;
  }

  openWorkoutForm() {
    this.rightPanel = this.RightPanelDisplay.WORKOUTFORM;
  }

  openExerciseForm() {
    this.rightPanel = this.RightPanelDisplay.EXERCISEFORM;
  }

  openRecordForm(exercise: Exercise) {
    this.selectedExercise = exercise;
    this.rightPanel = this.RightPanelDisplay.RECORDFORM;
  }

  openRecordList(exercise: Exercise) {
    this.selectedExercise = exercise;
    this.getRecordsForExercise(exercise);
    this.rightPanel = this.RightPanelDisplay.RECORDS;
  }

  getRecordsForExercise(exercise: Exercise) {
    this.backendService.fetchRecordsForExercise(this.selectedWorkout!, exercise).subscribe({
      next: (records: RecordDTO[]) => {this.records = records;},
      error: (error: Error) => {console.log(error)}
    })
  }

  getAllPlans() {
    this.selectedPlan = undefined;
    this.selectedWorkout = undefined;
    this.rightPanel = this.RightPanelDisplay.HOWTO;
    this.backendService.fetchAllPlans().subscribe({
      next: (plans: PlanDTO[]) => { this.plans = plans; },
      error: (error: Error) => { console.log(error); }
    }
    )
  }

  getAllExercises() {
    this.backendService.fetchAllExercises().subscribe({
      next: (exercises: Exercise[]) => {this.exercises = exercises;},
      error: (error: Error) => {console.log(error);}
    })
  }

  changePlan() {
    this.selectedWorkout = undefined;
    this.rightPanel = this.RightPanelDisplay.HOWTO;
    this.backendService.fetchWorkoutsForPlan(this.selectedPlan!).subscribe({
      next: (workouts: WorkoutDTO[]) => { this.workouts = workouts; },
      error: (error: Error) => { console.log(error); }
    }
    )
  }

  changeWorkout() {
    this.rightPanel = this.RightPanelDisplay.HOWTO;
    this.backendService.fetchExercisesForWorkout(this.selectedWorkout!).subscribe(
      {
        next: (exercises: Exercise[]) => {
          this.workoutExercises = exercises; 
          const existingExercises = new Set(this.workoutExercises.map((exercise) => exercise.id));
          this.availableExercises = this.exercises.filter((exercise) => !existingExercises.has(exercise.id));
        },
        error: (error: Error) => {console.log(error);}
      }
    )
  }

  createPlan() {
    this.backendService.createPlan(this.planFormControl.value).subscribe(
      {
        next: () => {alert("Created plan successfully"); this.getAllPlans();},
        error: (error: Error) => {console.log(error)}
      }
    )
  }

  createWorkout() {
    this.backendService.createWorkout(this.selectedPlan!, this.workoutFormControl.value).subscribe(
      {
        next: () => {alert("Created workout successfully"); this.changePlan();},
        error: (error: Error) => {console.log(error)}
      }
    )
  }

  addExerciseToWorkout() {
    this.backendService.addExerciseToWorkout(this.selectedWorkout!, this.exerciseFormControl.value).subscribe({
      next: () => {alert("Added exercise to workout successfully"); this.changeWorkout();},
      error: (error: Error) => {console.log(error);}
    })
  }

  addRecordToWorkout() {
    if(this.recordFormGroup.valid) {
      this.backendService.addRecordToWorkout(this.selectedWorkout!, this.selectedExercise!, this.recordFormGroup.value).subscribe({
        next: () => {alert("Record added successfully!")},
        error: (error: Error) => console.log(error)
      })
    }
    
  }

  deletePlan() {
    if(confirm("Are you sure you want to delete the Plan? It will delete all Workouts & Records within it.")) {
      this.backendService.deletePlan(this.selectedPlan!).subscribe({
        next: () => {alert("Plan deleted successfully!"); this.getAllPlans();},
        error: (error: Error) => {console.log(error);}
      })
    }
    
  }
  deleteWorkout() {
    if(confirm("Are you sure you want to delete the Workout? It will delete all Records within it.")) {
      this.backendService.deleteWorkout(this.selectedPlan!, this.selectedWorkout!).subscribe({
        next: () => {alert("Workout deleted successfully!"); this.changePlan();},
        error: (error: Error) => {console.log(error);}
      })
    }
  }

  deleteExerciseFromWorkout(exercise: Exercise) {
    if(confirm("Are you sure you want to delete this exercise from the Workout? It will delete all Records within it.")) {
      this.backendService.deleteExerciseFromWorkout(this.selectedWorkout!, exercise).subscribe({
        next: () => {alert("Exercise deleted successfully!"); this.changeWorkout();},
        error: (error: Error) => {console.log(error);}
      })
    }
  }

  deleteRecord(record: RecordDTO) {

    this.backendService.deleteRecord(this.selectedWorkout!, this.selectedExercise!, record).subscribe({
      next: () => {alert("Record deleted successfully!"); this.getRecordsForExercise(this.selectedExercise!);},
      error: (error: Error) => {console.log(error);}
    })
  }
}
