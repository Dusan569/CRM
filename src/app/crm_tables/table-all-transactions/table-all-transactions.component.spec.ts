import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAllTransactionsComponent } from './table-all-transactions.component';

describe('TableAllTransactionsComponent', () => {
  let component: TableAllTransactionsComponent;
  let fixture: ComponentFixture<TableAllTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAllTransactionsComponent]
    });
    fixture = TestBed.createComponent(TableAllTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
