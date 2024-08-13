import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtangularappComponent } from './extangularapp.component';

describe('ExtangularappComponent', () => {
  let component: ExtangularappComponent;
  let fixture: ComponentFixture<ExtangularappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtangularappComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExtangularappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
