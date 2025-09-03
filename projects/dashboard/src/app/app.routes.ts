import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component';
import { JobApplicationsPageComponent } from './pages/job-applications/job-applications-page.component';
import { JobApplicationDetailsComponent } from './pages/job-applications/components/application-details/job-application-details.component';

export const routes: Routes = [
  {
    path: "", component: BlankLayoutComponent, children: [
      { path: "", redirectTo: "blogs", pathMatch: "full" },
      { path: 'blogs', component: BlogsPageComponent },
      { path: 'applications', component: JobApplicationsPageComponent },
      { path: 'applications/:id', component: JobApplicationDetailsComponent }
    ]
  }
];
