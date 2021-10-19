import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentReference,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  collection,
  collectionSnapshots,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product.model';

@Injectable()
export class CrudProductsService {
  private collectionRef: CollectionReference<any> = collection(
    this.firestore,
    'products'
  );

  constructor(private firestore: Firestore) {}

  createProduct(product: Product) {
    addDoc<Product>(this.collectionRef, product);
  }

  readProducts(): Observable<Product[]> {
    return collectionSnapshots<Product>(this.collectionRef).pipe(
      map((products) => {
        return products.map((product) => {
          let id = product.id;
          let productData = product.data();
          return { id, ...productData };
        });
      })
    );
  }

  updateProduct(productID: string, product: Product) {
    const productRef: DocumentReference<any> = doc(
      this.firestore,
      `products/${productID}`
    );
    updateDoc<Product>(productRef, product);
  }

  deleteProduct(productID: string) {
    const productRef: DocumentReference = doc(
      this.firestore,
      `products/${productID}`
    );
    deleteDoc(productRef);
  }
}
