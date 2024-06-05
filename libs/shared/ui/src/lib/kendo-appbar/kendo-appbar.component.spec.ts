import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KendoAppbarComponent } from './kendo-appbar.component';

describe('KendoAppbarComponent', () => {
  let component: KendoAppbarComponent;
  let fixture: ComponentFixture<KendoAppbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KendoAppbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KendoAppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
