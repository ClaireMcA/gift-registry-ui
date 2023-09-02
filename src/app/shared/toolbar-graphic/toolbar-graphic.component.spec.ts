import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarGraphicComponent } from './toolbar-graphic.component';

describe('ToolbarGraphicComponent', () => {
  let component: ToolbarGraphicComponent;
  let fixture: ComponentFixture<ToolbarGraphicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarGraphicComponent]
    });
    fixture = TestBed.createComponent(ToolbarGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
