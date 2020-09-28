import { DataTableComponent } from "./data-table/data-table.component";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { TesztComponent } from "./teszt/teszt.component";

const routes: Routes = [
  {
    path: "",
    component: TesztComponent,
  },
  {
    path: "datatable",
    component: DataTableComponent,
  },
  {
    path: "selectTable",
    loadChildren: () =>
      import("./data-table/select-table/select-table.module").then(
        (m) => m.SelectTablePageModule
      ),
  },
  {
    path: "addColumn",
    loadChildren: () =>
      import("./data-table/add-column/add-column.module").then(
        (m) => m.AddColumnPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
