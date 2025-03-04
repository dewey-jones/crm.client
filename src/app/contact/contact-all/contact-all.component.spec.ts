import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAllComponent } from './contact-all.component';

describe('ContactAllComponent', () => {
  let component: ContactAllComponent;
  let fixture: ComponentFixture<ContactAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
