import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string | undefined;
  userId: string | undefined;
  userType: string | null = null; // Initialize userType to null or a default value

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const decodedToken = this.authService.decodeUserToken();
    if (decodedToken) {
      if (decodedToken.role === 'user') {
        this.username = decodedToken.username;
        this.userId = decodedToken.id;
      } else if (decodedToken.role === 'pharmacy') {
        this.username = decodedToken.pharmacy_username;
        this.userId = decodedToken.id;
      }
      this.userType = decodedToken.role;
    }
  }
}
