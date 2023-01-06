import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAssocDialogComponent } from './new-assoc-dialog.component';

describe('NewAssocDialogComponent', () => {
  let component: NewAssocDialogComponent;
  let fixture: ComponentFixture<NewAssocDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAssocDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAssocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
