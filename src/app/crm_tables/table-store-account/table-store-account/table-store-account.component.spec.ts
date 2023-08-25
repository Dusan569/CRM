import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStoreAccountComponent } from './table-store-account.component';

describe('TableStoreAccountComponent', () => {
  let component: TableStoreAccountComponent;
  let fixture: ComponentFixture<TableStoreAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableStoreAccountComponent]
    });
    fixture = TestBed.createComponent(TableStoreAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
