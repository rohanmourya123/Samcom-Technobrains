import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {HttpClientModule}  from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';








@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    AddProductComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,MatButtonModule,MatDialogModule,MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,

   




  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
