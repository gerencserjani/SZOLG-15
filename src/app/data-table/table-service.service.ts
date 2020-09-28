import { environment } from "./../../environments/environment";
import { Injectable, Input } from "@angular/core";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class TableServiceService {
  collectionName = "";

  constructor(public firebaseService: AngularFirestore) {}
  getData() {
    return this.firebaseService.collection(this.collectionName).valueChanges();
  }
  setCollectionName(name) {
    this.collectionName = name;
  }
}
