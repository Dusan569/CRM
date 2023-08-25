import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableAllTransactionsComponent } from './crm_tables/table-all-transactions/table-all-transactions.component';
import { TableStoreAccountComponent } from './crm_tables/table-store-account/table-store-account/table-store-account.component';
import { McaInfoComponent } from './crm_tables/table-store-account/table-store-account/mca-info/mca-info.component';

const routes: Routes = [
  {path: 'accounts', component: TableStoreAccountComponent},
  {path: 'all-transactions', component: TableAllTransactionsComponent},
  {path: 'mca-info', component: McaInfoComponent},
  {path: '', redirectTo: 'all-transactions', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
