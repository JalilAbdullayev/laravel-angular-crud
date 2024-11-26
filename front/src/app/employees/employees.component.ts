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
  name: string | null = '';
  address: string | null = '';
  phone: string | null = '';
  id: number | null = null;
  updateMode: boolean = false;

  constructor(private http: HttpClient) {
    this.getEmployees();
  }

  getEmployees() {
    this.http.get<Employee[]>(this.url).subscribe((result: Employee[]) => {
      this.loading = false;
      this.employees = result;
    })
  }

  register() {
    let body = {
      name: this.name,
      address: this.address,
      phone: this.phone
    }
    this.http.post(this.url, body).subscribe(() => {
      this.getEmployees();
      this.name = '';
      this.address = '';
      this.phone = '';
    });
  }

  setUpdate(data: Employee) {
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone
    this.id = data.id;
  }

  update() {
    let body = {
      name: this.name,
      address: this.address,
      phone: this.phone
    }
    this.http.put(this.url + '/' + this.id, body).subscribe(() => {
      this.getEmployees();
      this.name = '';
      this.address = '';
      this.phone = '';
      this.id = null;
    })
  }

  save() {
    if (this.id) {
      this.update();
    } else {
      this.register();
    }
  }

  delete(id: number) {
    this.http.delete(this.url + '/' + id).subscribe(() => {
      this.getEmployees();
    })
  }
}
