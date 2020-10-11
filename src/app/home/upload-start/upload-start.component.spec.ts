import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStartComponent } from './upload-start.component';

describe('UploadStartComponent', () => {
  let component: UploadStartComponent;
  let fixture: ComponentFixture<UploadStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
