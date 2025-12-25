import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from '../catalog/catalog';
import { HeaderComponent } from '../../header/header'; // ✅ chemin exact

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CatalogComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {}
