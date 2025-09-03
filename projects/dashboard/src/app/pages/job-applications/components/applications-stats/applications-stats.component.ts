import { Component, computed, input, InputSignal, output, signal, WritableSignal } from '@angular/core';
import { JobApplication } from '../../models/job-application';
import { ApplicationStatOptions } from '../../models/application-stat-options';
import { StatOptions } from 'fs';
import { statKey } from '../../models/application-stat-key';

@Component({
  selector: 'app-applications-stats',
  imports: [],
  templateUrl: './applications-stats.component.html',
  styleUrl: './applications-stats.component.css'
})
export class ApplicationsStatsComponent {
  applications = input.required<JobApplication[]>();
  private activeTab = signal<statKey>('all');
  statChange = output<statKey>();
  onStatChange(): void {
    this.statChange.emit(this.activeTab());
  }
  stats = computed<ApplicationStatOptions[]>(() => {
    const activeTabValue = this.activeTab();
    return [
      {
        key: 'all',
        label: 'All Applications',
        active: activeTabValue === 'all'
      },
      {
        key: 'reviewed',
        label: 'Reviewed',
        active: activeTabValue === 'reviewed'
      },
      {
        key: 'unreviewered',
        label: 'Unreviewered',
        active: activeTabValue === 'unreviewered'
      }
    ];
  });
  getButtonClass(isActive: boolean): string {
    return `inline-flex  items-center font-bold cursor-pointer border-b-2 border-transparent px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive
      ? ' !border-[#242424] text-[#242424] '
      : 'text-[#999999] hover:text-[#242424]'
      }`;
  }
  onStatClick(key: statKey): void {
    this.activeTab.set(key);
    this.onStatChange();
  }
}
