import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDeleteModalComponent } from './blog-delete-modal.component';

describe('BlogDeleteModalComponent', () => {
  let component: BlogDeleteModalComponent;
  let fixture: ComponentFixture<BlogDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
