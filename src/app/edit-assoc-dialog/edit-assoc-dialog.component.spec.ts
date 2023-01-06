import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssocDialogComponent } from './edit-assoc-dialog.component';

describe('EditAssocDialogComponent', () => {
  let component: EditAssocDialogComponent;
  let fixture: ComponentFixture<EditAssocDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssocDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAssocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
