import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCoverUploadComponent } from './blog-cover-upload.component';

describe('BlogCoverUploadComponent', () => {
  let component: BlogCoverUploadComponent;
  let fixture: ComponentFixture<BlogCoverUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCoverUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCoverUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
