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

// const ELEMENT_DATA: ProductDetails[] = [
//   { id: 1, name: 'iphone11', description: "color red 256 -gb ", price: 20000 },
//   { id: 2, name: 'Airpods', description: "color white etc", price: 25000 },


// ];


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  product: ProductDetails[] | undefined;


  displayedColumns: string[] = ['name', 'description', 'price','action'];
  dataSource = new MatTableDataSource<ProductDetails>();

  constructor(private service: ProductService, public dialog: MatDialog) { }

  openForm(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '500px', height: '400px'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

// fetch Data from Services
  loadProducts(): void {
    this.service.getData().subscribe(data => {
      this.dataSource.data = data;
      console.log('form datasource',this.dataSource.data)
    })
  }
 
  // // Post data to services
  // addProduct() {
  //   this.service.createProduct(this.product).subscribe(data => {
  //     console.log(`Data added ${data}`);
  //   })
  // } 
 
  // Update data to services
  updateProductByID(product:any){
    // console.log(product);
    console.log(product.value)
    this.dialog.open(AddProductComponent,{
         width:'500px',height:'400px',
        data:product.value
    })
     this.service.updateProduct(product.id,product).subscribe(data => {
       console.log('data from update ',data);
      this.loadProducts();
    })
  }

  //Delete Data to service
  deleteProductByID(id:number){
    this.service.deleteProduct(id).subscribe(data => {
      console.log(data);
      alert(`deleted product`);
      this.loadProducts();
    })
  }

  //displayedColumns: string[] = ['id', 'name', 'description', 'price', 'action'];
  // dataSource = ELEMENT_DATA;

}



