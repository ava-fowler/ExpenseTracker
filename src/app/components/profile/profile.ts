import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {

  userId: string | null = null;
  profile: UserProfile = {
    name: '',
    email: '',
    budgetGoal: 0
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    this.authService.currentUser$.subscribe(user => {
      if (!user) return;
      this.userId = user.uid;
      this.profile.email = user.email ?? '';
      this.userService.getUserProfile(user.uid).subscribe(data => {
        if (data) {
          this.profile = { ...this.profile, ...data };
          this.cdr.detectChanges();
        }
      });
    });
  }

  saveProfile() {
    if (!this.userId) return;
    this.userService.saveUserProfile(this.userId, this.profile)
      .then(() => alert('Profile saved!'))
      .catch(err => console.error(err));
  }
}