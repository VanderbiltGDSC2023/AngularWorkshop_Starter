import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DininghallGridComponent } from './dininghall-grid.component';

describe('DininghallGridComponent', () => {
  let component: DininghallGridComponent;
  let fixture: ComponentFixture<DininghallGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DininghallGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DininghallGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
