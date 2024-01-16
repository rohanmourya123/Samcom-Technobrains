import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { DialogRef } from '@angular/cdk/dialog';


export interface ProductDetails {
  name: string;
  id: number;
  description: string;
  price: number;

}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

   product: ProductDetails[] | undefined;
  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'action'];
  dataSource = new MatTableDataSource<ProductDetails>();

  constructor(private service: ProductService, public dialog: MatDialog) { }

  ngOnInit(): void {   // lifeCycle Hook
    this.loadProducts();
  }

  openForm(): void {     // To open Dialog module from Add-Product components
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '500px', height: '400px'
    });
    dialogRef.afterClosed().subscribe(res => {    // To close dialog module
      console.log(res);
    });
  }

  // fetch Data from Services
  loadProducts(): void {
    this.service.getData().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        console.log('form datasource', this.dataSource.data);
      }, error: () => {
        alert('Error while loading the Products');
      }
    })
  }

  // Update data to services
  updateProductByID(product: any) {
    console.log(product)
    this.dialog.open(AddProductComponent, {
      width: '500px', height: '400px',
      data: product
    })
  }

  //Delete Data to service
  deleteProductByID(id: number) {
    this.service.deleteProduct(id).subscribe({
      next: (data) => {
        alert(`product deleted`);
        console.log('Product Deleted',data);
        this.loadProducts();
      }, error: () => {
        alert('Error Product not found ');
      }
      
    })
  }
}



