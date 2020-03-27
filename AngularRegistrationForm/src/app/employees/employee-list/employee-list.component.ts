import { Component, OnInit, ViewChild} from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeeComponent } from '../employee/employee.component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
 public p: any;
 res: any;
 list: Employee[];
 dataList: MatTableDataSource<any>;
 displayColumns: string[] = ['ID', 'EmpName', 'EmpCity', 'EmpMobile', 'action'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
 searchKey: string;
 order: any = 'ID';

  constructor(
    private http: HttpClient,
    public service: EmployeeService,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit() {
   this.refreshList();
  }

  refreshList() {
      this.http.get(this.service.webApiUrl).subscribe(res => {
      this.dataList = new MatTableDataSource(res as Employee[]);
      this.dataList.sort = this.sort;
      this.dataList.paginator =  this.paginator;
      // this.dataList.filterPredicate = (data, filter) => {
      //   return this.displayColumns.some(ele => {
      //     return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
      //   });
      // };
      });
  }

//   refreshList() {
//     this.service.getEmployee().subscribe(res => {
//     this.dataList = new MatTableDataSource(res as Employee[]);
//     this.dataList.sort = this.sort;
//     this.dataList.paginator =  this.paginator;
//     });
// }

  onSearchKey() {
    this.searchKey = '';
    this.applyFilter();
  }

  onSearchClear() {
    this.searchKey = '';
  }

  applyFilter() {
    this.dataList.filter = this.searchKey.trim().toLocaleLowerCase();
  }

  onRegister() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '65%';
    this.dialog.open(EmployeeComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
    this.refreshList();
    });
  }

  onEdit(emp: Employee) {
    this.service.populateForm(emp);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    this.dialog.open(EmployeeComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
     this.refreshList();
      });
  }

  onDelete(ID: number) {
      if (confirm('Are you sure to delete this record?')) {
       this.service.deleteEmployee(ID).subscribe(res => {
          this.toastr.warning('Deleted Successfully', 'Employee Record');
          this.refreshList();
        });
      }
    }
}
