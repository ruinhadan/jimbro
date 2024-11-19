import { Component, Input, OnChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Record, RecordDTO, Unit } from '../../shared/types';
import { MatTableModule } from '@angular/material/table';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss'
})
export class RecordComponent implements OnChanges{
  @Input() records: RecordDTO[] = [];
  Unit = Unit
  recordsMap = new Map<string, RecordDTO[]>()
  displayedColumns = ["record", "actions"]

  formatDate(date: Date) {
    const tempDate = new Date(date);
    return `${tempDate.getFullYear()}/${tempDate.getMonth() + 1}/${tempDate.getDate()}`
  }

  ngOnChanges() {
    this.recordsMap.clear();
    this.records.forEach((record) => {
      const key = this.formatDate(record.date)
      let curRecords = this.recordsMap.get(key); 
      if (curRecords)
        curRecords.push(record)
      else
        curRecords = [record]
      
      this.recordsMap.set(key, curRecords)
    })

  }

  
}
