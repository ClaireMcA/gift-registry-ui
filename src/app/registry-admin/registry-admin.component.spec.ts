import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryAdminComponent } from './registry-admin.component';

describe('RegistryAdminComponent', () => {
  let component: RegistryAdminComponent;
  let fixture: ComponentFixture<RegistryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistryAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
