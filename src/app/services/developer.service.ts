
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developer } from '../Models/developer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDevelopers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/developers/get`);
  }

  submitForm(formData: Developer): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/developers/save`, formData);
  }
}
