import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAllComponent } from './company-all.component';

describe('CompanyAllComponent', () => {
  let component: CompanyAllComponent;
  let fixture: ComponentFixture<CompanyAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
