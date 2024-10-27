import { computed, Injectable, signal } from '@angular/core';
import { ApiService, IProduct } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<IProduct[]>([]);
  public subTotal=computed(() => this.cartItems().reduce((prev:any,curr:any) => {
    return prev + curr.price;
  }, 0));
  public totalItems=computed(() => this.cartItems().length);

  constructor(private api: ApiService) {
    
  }

  addProductSignal(product: IProduct) {
    this.cartItems.update((val) => {
      return [...val, product]
    });
    this.api.products()?.forEach(a => {
      if (a.id === product.id) {
        a.rating.count = a.rating.count - 1;
      }
    })
  }

  removeProductSignal(id: number) {
    console.log("Removed id is",id,this.cartItems());
    this.cartItems.update(val => {
      const product = val.splice(id, 1);
      this.api.products()?.forEach(a => {
        if (a.id === product[0].id) {
          a.rating.count = a.rating.count + 1;
        }
      });
      return val;
    });
    console.log("Cart length is:",this.cartItems().length);
    this. totalItems=computed(() => this.cartItems().length);
    this.subTotal=computed(() => this.cartItems().reduce((prev:any,curr:any) => {
      return prev + curr.price;
    }, 0));
  }
}
