import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AddColumnPageRoutingModule } from "./add-column-routing.module";

import { AddColumnPage } from "./add-column.page";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    HttpClientModule,
    MatSortModule,
    MatFormFieldModule,
    FormsModule,
    IonicModule,
    AddColumnPageRoutingModule,
  ],
  declarations: [AddColumnPage],
  entryComponents: [],
})
export class AddColumnPageModule {}
