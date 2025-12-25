import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class CatalogComponent implements OnInit {

  products: Product[] = [];
  filtered: Product[] = [];
  activeCategory = 'all';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filtered = products;
      },
      error: (err) => {
        console.error('Erreur produits', err);
      }
    });
  }

  filter(category: string): void {
    this.activeCategory = category;
    this.filtered =
      category === 'all'
        ? this.products
        : this.products.filter(p => p.category === category);
  }

  details(product: Product): void {
    this.productService.setSelectedProduct(product);
    this.router.navigate(['/details']);
  }
}
