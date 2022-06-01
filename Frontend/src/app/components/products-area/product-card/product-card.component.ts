import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input()
  product: ProductModel

  @Output()
  deleteMe = new EventEmitter<string>()


  deleteProduct(_id: string) {
   this.deleteMe.emit(_id)
  }

}
