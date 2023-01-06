import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesListComponent } from './minutes-list.component';

describe('MinutesListComponent', () => {
  let component: MinutesListComponent;
  let fixture: ComponentFixture<MinutesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinutesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinutesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
