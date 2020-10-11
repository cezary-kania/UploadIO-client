import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStep3Component } from './upload-step3.component';

describe('UploadStep3Component', () => {
  let component: UploadStep3Component;
  let fixture: ComponentFixture<UploadStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
