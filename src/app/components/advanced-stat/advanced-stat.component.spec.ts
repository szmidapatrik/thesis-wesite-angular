import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedStatComponent } from './advanced-stat.component';

describe('AdvancedStatComponent', () => {
  let component: AdvancedStatComponent;
  let fixture: ComponentFixture<AdvancedStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
