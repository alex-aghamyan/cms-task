import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  Firestore,
  collectionSnapshots,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class GetCategoriesService {
  protected collectionRef: CollectionReference<any> = collection(
    this.firestore,
    'categories'
  );

  constructor(protected firestore: Firestore) {}

  getCategories(): Observable<Category[]> {
    return collectionSnapshots<Category>(this.collectionRef).pipe(
      map((categories) => {
        return categories.map((category) => {
          let id = category.id;
          let categoryData = category.data();
          return { ...categoryData, id };
        });
      })
    );
  }
}
