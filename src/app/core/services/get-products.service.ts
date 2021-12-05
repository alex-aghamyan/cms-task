import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  DocumentReference,
  Firestore,
  collectionSnapshots,
  query,
  where,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class GetProductsService {
  private collectionRef: CollectionReference<any> = collection(
    this.firestore,
    'products'
  );

  constructor(protected firestore: Firestore) {}

  getProductsByCategory(categoryID: string): Observable<Product[]> {
    const productQuery = query(
      this.collectionRef,
      where('categoryID', '==', categoryID)
    );

    return collectionSnapshots<Product>(productQuery).pipe(
      map((products) => {
        return products.map((product) => {
          let id = product.id;
          let productData = product.data();
          return { ...productData, id };
        });
      })
    );
  }

  getProductsById(id: string): Observable<Product> {
    const docRef: DocumentReference<any> = doc(
      this.firestore,
      `products/${id}`
    );

    return docData(docRef);
  }
}
