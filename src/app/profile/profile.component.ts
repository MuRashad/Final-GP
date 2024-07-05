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
  userType: string | null = null;
  userProfilePhoto: string | undefined; // User profile photo URL
  isPhotoChanged: boolean = false;
  isFormEdited: boolean = false;
  isEditing: boolean = false; // Flag to track editing mode

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProfileData(); // Load profile data on component initialization
  }

  loadProfileData(): void {
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

      // Load user profile photo from localStorage if available
      const storedPhoto = localStorage.getItem('userProfilePhoto');
      if (storedPhoto) {
        this.userProfilePhoto = storedPhoto;
        this.isPhotoChanged = true;
      }
    }
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.isFormEdited = false; // Reset form edited flag when editing is turned off
    }
  }

  saveChanges(): void {
    // Logic to save changes (e.g., update user profile)
    // After saving, disable editing mode
    this.isEditing = false;
    this.isFormEdited = false; // Reset form edited flag
  }

  onFormEdited(): void {
    this.isFormEdited = true;
  }

  onPhotoSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e) => {
        this.userProfilePhoto = e.target?.result as string;
        this.isPhotoChanged = true; // Set flag to true when photo is changed
        // Store photo URL in localStorage
        localStorage.setItem('userProfilePhoto', this.userProfilePhoto);
      };
      reader.readAsDataURL(file);
    }
  }
}
