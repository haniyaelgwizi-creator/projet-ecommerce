import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterResult } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class WelcomeComponent {
  email = '';
  password = '';
  emailError = '';
  passwordError = '';
  generalError = '';

  constructor(private auth: AuthService, private router: Router) {}

  clearErrors() {
    this.emailError = '';
    this.passwordError = '';
    this.generalError = '';
  }

  login() {
    this.clearErrors();
    if (!this.validateInputs()) return;

    this.auth.login(this.email, this.password).subscribe(ok => {
      if (ok) {
        this.router.navigate(['/catalog']);
      } else {
        this.generalError = 'Email ou mot de passe incorrect. Si vous êtes un nouvel utilisateur, utilisez Register.';
      }
    });
  }

  register() {
    this.clearErrors();
    if (!this.validateInputs()) return;

    const newUser: User = {
      name: this.email.split('@')[0],
      email: this.email,
      password: this.password
    };

    this.auth.register(newUser).subscribe((result: RegisterResult) => {
      if (result === 'success') {
        this.generalError = 'Inscription réussie ! Cliquez sur Login pour vous connecter.';
      } else if (result === 'exists') {
        this.generalError = 'Cet email est déjà utilisé. Essayez un autre email.';
      } else {
        this.generalError = 'Impossible de créer le compte. Réessayez plus tard.';
      }
    });
  }

  private validateInputs(): boolean {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.email) { this.emailError = 'Email est requis'; valid = false; }
    else if (!emailRegex.test(this.email)) { this.emailError = 'Format de email invalide'; valid = false; }

    if (!this.password) { this.passwordError = 'Password est requis'; valid = false; }
    else if (this.password.length < 8) { this.passwordError = 'Votre mot de passe doit faire minimum 8 caractères'; valid = false; }

    return valid;
  }
}
