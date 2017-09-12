import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAdminService } from '../adminShared/product-admin.service';
import { Product } from '../adminShared/product';


@Component({
    selector: 'product-menu',
    templateUrl:'./product-add.component.html'
})

export class ProductAddComponent {
    imgTitle: string;
    imgSRC: string;
    name: string;
    price: number;
    description: string;
    product: Product;


    constructor( private productAdminSVC: ProductAdminService, private router: Router ) {}

    fileLoad($event: any) {
        let myReader: FileReader = new FileReader();
        let file: File = $event.target.files[0];
        this.imgTitle = file.name;
        console.log(file.name);
        myReader.readAsDataURL(file);
        
        myReader.onload = (e: any) => {
            this.imgSRC = e.target.result;
            
        }
    }

    createProduct() {
        console.log("from create product");
        console.log(this.imgSRC);
        this.product = new Product(this.name, this.description, this.imgTitle, this.imgSRC,this.price);
        this.productAdminSVC.createProduct(this.product);
        alert(`${this.name} added to products`);
            this.router.navigate(['/admin']);
    }


    cancel() {
        this.router.navigate(['/admin']);
    }

}