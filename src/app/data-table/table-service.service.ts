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
  data = [
    {
      resourceType: "Patient",
      id: "example",
      text: {
        status: "generated",
        div:
          '<div xmlns="http://www.w3.org/1999/xhtml">\n\t\t\t<table>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Name</td>\n\t\t\t\t\t\t<td>Peter James \n              <b>Chalmers</b> (&quot;Jim&quot;)\n            </td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Address</td>\n\t\t\t\t\t\t<td>534 Erewhon, Pleasantville, Vic, 3999</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Contacts</td>\n\t\t\t\t\t\t<td>Home: unknown. Work: (03) 5555 6473</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Id</td>\n\t\t\t\t\t\t<td>MRN: 12345 (Acme Healthcare)</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>',
      },
      identifier: [
        {
          use: "usual",
          type: {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                code: "MR",
              },
            ],
          },
          system: "urn:oid:1.2.36.146.595.217.0.1",
          value: "12345",
          period: {
            start: "2001-05-06",
          },
          assigner: {
            display: "Acme Healthcare",
          },
        },
      ],
      active: true,
      name: [
        {
          use: "official",
          family: "Chalmers",
          given: ["Peter", "James"],
        },
        {
          use: "usual",
          given: ["Jim"],
        },
        {
          use: "maiden",
          family: "Windsor",
          given: ["Peter", "James"],
          period: {
            end: "2002",
          },
        },
      ],
      telecom: [
        {
          use: "home",
        },
        {
          system: "phone",
          value: "(03) 5555 6473",
          use: "work",
          rank: 1,
        },
        {
          system: "phone",
          value: "(03) 3410 5613",
          use: "mobile",
          rank: 2,
        },
        {
          system: "phone",
          value: "(03) 5555 8834",
          use: "old",
          period: {
            end: "2014",
          },
        },
      ],
      gender: "male",
      birthDate: "1974-12-25",
      _birthDate: {
        extension: [
          {
            url: "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
            valueDateTime: "1974-12-25T14:35:45-05:00",
          },
        ],
      },
      deceasedBoolean: false,
      address: [
        {
          use: "home",
          type: "both",
          text: "534 Erewhon St PeasantVille, Rainbow, Vic  3999",
          line: ["534 Erewhon St"],
          city: "PleasantVille",
          district: "Rainbow",
          state: "Vic",
          postalCode: "3999",
          period: {
            start: "1974-12-25",
          },
        },
      ],
      contact: [
        {
          relationship: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0131",
                  code: "N",
                },
              ],
            },
          ],
          name: {
            family: "du Marché",
            _family: {
              extension: [
                {
                  url:
                    "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
                  valueString: "VV",
                },
              ],
            },
            given: ["Bénédicte"],
          },
          telecom: [
            {
              system: "phone",
              value: "+33 (237) 998327",
            },
          ],
          address: {
            use: "home",
            type: "both",
            line: ["534 Erewhon St"],
            city: "PleasantVille",
            district: "Rainbow",
            state: "Vic",
            postalCode: "3999",
            period: {
              start: "1974-12-25",
            },
          },
          gender: "female",
          period: {
            start: "2012",
          },
        },
      ],
      managingOrganization: {
        reference: "Organization/1",
      },
    },
  ];

  constructor(
    public firebaseService: AngularFirestore,
    private http: HttpClient
  ) {
    //this.getJSON().forEach((element) => {
    // firebaseService.collection("Patient").add(element);
    // });
    this.getJSON().forEach((element)=>{
      console.log(element);
      element.address.forEach((innerElement)=>{
        console.log(innerElement);
      });
    });
    console.log("---------------------------");
    //this.getValue(address,this.data);
    
  }
  private _jsonURL = "assets/patient.json";
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  getData() {
    return this.firebaseService.collection(this.collectionName).valueChanges();
  }
  setCollectionName(name) {
    this.collectionName = name;
  }
  /* Not mine 
  getCellValue(element, genModel) {
    const genModelName = genModel.name.endsWith("1")
      ? genModel.name.substring(0, genModel.name.length - 1)
      : genModel.name;
    let value = element?.[genModelName];
    if (genModel.valuePath) {
      genModel.valuePath.forEach((v) => {
        value = value?.[v];
      });
    }
    if (genModel.pipe) {
      value = this[genModel.pipe.vName].transform(value, genModel.pipe.format);
    }
    return value;
  }
  */

  getValue(value, collection){
    collection.forEach(element => {
      if(element === value){
        console.log(element);
      }else{
        this.getValue(value, element);
      }
    });
  }
}
