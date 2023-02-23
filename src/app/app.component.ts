import { Employee } from './employe';
import { EmployeeService } from './service/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  employeesData: Employee[] = [];
  title = 'EmployeeManager';
  deleteEmploye: Employee = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    employeCode: '',
    JobTitle: '',
    imageURl: '',
  };

  editEmploye: Employee = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    employeCode: '',
    JobTitle: '',
    imageURl: '',
  };

  constructor(private employeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployes();
  }
  public getEmployes(): void {
    this.employeService.getEmployee().subscribe(
      (response) => {
        this.employeesData = response;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  searchEmploye(key: string) {
    console.log(key);
    const result: Employee[] = [];
    for (const employee of this.employeesData) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.JobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        result.push(employee);
      }
      this.employeesData = result;
      if (result.length === 0 || !key) {
        this.getEmployes();
      }
    }
  }
  onAddEmployee(addForm: NgForm): void {
    console.log(addForm.value);
    document.getElementById('add-employee-form')?.click();

    this.employeService.addEmploye(addForm.value).subscribe(
      (reponse: Employee) => {
        console.log(reponse);
        this.getEmployes();
        addForm.reset();
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  onEditEmployee(employe: Employee): void {
    this.employeService.updateEmploye(employe).subscribe(
      (reponse: Employee) => {
        console.log(reponse);
        this.getEmployes();
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  onDeleteEmploye(employeId: number) {
    this.employeService.deleteEmploye(employeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployes();
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
  openModal(employee: Employee, mode: string) {
    console.log(mode);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.type = 'button';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmploye = employee;
      console.log(this.editEmploye);
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmploye = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
