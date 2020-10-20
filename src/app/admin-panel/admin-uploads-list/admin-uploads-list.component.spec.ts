import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUploadsListComponent } from './admin-uploads-list.component';

describe('AdminUploadsListComponent', () => {
  let component: AdminUploadsListComponent;
  let fixture: ComponentFixture<AdminUploadsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUploadsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUploadsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
