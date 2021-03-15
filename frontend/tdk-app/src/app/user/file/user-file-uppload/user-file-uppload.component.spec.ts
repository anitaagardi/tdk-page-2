import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFileUpploadComponent } from './user-file-uppload.component';

describe('UserFileUpploadComponent', () => {
  let component: UserFileUpploadComponent;
  let fixture: ComponentFixture<UserFileUpploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFileUpploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFileUpploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
