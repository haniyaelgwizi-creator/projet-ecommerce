import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class CartService {

  private cart: CartItem[] = [];
  addedSuccessfully = false; // ⭐ FLAG confirmation

  getCart(): CartItem[] {
    return this.cart;
  }

  add(product: Product, quantity: number = 1) {
    const item = this.cart.find(i => i.product.id === product.id);

    if (item) {
      // Vérifie si on dépasse le stock
      if (item.quantity + quantity > product.stock) {
        item.quantity = product.stock; // limite au stock
        alert(`Quantité maximale disponible pour "${product.name}" : ${product.stock}`);
      } else {
        item.quantity += quantity;
      }
    } else {
      if (quantity > product.stock) {
        quantity = product.stock;
        alert(`Quantité maximale disponible pour "${product.name}" : ${product.stock}`);
      }
      this.cart.push({ product, quantity });
    }

    this.addedSuccessfully = true; // ✅ confirmation
  }

  decrease(id: string) {
    const item = this.cart.find(i => i.product.id === id);
    if (item) {
      item.quantity--;
      if (item.quantity === 0) {
        this.remove(id);
      }
    }
  }

  remove(id: string) {
    this.cart = this.cart.filter(i => i.product.id !== id);
  }

  clear() {
    this.cart = [];
  }

  clearSuccess() {
    this.addedSuccessfully = false;
  }

  total(): number {
    return this.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
