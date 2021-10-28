import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks`);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/task/delete/${id}`);
  }

  completeTask(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/task/completed/${id}`, {});
  }

  createTask(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/task/create`, {name});
  }
}
