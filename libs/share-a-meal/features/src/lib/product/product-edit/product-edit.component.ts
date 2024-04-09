import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, Conditie } from '@avans-nx-workshop/shared/api';
import { ProductService } from '../product.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup = {} as FormGroup;
  productId: string | null = null;
  product: IProduct = {} as IProduct;

  // Enum voor de conditie van het product
  conditieEnum = Conditie;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.currentUser$.getValue()) {
      // Gebruiker is niet ingelogd, navigeer naar de inlogpagina
      this.router.navigate(['/login']);
    }

    // Initializeer het formulier met FormBuilder
    this.productForm = this.fb.group({
      nameProduct: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      productImageUrl: ['', Validators.required],
      favorite: [false],
      condition: [Conditie, Validators.required],
    });

    // Haal de product ID op uit de URL
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');

      // Als er een product ID is, haal het product op van de server
      if (this.productId) {
        this.productService.read(this.productId).subscribe((product) => {
          this.product = product;
          // Patch de waarden van het product in het formulier
          this.productForm.patchValue(this.product);
        });
      }
    });
  }

  // Methode om het product bij te werken
  updateProduct() {
    // formulier niet geldig?
    if (this.productForm.invalid) {
      return;
    }

    // Update het product met de waarden uit het formulier
    const updatedProduct: IProduct = {
      ...this.product,
      ...this.productForm.value,
    };

    updatedProduct.condition =
      Conditie[updatedProduct.condition as keyof typeof Conditie]; // Conditie enum overeenkomt

    this.productService.update(updatedProduct).subscribe({
      next: () => {
        console.log('Product updated successfully:', updatedProduct);
        // Navigeer terug naar de productdetails
        this.router.navigate(['../../product', this.productId]);
      },
      error: (error) => {
        console.error('Error updating product:', error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['../../product', this.productId]);
  }
}
