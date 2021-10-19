import { Injectable } from '@angular/core';
import {
  Firestore,
  DocumentReference,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { News } from 'src/app/core/models/news.model';
import { GetNewsService } from 'src/app/core/services/get-news.service';

@Injectable()
export class CrudNewsService extends GetNewsService {
  constructor(firestore: Firestore) {
    super(firestore);
  }

  createNews(news: News) {
    addDoc<News>(this.collectionRef, news);
  }

  updateNews(newsID: string, news: News) {
    const newsRef: DocumentReference<any> = doc(
      this.firestore,
      `news/${newsID}`
    );
    updateDoc<News>(newsRef, news);
  }

  deleteNews(newsID: string) {
    const newsRef: DocumentReference = doc(this.firestore, `news/${newsID}`);
    deleteDoc(newsRef);
  }
}
