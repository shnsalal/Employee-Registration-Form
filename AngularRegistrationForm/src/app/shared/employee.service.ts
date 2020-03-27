import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  formData: Employee;
  list: Employee[];

  readonly webApiUrl = 'https://localhost:44316/api/employees/';
  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    ID: new FormControl(null),
    EmpName: new FormControl('', [ Validators.required, Validators.pattern('^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+[\'-]?)+$')]),
    EmpCity: new FormControl('', [ Validators.required, Validators.pattern('^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+[\'-]?)+$')]),
    EmpMobile: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]+')])
  });

  resetEmptyFormGroup() {
    this.form.setValue ({
      ID: null,
      EmpName: '',
      EmpCity: '',
      EmpMobile: ''
    });
  }

  postEmployee(formData: Employee) {
    return this.http.post(this.webApiUrl, {
      EmpName: formData.EmpName,
      EmpCity: formData.EmpCity,
      EmpMobile: formData.EmpMobile
    });
  }

  getEmployee() {
    this.http.get(this.webApiUrl)
    .toPromise().then(res => this.list = res as Employee[]);
  }

  putEmployee(formData: Employee) {
    return this.http.put(this.webApiUrl + formData.ID, formData);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.webApiUrl + id);
  }

  populateForm(formData: Employee) {
    this.form.setValue({
     ID: formData.ID,
     EmpName: formData.EmpName,
     EmpCity: formData.EmpCity,
     EmpMobile: formData.EmpMobile
    });
  }

}
