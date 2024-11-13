import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent {
  records: {[date: string]: {weight: number, units: string, sets: number, reps: number}[]} = {
    ['22-07-2024']: [
      {weight: 10, units: 'kg', sets: 2, reps: 10},
      {weight: 15, units: 'kg', sets: 2, reps: 10}
    ],
    ['23-07-2024']: [
      {weight: 10, units: 'kg', sets: 2, reps: 10},
      {weight: 15, units: 'kg', sets: 1, reps: 10}
    ]
  }

  dateList = Object.keys(this.records);
}
