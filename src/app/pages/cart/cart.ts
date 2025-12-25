import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Product } from '../../models/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {

  cart: CartItem[] = [];
  successMessage: string = '';

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();

    if (this.cartService.addedSuccessfully) {
      this.successMessage = 'Produit ajouté avec succès !';
      setTimeout(() => {
        this.successMessage = '';
        this.cartService.clearSuccess();
      }, 3000);
    }
  }

  add(p: Product): void {
    this.cartService.add(p);
    this.cart = this.cartService.getCart();
  }

  decrease(id: string): void {
    this.cartService.decrease(id);
    this.cart = this.cartService.getCart();
  }

  remove(id: string): void {
    this.cartService.remove(id);
    this.cart = this.cartService.getCart();
  }

  clear(): void {
    this.cartService.clear();
    this.cart = [];
    this.successMessage = 'Panier vidé 😆';
    setTimeout(() => this.successMessage = '', 3000);
  }

  getTotal(): number {
    return this.cartService.total();
  }
}
