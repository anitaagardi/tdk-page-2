import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFileApplicationListComponent } from './user-file-application-list.component';

describe('UserFileApplicationListComponent', () => {
  let component: UserFileApplicationListComponent;
  let fixture: ComponentFixture<UserFileApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFileApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFileApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
