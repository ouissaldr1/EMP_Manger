import { environement } from './../environement/environement';
import { Employee } from './../employe';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = environement.apiBaseUrl;
  constructor(private http: HttpClient) {}

  public getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/all`);
  }
  public getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`);
  }
  public addEmploye(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/add`, employee);
  }
  public updateEmploye(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/update`, employee);
  }
  public deleteEmploye(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${employeeId}`);
  }
}
