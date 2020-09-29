import { TesztComponent } from "./teszt/teszt.component";
import { DataTableComponent } from "./data-table/data-table.component";
import { environment } from "./../environments/environment";
import { TableServiceService } from "./data-table/table-service.service";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { firebaseConfig } from "./data-table/environments/firebaseenv";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
  declarations: [AppComponent, TesztComponent, DataTableComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    AngularFireModule,
    MatTableModule,

    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TableServiceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
