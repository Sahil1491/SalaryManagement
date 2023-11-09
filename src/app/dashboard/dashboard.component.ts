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
  selectedMonth: string = '';
  selectedEmployee: number = 0;
  selectedEmployeeName: string = '';
  Leaves: number = 0;
  dailySalary: number = 0;
  deductions: number = 0;
  netSalary: number = 0;

  showReportOptions: boolean = false;
  showRecordOptions: boolean = false;
  showReportGrid: boolean = false;
  showRecordGrid: boolean = false;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  recordData: any[] = [];
 
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
    // Fetching the daily salary and deductions from your data or perform calculations
    // For example, fetching hardcoded values for demonstration purposes
    this.selectedEmployeeName = this.employeeData.find(employee => employee.id === this.selectedEmployee)?.employeeName || '';
    this.dailySalary = 100; // Example daily salary value
    this.Leaves = 1; // Example leave taken (you can change this as needed)

    this.deductions = this.Leaves * this.dailySalary; // Deduction for leave taken
    this.netSalary = this.dailySalary - this.deductions; // Net salary after deductions

    this.showReportGrid = true;
  }

  showRecordsGrid() {
    // Fetch or perform logic to display records
    // Assigning example data for demonstration purposes
    this.recordData = [
      { id: 1, name: 'John Doe', role: 'Manager', month: 'January', salary: 5000 },
      { id: 2, name: 'Jane Smith', role: 'Developer', month: 'January', salary: 4500 },
      // Add more records or fetch from a service
    ];

    this.showReportOptions = false;
    this.showRecordOptions = true;
    this.showRecordGrid = true;
  }
}
