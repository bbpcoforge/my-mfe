import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KendoDrawerComponent } from './kendo-drawer.component';

describe('KendoDrawerComponent', () => {
  let component: KendoDrawerComponent;
  let fixture: ComponentFixture<KendoDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KendoDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KendoDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
