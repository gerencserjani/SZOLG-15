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

  constructor(
    public tableService: TableServiceService,
    private themeService: ThemeService,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) {}

  ngAfterViewInit(): void {}
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
    this.isThemeDark = this.themeService.isThemeDark;
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

  /* Dark-light Theme changing */
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  /* PopUp Menu */

  open({ x, y }: MouseEvent, user) {
    this.close();
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: "end",
          originY: "bottom",
          overlayX: "end",
          overlayY: "top",
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });

    this.overlayRef.attach(
      new TemplatePortal(this.userMenu, this.viewContainerRef, {
        $implicit: user,
      })
    );

    this.sub = fromEvent<MouseEvent>(document, "click")
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => this.close());
  }

  delete(user) {
    // delete user
    this.close();
  }

  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
