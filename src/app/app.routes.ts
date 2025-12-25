import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome';
import { HomeComponent } from './pages/home/home';
import { CatalogComponent } from './pages/catalog/catalog';
import { CartComponent } from './pages/cart/cart';
import { ProductDetailsComponent } from './pages/product-details/product-details';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
  { path: 'details', component: ProductDetailsComponent },
  { path: '**', redirectTo: '' }
];
