import { Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  DocumentReference,
  Firestore,
  collectionSnapshots,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root',
})
export class GetNewsService {
  protected collectionRef: CollectionReference<any> = collection(
    this.firestore,
    'news'
  );

  constructor(protected firestore: Firestore) {}

  getNews(): Observable<News[]> {
    return collectionSnapshots<News>(this.collectionRef).pipe(
      map((allNews) => {
        return allNews.map((news) => {
          let id = news.id;
          let newsData = news.data();
          return { id, ...newsData };
        });
      })
    );
  }

  getNewsById(id: string): Observable<News> {
    const docRef: DocumentReference<any> = doc(this.firestore, `news/${id}`);

    return docData<News>(docRef);
  }
}
