import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

 constructor(public service: EmployeeService,
             private toastr: ToastrService,
             public dialogRef: MatDialogRef<EmployeeComponent>,
             private http: HttpClient) { }


  ngOnInit() {
  }

  onClear() {
    this.service.form.reset();
    this.service.resetEmptyFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('ID').value) {
        this.service.postEmployee(this.service.form.value).subscribe(res => {
          this.toastr.success('Inserted Successfully', 'Employee Record');
          this.service.form.reset();
          this.service.resetEmptyFormGroup();
          this.onClose();
        });
      } else {
        this.service.putEmployee(this.service.form.value).subscribe(res => {
          this.toastr.success('Updated Successfully', 'Employee Record');
          this.service.form.reset();
          this.service.resetEmptyFormGroup();
          this.onClose();
        });
      }
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.resetEmptyFormGroup();
    this.dialogRef.close();
  }
}
