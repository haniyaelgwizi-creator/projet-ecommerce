import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private API = 'http://localhost:3000/products';
  private selectedProduct: Product | null = null;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API);
  }

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  getSelectedProduct(): Product | null {
    return this.selectedProduct;
  }
}
