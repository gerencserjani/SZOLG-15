import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectTablePage } from './select-table.page';

describe('SelectTablePage', () => {
  let component: SelectTablePage;
  let fixture: ComponentFixture<SelectTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
