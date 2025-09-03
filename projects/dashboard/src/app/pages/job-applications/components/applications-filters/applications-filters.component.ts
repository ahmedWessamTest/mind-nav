import { Component, computed, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterOptions } from '../../models/filter-options';

@Component({
  selector: 'app-applications-filters',
  imports: [FormsModule],
  templateUrl: './applications-filters.component.html',
  styleUrl: './applications-filters.component.css'
})
export class ApplicationsFiltersComponent {
  currentFilters = input<FilterOptions>({
    industry: '',
    yearsOfExperience: '',
    englishLevel: ''
  });
  filtersChange = output<FilterOptions>();
  filters = computed<FilterOptions>(() => this.currentFilters());
  onFilterChange() {
    this.filtersChange.emit({ ...this.filters() });
  }
}
