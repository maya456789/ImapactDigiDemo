import { Component } from '@angular/core';
import { ApiService, IProduct } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {


  public products: IProduct[] = [];
  constructor(public api: ApiService, private castService: CartService) { }

  ngOnInit() {
  }

  addToCart(product: IProduct){
    this.castService.addProductSignal(product);
  }


}
