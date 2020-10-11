import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStep2Component } from './upload-step2.component';

describe('UploadStep2Component', () => {
  let component: UploadStep2Component;
  let fixture: ComponentFixture<UploadStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
