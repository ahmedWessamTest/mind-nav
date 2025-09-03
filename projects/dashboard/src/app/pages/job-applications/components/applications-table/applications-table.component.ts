import { Component, input, output, SimpleChanges } from '@angular/core';
import { JobApplication } from '../../models/job-application';
import { SearchPipe } from '../../../../shared/pipes/search.pipe';
import { RouterLink } from "../../../../../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-applications-table',
  imports: [SearchPipe],
  templateUrl: './applications-table.component.html',
  styleUrl: './applications-table.component.css'
})
export class ApplicationsTableComponent {
  applications = input<JobApplication[]>([]);
  searchText = input<string>('');
  actionClick = output<string>();
  headers = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'currentJobTitle', label: 'Current Job Title' },
    { key: 'yearsOfExperience', label: 'Years of Experience' },
    { key: 'nationality', label: 'Nationality' },
    { key: 'submissionCode', label: 'Submission Code' },
    { key: 'actions', label: 'Action' }
  ]
  onActionClick(id: string): void {
    this.actionClick.emit(id);
  }
}
