import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorTDKSectionCreateComponent } from './administrator-tdksection-create.component';

describe('AdministratorTDKSectionCreateComponent', () => {
  let component: AdministratorTDKSectionCreateComponent;
  let fixture: ComponentFixture<AdministratorTDKSectionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorTDKSectionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorTDKSectionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
