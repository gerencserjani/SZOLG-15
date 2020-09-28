import { Component, Input, OnInit } from "@angular/core";
import { TableServiceService } from "./table-service.service";
import { AfterViewInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { getLocaleDateFormat } from "@angular/common";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  tableData;
  public dataSource;
  displayedColumns: string[];
  columnTitles = [];
  deletedColumns = [];
  collectionName = "test";

  constructor(public tableService: TableServiceService) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.tableService.setCollectionName(this.collectionName);
    this.tableService.getData().subscribe((resData) => {
      this.displayedColumns = Object.keys(resData[0]).sort();
      this.tableData = resData;
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteColumn(column) {
    this.displayedColumns = this.displayedColumns.filter((c) => {
      return c != column;
    });
    this.deletedColumns.push(column);
  }
  addColumn(delColumn) {
    if (delColumn.isUserInput == false) {
      return;
    } else {
      this.displayedColumns.push(delColumn.source.value);
      this.deletedColumns = this.deletedColumns.filter((c) => {
        return c != delColumn.source.value;
      });
    }
  }

  changeCollection() {
    this.tableService.setCollectionName(this.collectionName);
    this.ngOnInit();
  }

  ngAfterViewInit() {}
}
