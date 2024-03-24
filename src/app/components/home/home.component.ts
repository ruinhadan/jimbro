import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
