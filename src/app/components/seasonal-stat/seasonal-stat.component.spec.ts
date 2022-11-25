import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalStatComponent } from './seasonal-stat.component';

describe('SeasonalStatComponent', () => {
  let component: SeasonalStatComponent;
  let fixture: ComponentFixture<SeasonalStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeasonalStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonalStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
