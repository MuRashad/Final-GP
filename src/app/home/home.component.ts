import { Component, ElementRef, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  scrollToContact(event: Event): void {
    event.preventDefault(); // Prevent default action (e.g., navigation)

    const contactSection = document.getElementById('contactSection');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

}
