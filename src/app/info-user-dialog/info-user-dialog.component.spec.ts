import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUserDialogComponent } from './info-user-dialog.component';

describe('InfoUserDialogComponent', () => {
  let component: InfoUserDialogComponent;
  let fixture: ComponentFixture<InfoUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
