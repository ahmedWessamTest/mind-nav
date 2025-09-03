import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { JobApplicationService } from '../../services/job-application.service';
import { JobApplicationDetails } from '../../models/job-application-details';

@Component({
  selector: 'app-application-details',
  templateUrl: './job-application-details.component.html',
  styleUrl: './job-application-details.component.css'
})
export class JobApplicationDetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _JobApplicationService = inject(JobApplicationService);
  application: JobApplicationDetails | null = null;
  id = toSignal(this._ActivatedRoute.paramMap.pipe(
    map(params => params.get('id'))
  ));

  ngOnInit(): void {
    console.log(this.id());
    this.application = this._JobApplicationService.getUserDetails(this.id());
  }
  ngOnDestroy(): void {
    this.application = null;
  }
}
