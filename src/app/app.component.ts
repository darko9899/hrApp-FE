import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  [x: string]: any;


  isAddEmployeeAllowed: boolean = true;
  isProjectsAllowed: boolean = true;
  isTeamsAllowed: boolean = true;
  isLogoutAllowed: boolean = true;
  
  public editEmployee?: Employee;
  public deleteEmployee?: Employee;
  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService){}

  ngOnInit() {  
    this.resetFlags();
  }

  resetFlags(): void {
    this.isAddEmployeeAllowed = true;
    this.isProjectsAllowed = true;
    this.isTeamsAllowed = true;
    this.isLogoutAllowed = true;
  
  }

  setAddEmployeeFlag(flag: boolean): void {
    this.isAddEmployeeAllowed = flag;
  }

  setProjectsFlag(flag: boolean): void {
    this.isProjectsAllowed = flag;
  }

  setTeamsFlag(flag: boolean): void {
    this.isTeamsAllowed = flag;
  }

  setLogoutFlag(flag: boolean): void {
    this.isLogoutAllowed = flag;
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
