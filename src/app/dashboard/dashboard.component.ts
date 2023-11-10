import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RecordServiceService } from '../Services/record-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  employeeData: any[] = [];
  selectedEmployee: number = 0;
  selectedMonth: string = '';
  selectedEmployeeName: string = '';
  Leaves: number = 0;
  dailySalary: number = 0;
  deductions: number = 0;
  netSalary: number = 0;
  recordData: any[] = [];

  showReportOptions: boolean = false;
  showRecordOptions: boolean = false;
  showReportGrid: boolean = false;
  showRecordGrid: boolean = false;

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private router: Router, private recordService: RecordServiceService) {}

  isSidenavOpen: boolean = false;

  ngOnInit(): void {
    this.recordService.getAllRecords().subscribe((data: Object) => {
      this.employeeData = data as any[];
      console.log(this.employeeData);
    });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout() {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      this.router.navigate(['/login']);
    }
  }

  generateReport() {
    if (this.selectedMonth && this.selectedEmployee) {
      this.selectedEmployeeName = this.employeeData.find(employee => employee.id === this.selectedEmployee)?.employeeName || '';
      this.dailySalary = 300; 
      this.Leaves = 0; 
      this.deductions = this.Leaves * this.dailySalary;
      this.netSalary = 30000 - this.dailySalary - this.deductions; 
      this.showReportGrid = true;
    }
  }
}
