import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatDividerModule, MatIconModule, MatButtonModule, RouterLink, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  currentFeaures: string[] = ["Create and manage workout plans", "Keep track of day-to-day progress", "Manage plans using simple JSON files"]
  WIPFeatures: string[] = ["Login & manage accounts using OAuth", "Manage plans using persistent DB", "View elementary stats & charts of the data"]

  constructor(private router: Router) {

  }

  createNewPlan() {
    this.router.navigate(["/plan"], {state: {name: '', dayCount: 0}})
  }

  openExistingPlan(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if(files && files.length > 0) {
      const file: File = files.item(0)!;
      if(file.type != 'application/json'){
        alert("Please upload a json file");
        return;
      }    
      const reader: FileReader = new FileReader();
      reader.readAsText(file)
      reader.onload = (e) => {
        let plan: string = reader.result as string;
        this.router.navigate(['/plan'], {state: JSON.parse(plan)})
      }
    }
    
  }
}
