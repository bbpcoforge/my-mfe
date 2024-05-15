import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';
import { ProductService } from '../products.service';
import { Observable } from 'rxjs';
import {
  GridModule,
  PDFModule,
  ExcelModule,
} from '@progress/kendo-angular-grid';

@Component({
  selector: 'lib-kendo-grid',
  standalone: true,
  imports: [CommonModule, GridModule, PDFModule, ExcelModule],
  templateUrl: './kendo-grid.component.html',
  styleUrl: './kendo-grid.component.css',
  providers: [ProductService],
})
export class KendoGridComponent {
  public gridItems: Observable<GridDataResult> | undefined;
  public pageSize = 10;
  public skip = 0;
  public sortDescriptor: SortDescriptor[] = [];
  public filterTerm: number | null = null;

  constructor(private service: ProductService) {
    this.loadGridItems();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGridItems();
  }

  public handleSortChange(descriptor: SortDescriptor[]): void {
    this.sortDescriptor = descriptor;
    this.loadGridItems();
  }

  private loadGridItems(): void {
    this.gridItems = this.service.getProducts(
      this.skip,
      this.pageSize,
      this.sortDescriptor,
      this.filterTerm
    );
  }
}
