import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddColumnPage } from './add-column.page';

describe('AddColumnPage', () => {
  let component: AddColumnPage;
  let fixture: ComponentFixture<AddColumnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddColumnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddColumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
