import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactAppWrapperComponent } from './react-app-wrapper.component';

describe('ReactAppWrapperComponent', () => {
  let component: ReactAppWrapperComponent;
  let fixture: ComponentFixture<ReactAppWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactAppWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReactAppWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
