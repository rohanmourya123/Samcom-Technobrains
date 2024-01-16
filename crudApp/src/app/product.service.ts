import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3004/Products';

  constructor(private http:HttpClient) { }

  // get data from api 
    
  getData():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  // post data 
  createProduct(product:any):Observable<any>{
    return this.http.post(this.apiUrl,product);
  }

  // update data
  updateProduct(id:number,product:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`,product);
  }

  // delete data 
  deleteProduct(id:number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
 

}
