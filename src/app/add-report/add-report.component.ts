import { Component, Input  } from '@angular/core';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.css']
})
export class AddReportComponent {

  @Input() selectedMonth!: string;
  @Input() selectedEmployee!: { id: number, firstName: string };

  showAddReportGrid: boolean = false;
  newSalaryRecordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeServiceService) {
    // Initialize the form in the constructor
    this.newSalaryRecordForm = this.formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      salaryMonth: ['', Validators.required],
      salary: [0, Validators.required],
      leaves: [0, Validators.required],
      deductions: [0, Validators.required],
      netPay: [0, Validators.required],
    });
  }

  openAddReportGrid() {
    this.showAddReportGrid = true;
  }

  addSalaryRecord() {
    // Additional validation logic if needed
    if (this.newSalaryRecordForm.valid && this.selectedMonth && this.selectedEmployee.id) {
      // Set other properties for the new salary record
      const newSalaryRecord = {
        ...this.newSalaryRecordForm.value,
        name: this.selectedEmployee.firstName,
        salaryMonth: this.selectedMonth,
        employeeId: this.selectedEmployee.id
      };

      // Call the service to add the salary record
      this.employeeService.addSalaryRecord(newSalaryRecord).subscribe(
        (response) => {
          console.log('Salary record added successfully', response);
          // You may want to refresh the report data or update the UI accordingly
          // Close the add report grid after successful submission
          this.showAddReportGrid = false;
        },
        (error) => {
          console.error('Failed to add salary record', error);
        });
    }
  }
}
