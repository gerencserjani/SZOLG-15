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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
