import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Category } from '../model/category';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  success: boolean = false;
  errors!: String[];
  displayedColumns: string[] = ['idCategory', 'nameCategory', 'descriptionCategory', 'deleteCategory', 'findCategory'];
  ELEMENT_DATA: Category[] = [];
  message: string ='';
  dataSource = new MatTableDataSource<Category>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: CategoryService) {}

  ngOnInit(): void {
    this.listCategory();
  }

  category: Category = {
    idCategory: '',
    nameCategory: '',
    descriptionCategory: ''
  }

  saveCategory() {

    this.service.save(this.category).subscribe({
      next: response => {
        this.success = true;
        this.errors = [];
        this.listCategory();
        //this.toast.success('O cliente '+ this.category.firstNameCategory +' '+ this.category.lastNameCategory +' foi cadastrado com sucesso!', 'Sucesso!!!');      
      }, error: ex => {
        if (ex.error.errors) {
          this.errors = ex.error.errors;
          this.success = false;
          ex.error.errors.forEach((element: any) => {
            //this.toast.error(element.message, 'Atenção!!!');                    
          });
        } else {
          this.success = false;
          this.errors = ex.error.errors;
          this.listCategory();
          //this.toast.error(ex.error.message, 'Atenção!');
        }
      }
    })
  }

  listCategory() {
    this.service.list().subscribe((response: any) => {
      this.ELEMENT_DATA = response.result as Category[]; // Verifique o tipo e faça a conversão
      this.dataSource = new MatTableDataSource<Category>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });

  }

  deleteCategory(category: Category){
    if (window.confirm('Deseja realmente excluir este contato?'))  {
      this.service.delete(category.idCategory).subscribe((response: any) => {
        this.message = response.result.result as string;
        window.alert(this.message);
        this.listCategory();
      });
    }
  } 


  findCategory(category: Category) {    
    this.service.findById(category.idCategory).subscribe((response: any) => {
      this.category
       = response.result as Category;       
    });
  }

}
