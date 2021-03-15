import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorTDKSectionListComponent } from './administrator-tdksection-list.component';

describe('AdministratorTDKSectionListComponent', () => {
  let component: AdministratorTDKSectionListComponent;
  let fixture: ComponentFixture<AdministratorTDKSectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorTDKSectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorTDKSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
