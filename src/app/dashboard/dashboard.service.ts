import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _http: HttpClient) {}

  getInventoryItems(): Observable<any> {
    return forkJoin([
      this._http.get('/api/v1/products/all'),
      this._http.get('/api/v1/products/recommendation'),
    ]);
  }
// getInventoryItemss(): Observable<any> {
//     console.log('register user: ');
//     //  return this._http.post('', registerPayload);
//     const dummyResponse = new Array(100);
//     for (let i = 0; i < 100; i++) {
//       dummyResponse[i] = {
//         id: i + 1,
//         name: 'The best book',
//         by: 'Cora Mack',
//         ratings: '4/5',
//         category: 'book',
//         cover_url: 'https://itbook.store/img/books/9781491954249.png',
//         thumbnail_image: 'https://itbook.store/img/books/9781491954249.png',
//       };
//     }
//     console.log('********8', dummyResponse);
//     return of(dummyResponse).pipe(delay(1000));
//   }
}
