import { ProductsService } from './../../../services/products.service';
import { NotifyService } from './../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  categories: CategoryModel[]
  product = new ProductModel() // for 2 way binding

  constructor(private notify: NotifyService, private productsService: ProductsService, private router: Router) { }

  async ngOnInit() {
    try {
      this.categories = await this.productsService.getAllCategories()
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async addForm() {
    try {
      await this.productsService.addproduct(this.product)
      this.notify.success('Product has been added')
      this.router.navigateByUrl('/product-list')
    } catch (err: any) {
      this.notify.error(err)
    }
  }

}
