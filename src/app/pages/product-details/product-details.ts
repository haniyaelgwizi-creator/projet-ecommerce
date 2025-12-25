import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const selected = this.productService.getSelectedProduct();

    if (!selected) {
      this.router.navigate(['/home']);
      return;
    }

    this.product = selected;
  }

  increase(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decrease(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  total(): number {
    return this.quantity * this.product.price;
  }

  addToCart(): void {
    this.cart.add(this.product, this.quantity);
    this.router.navigate(['/cart']);
  }

  back(): void {
    this.router.navigate(['/home']);
  }
}
