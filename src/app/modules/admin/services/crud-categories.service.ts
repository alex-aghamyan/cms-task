import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentReference,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Category } from 'src/app/core/models/category.model';
import { GetCategoriesService } from 'src/app/core/services/get-categories.service';

@Injectable()
export class CrudCategoriesService extends GetCategoriesService {
  constructor(firestore: Firestore) {
    super(firestore);
  }

  createCategory(category: Category) {
    addDoc<Category>(this.collectionRef, category);
  }

  updateCategory(categoryID: string, category: Category) {
    const categoryRef: DocumentReference<any> = doc(
      this.firestore,
      `categories/${categoryID}`
    );
    updateDoc<Category>(categoryRef, category);
  }

  deleteCategory(categoryID: string) {
    const categoryRef: DocumentReference = doc(
      this.firestore,
      `categories/${categoryID}`
    );
    deleteDoc(categoryRef);
  }
}
