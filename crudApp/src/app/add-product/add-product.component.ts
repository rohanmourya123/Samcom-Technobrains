import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  // MatDialogTitle,
  // MatDialogContent,
  // MatDialogActions,
  // MatDialogClose,
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  // productList = [];
  productForm!: FormGroup;
  actionBtn: string = 'SAVE';

  constructor(
    private fb: FormBuilder,
    private services: ProductService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { };

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)],],
      description: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })
    // console.log('edit Data ',this.editData)
    if (this.editData) {
      this.actionBtn = "Update"
      this.productForm.controls['name'].setValue(this.editData.name)
      this.productForm.controls['description'].setValue(this.editData.description)
      this.productForm.controls['quantity'].setValue(this.editData.quantity)
      this.productForm.controls['price'].setValue(this.editData.price)
    }
  }

  addProduct() {
    if (!this.editData) {
      console.log('onsubmit', this.productForm.value)
      this.services.createProduct(this.productForm.value).subscribe({
        next: (data) => {
          alert('Product Added successfully');
          this.productForm.reset();
          this.dialogRef.close();
        },
        error: () => {
          alert('Error while Adding Product')
        }
      })
    }
    else {
      this.updateData();
    }
  }


  updateData() {
    this.services.updateProduct(this.editData.id, this.productForm.value).subscribe({
      next: (res) => {
        alert('updated the product');
        this.productForm.reset();
        this.dialogRef.close();
      },
      error: () => {
        alert('Error while updating')
      }
    })
  }

  closeForm() {
    this.dialogRef.close();
  }
}

