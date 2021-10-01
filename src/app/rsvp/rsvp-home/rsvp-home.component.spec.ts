import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpHomeComponent } from './rsvp-home.component';

describe('RsvpHomeComponent', () => {
  let component: RsvpHomeComponent;
  let fixture: ComponentFixture<RsvpHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsvpHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
