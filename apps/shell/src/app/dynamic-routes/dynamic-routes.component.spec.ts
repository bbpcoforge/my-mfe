import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicRoutesComponent } from './dynamic-routes.component';

describe('DynamicRoutesComponent', () => {
  let component: DynamicRoutesComponent;
  let fixture: ComponentFixture<DynamicRoutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicRoutesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
