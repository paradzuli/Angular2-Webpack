import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Product } from '../adminShared/product';

@Injectable()

export class ProductAdminService {

    createProduct(product: Product) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`product_images/${product.imgTitle}`)
            .putString(product.img.substring(22), 'base64')
            .then((snapshot) => {
                console.log("SNAPSHOT");
                let url = snapshot.metadata.downloadURLs[0];
                let dbRef = firebase.database().ref('products/');
                console.log(url + "File URL");
                let newProduct = dbRef.push();
                console.log("key" + newProduct.key);
                newProduct.set({
                    name: product.name,
                    description: product.description,
                    imgTitle: product.imgTitle,
                    img: url,
                    id: newProduct.key,
                    price: product.price
                });
            })
            .catch((error) => {
                console.log("error failed upload");
                alert(`failed upload: ${error}`);
            });
    }

    editProduct(update: Product) {
        let dbRef = firebase.database()
            .ref('products/')
            .child(update.id)
            .update({
                name: update.name,
                desc: update.description,
                price:update.price
            });
        alert('product updated');
    }

    removeProduct(deleteProduct: Product) {
        let dbRef = firebase.database().ref('products/').child(deleteProduct.id).remove();
        alert('product deleted');
        let imageRef = firebase.storage().ref().child(`images/${deleteProduct.imgTitle}`)
            .delete()
            .then(function() {
                alert(`${deleteProduct.imgTitle} was deleted from Storage`);
            })
            .catch(function(error) {
                alert(`Error - Unable to delete ${deleteProduct.imgTitle}`);
            });
    }
    
}