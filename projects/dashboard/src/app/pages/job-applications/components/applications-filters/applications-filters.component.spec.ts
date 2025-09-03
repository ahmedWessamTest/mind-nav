import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsFiltersComponent } from './applications-filters.component';

describe('ApplicationsFiltersComponent', () => {
  let component: ApplicationsFiltersComponent;
  let fixture: ComponentFixture<ApplicationsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
