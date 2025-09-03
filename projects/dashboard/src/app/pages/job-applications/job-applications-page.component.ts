import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ApplicationsStatsComponent } from "./components/applications-stats/applications-stats.component";
import { ApplicationsFiltersComponent } from "./components/applications-filters/applications-filters.component";
import { ApplicationsTableComponent } from "./components/applications-table/applications-table.component";
import { JobApplication } from './models/job-application';
import { FilterOptions } from './models/filter-options';
import { FormsModule } from '@angular/forms';
import { ApplicationStatOptions } from './models/application-stat-options';
import { statKey } from './models/application-stat-key';
import { JobApplicationService } from './services/job-application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-applications-page',
  imports: [ApplicationsStatsComponent, ApplicationsFiltersComponent, ApplicationsTableComponent, FormsModule],
  templateUrl: './job-applications-page.component.html',
  styleUrl: './job-applications-page.component.css'
})
export class JobApplicationsPageComponent implements OnInit {
  private readonly _Router = inject(Router)
  private readonly _JobApplicationService = inject(JobApplicationService);
  applications = signal<JobApplication[]>([]);
  searchText = signal<string>("");
  currentFilters = signal<FilterOptions>({
    industry: '',
    yearsOfExperience: '',
    englishLevel: ''
  });
  currentStat = signal<statKey>("all");

  filteredApplications = computed<JobApplication[]>(() => {
    const apps = this.applications();
    const filters = this.currentFilters();
    return apps.filter(app => {
      // industry filter
      if (filters.industry && app.industry.toLowerCase() !== filters.industry.toLowerCase()) {
        return false;
      }

      // years of experience filter
      if (filters.yearsOfExperience) {
        if (filters.yearsOfExperience.includes("-")) {
          const [min, max] = filters.yearsOfExperience.split("-").map(Number);
          if (app.yearsOfExperience < min || app.yearsOfExperience > max) {
            return false;
          }
        } else if (filters.yearsOfExperience.includes("+")) {
          const min = parseInt(filters.yearsOfExperience, 10);
          if (app.yearsOfExperience < min) {
            return false;
          }
        } else {
          console.warn("Invalid yearsOfExperience format. Expected '-' or '+'");
          return false;
        }
      }

      // englishLevel filter
      if (filters.englishLevel && app.englishLevel.toLowerCase() !== filters.englishLevel.toLowerCase()) {
        return false;
      }

      if (this.currentStat() !== "all") {
        console.log(this.currentStat());
        if (this.currentStat() !== app.status) return false;
      }

      return true;
    });
  });

  ngOnInit() {
    this.loadApplications();
  }
  private loadApplications() {
    this.applications.set(this._JobApplicationService.getApplications());
  }
  onFiltersChange(filters: FilterOptions) {
    this.currentFilters.set(filters);
  }
  onStatChange(stat: statKey): void {
    this.currentStat.set(stat);
  }
  onActionClick(id: string) {
    console.log('Action clicked:', event);
    this._Router.navigate(['applications', id])
  }
}
