import {Component} from '@angular/core';
import {Employee} from '../models/employee';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'employees',
  standalone: true,
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})

export class EmployeesComponent {
  employees: Employee[] = [];
  loading: boolean = true;
  url: string = 'http://localhost:8000/api/employees';

  constructor(private http: HttpClient) {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get<Employee[]>(this.url).subscribe((result: Employee[]) => {
      this.loading = false;
      this.employees = result;
    })
  }
}
