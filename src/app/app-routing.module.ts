import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableAllTransactionsComponent } from './crm_tables/table-all-transactions/table-all-transactions.component';

const routes: Routes = [
  {path: '', component: TableAllTransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
