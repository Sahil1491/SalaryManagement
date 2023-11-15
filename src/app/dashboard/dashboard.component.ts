import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { EmployeeServiceService } from '../Services/employee-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  employeeData: any[] = [];
  showRecordOptions: boolean = false;
  selectedEmployee: { id: number, firstName: string } = { id: 0, firstName: '' };
  selectedMonth: string = '';
  selectedEmployeeName: string = '';
  Leaves: number = 0;
  dailySalary: number = 0;
  deductions: number = 0;
  netSalary: number = 0;
  showReportOptions: boolean = false;
  showReportGrid: boolean = false;
  months: string[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeServiceService
  ) {}

  isSidenavOpen: boolean = false;

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(
      (data: any[]) => {
        this.employeeData = data;
        console.log(this.employeeData);
      },
      error => {
        console.error('Error fetching employees:', error);
        // Handle error in a way suitable for your application
      }
    );

    this.employeeService.getMonths().subscribe(
      (months: string[]) => {
        this.months = months;
        console.log(this.months);
      },
      error => {
        console.error('Error fetching months:', error);
        // Handle error in a way suitable for your application
      }
    );
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
    if (this.selectedMonth && this.selectedEmployee.id) {
      this.selectedEmployeeName = this.employeeData.find(employee => employee.id === this.selectedEmployee.id)?.firstName || '';
      this.dailySalary = 300;
      this.Leaves = 0;
      this.deductions = this.Leaves * this.dailySalary;
      this.netSalary = 30000 - this.dailySalary - this.deductions;
      this.showReportGrid = true;
    }
  }
}
