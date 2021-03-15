import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorFileListsComponent } from './administrator-file-lists.component';

describe('AdministratorFileListsComponent', () => {
  let component: AdministratorFileListsComponent;
  let fixture: ComponentFixture<AdministratorFileListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdministratorFileListsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorFileListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
