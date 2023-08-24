import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McaInfoComponent } from './mca-info.component';

describe('McaInfoComponent', () => {
  let component: McaInfoComponent;
  let fixture: ComponentFixture<McaInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [McaInfoComponent]
    });
    fixture = TestBed.createComponent(McaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
