import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryItemsComponent } from './registry-items.component';

describe('RegistryItemsComponent', () => {
  let component: RegistryItemsComponent;
  let fixture: ComponentFixture<RegistryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistryItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
