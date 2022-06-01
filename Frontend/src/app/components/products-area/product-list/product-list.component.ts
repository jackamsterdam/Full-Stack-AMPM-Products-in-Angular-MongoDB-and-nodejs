import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
categories: CategoryModel[]
products: ProductModel[]

  constructor(private notify: NotifyService, private productsService: ProductsService) { }

  async ngOnInit(){
    try {
      this.categories = await this.productsService.getAllCategories()
    } catch (err: any) {
      this.notify.error(err)
    }
  }

  async getProducts(event: Event) {
    try {
      const categoryId = (event.target as HTMLSelectElement).value
      this.products = await this.productsService.getProductsByCategory(categoryId)
    } catch (err: any) {
      this.notify.error(err)
    }

  }

  async deleteThisProduct(_id: string) {
    try {
      const ok = confirm('Are you sure?')
      if (!ok) return 
      await this.productsService.deleteProduct(_id)
      this.notify.success('Product has been deleted')
      const indexToDelete = this.products.findIndex(p => p._id === _id)
      this.products.splice(indexToDelete, 1)
    } catch (err: any) {
      this.notify.error(err)
    }
  }

}
