import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  fileUrl: string;
  createdAt: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8081/api/v1/employees';

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.api);
  }

  add(name: string): Observable<Employee> {
    return this.http.post<Employee>(this.api, { name });
  }

  update(id: number, name: string): Observable<Employee> {
    return this.http.put<Employee>(`${this.api}/${id}`, { name });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
