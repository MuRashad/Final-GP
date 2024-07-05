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
      this.username = decodedToken.username; // Adjust to match your token structure
      this.userId = decodedToken.id; // Adjust to match your token structure
      this.userType = this.authService.getUserType();
    }
  }
}
