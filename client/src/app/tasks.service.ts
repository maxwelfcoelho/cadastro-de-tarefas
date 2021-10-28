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

  getTask(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/task/${id}`);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/task/delete/${id}`);
  }

  completeTask(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/task/completed/${id}`, {});
  }

  editTask(id: string, name: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/task/update/`, {id, name});
  }

  createTask(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/task/create`, {name});
  }
}
