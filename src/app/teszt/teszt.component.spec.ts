import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TesztComponent } from './teszt.component';

describe('TesztComponent', () => {
  let component: TesztComponent;
  let fixture: ComponentFixture<TesztComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesztComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TesztComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
