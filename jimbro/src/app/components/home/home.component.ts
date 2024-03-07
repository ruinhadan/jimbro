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
    this.router.navigate(["/new-plan"])
  }
  openExistingPlan(event: Event) {
    // this.router.navigate(["/open-plan"])
    const target = event.target as HTMLInputElement;
    const file: File = target.files![0];
    
  }
}
