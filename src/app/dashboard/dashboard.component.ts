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
  selectedEmployee: { id: number, employeeName: string } = { id: 0, employeeName: '' };
  selectedMonth: string = '';
  selectedEmployeeName: string = '';
  Leaves: number = 0;
  dailySalary: number = 0;
  deductions: number = 0;
  netSalary: number = 0;
  showReportOptions: boolean = false;
  showReportGrid: boolean = false;
  months: string[] = [];
  reportData: any[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeServiceService
  ) {}

  isSidenavOpen: boolean = false;

  ngOnInit(): void {
   
    this.employeeService.getAllEmployees().subscribe(
      (data: any[]) => {
        this.employeeData = data;
      },
      error => {
        console.error('Error fetching employees:', error);
      }
    );

    this.employeeService.getMonths().subscribe(
      (months: string[]) => {
        this.months = months;
      },
      error => {
        console.error('Error fetching months:', error);
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

      history.replaceState('', '', '/login');
    }
  }

  generateReport() {
 
    if (this.selectedMonth && this.selectedEmployee.id) {
    
      this.employeeService.getSalaryData(this.selectedMonth, this.selectedEmployee.id).subscribe(
        (data: any[]) => {
          this.reportData = data;
          this.showReportGrid = true;
        },
        (error: any) => {
          console.error('Error fetching salary data:', error);
        }
      );
    }
  }
  
}  
