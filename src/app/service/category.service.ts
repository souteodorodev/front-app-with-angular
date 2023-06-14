import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api_config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = API_CONFIG.urlApi;

  constructor(private http: HttpClient) { }
  
  save(category: Category) : Observable<Category[]>{
    return this.http.post<Category[]>(this.url+'/category/create', category);
  }
  
  list() : Observable<Category[]> {
    return this.http.get<Category[]>(this.url+'/category/list');
  }

  delete(idCategory: any) : Observable<Category[]> {
    return this.http.delete<any>(`${this.url}/category/delete/${idCategory}`);
  }

  update(category: Category): Observable<Category[]> {
    return this.http.put<Category[]>(this.url+'/update/${category.idCategory}', category);
  }  
  
  findById(idCategory: any) : Observable<Category[]> {
    return this.http.get<any>(`${this.url}/category/findCategory/${idCategory}`);
  }
}