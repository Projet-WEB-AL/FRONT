import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbitSenderComponent } from './rabbit-sender.component';

describe('RabbitSenderComponent', () => {
  let component: RabbitSenderComponent;
  let fixture: ComponentFixture<RabbitSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RabbitSenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RabbitSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
