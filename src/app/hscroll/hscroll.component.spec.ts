import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscrollComponent } from './hscroll.component';

describe('HscrollComponent', () => {
  let component: HscrollComponent;
  let fixture: ComponentFixture<HscrollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HscrollComponent]
    });
    fixture = TestBed.createComponent(HscrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
