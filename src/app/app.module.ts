import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableAllTransactionsComponent } from './crm_tables/table-all-transactions/table-all-transactions.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { TableStoreAccountComponent } from './crm_tables/table-store-account/table-store-account/table-store-account.component';
import { ReactiveFormsModule } from '@angular/forms'; 

//Angular Material
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './crm_tables/table-store-account/table-store-account/popup_mca/popup.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    TableAllTransactionsComponent,
    SideNavComponent,
    TableStoreAccountComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    ScrollingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
