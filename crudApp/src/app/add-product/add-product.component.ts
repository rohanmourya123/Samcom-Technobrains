import { Component, OnInit} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  productList = [];
  
  productForm!: FormGroup;
  constructor(private fb : FormBuilder, private services :ProductService,public dialog: MatDialog){
    this.productForm = fb.group({
      name:['',[Validators.required,Validators.minLength(3)],],
      description:['',[Validators.required ,Validators.maxLength(100),Validators.minLength(3)]],
      quantity:['',[Validators.required]],
      price:['',[Validators.required]]
    })
  };

  ngOnInit(): void {}
  
  onSubmit(){
    // console.log('onsubmit',this.productForm.value)
    this.services.createProduct(this.productForm.value).subscribe(data =>{
      console.log(` Form submitted Data added ${data}`);
    })
  } 

  closeForm(){
    const dialogRef = this.dialog.closeAll();
  }
}
