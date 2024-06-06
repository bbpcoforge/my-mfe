import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppconfigService {
  constructor(private http: HttpClient) {}

  loadData(): Observable<any> {
    return this.http.get('assets/appSetting.json');
  }
}
