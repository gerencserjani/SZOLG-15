import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { TableServiceService } from "./table-service.service";
import { AfterViewInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { getLocaleDateFormat } from "@angular/common";
import { MatPaginator } from "@angular/material/paginator";
import { ThemeService } from "../services/theme.service";
import { fromEvent, Observable, Subscription } from "rxjs";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { filter, take } from "rxjs/operators";
import { MenuItemModel } from "@syncfusion/ej2-navigations";
import { Item, MenuEventArgs } from "@syncfusion/ej2-angular-navigations";
import {
  ContextMenu,
  BeforeOpenCloseMenuEventArgs,
} from "@syncfusion/ej2-navigations";
import { createCheckBox } from "@syncfusion/ej2-buttons";
import { closest } from "@syncfusion/ej2-base";
import { MatMenuTrigger } from "@angular/material/menu";
import { CdkDragDrop, CdkDragStart, CdkDropList } from "@angular/cdk/drag-drop";
import { moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable, { read: ElementRef }) private matTableRef: ElementRef;
  storedTheme: string = localStorage.getItem("theme-color");
  tableData;
  public dataSource;

  displayedColumns: string[];
  columnTitles = [];
  deletedColumns = [];
  collectionName = "test";
  isThemeDark: Observable<boolean>;

  sub: Subscription;
  @ViewChild("userMenu") userMenu: TemplateRef<any>;
  overlayRef: OverlayRef | null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  previousIndex: number;

  constructor(
    public tableService: TableServiceService,
    private themeService: ThemeService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.tableService.setCollectionName(this.collectionName);
    this.tableService.getData().subscribe((resData) => {
      this.displayedColumns = Object.keys(resData[0]).sort();
      this.tableData = resData;
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.isThemeDark = this.themeService.isThemeDark;
  }

  changeCollection() {
    this.tableService.setCollectionName(this.collectionName);
    this.ngOnInit();
  }

  /* Dark-light Theme changing */
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  /* PopUp Menu */

  onContextMenu({ x, y }: MouseEvent, column) {
    this.close();
    this.contextMenuPosition.x = x + "px";
    this.contextMenuPosition.y = y + "px";
    // this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { column };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

  delete(column) {
    this.displayedColumns = this.displayedColumns.filter((c) => {
      return c !== column;
    });
    this.deletedColumns.push(column);
    this.close();
  }

  addColumn(delColumn) {
    if (delColumn.isUserInput === false) {
      return;
    } else {
      this.displayedColumns.push(delColumn);
      this.deletedColumns = this.deletedColumns.filter((c) => {
        return c !== delColumn;
      });
    }
  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
  tableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  resetView() {
    this.ngOnInit();
  }
}
