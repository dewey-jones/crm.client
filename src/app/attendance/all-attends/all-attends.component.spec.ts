import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttendsComponent } from './all-attends.component';

describe('AllAttendsComponent', () => {
  let component: AllAttendsComponent;
  let fixture: ComponentFixture<AllAttendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAttendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAttendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
