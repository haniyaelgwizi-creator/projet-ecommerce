import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],  // ✅ important pour *ngIf
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}  // auth public pour template

  logout() {
    this.auth.logout();
    this.router.navigate(['/welcome']);
  }
}
