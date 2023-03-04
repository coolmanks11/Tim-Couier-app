import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliveryOptionDropBoxComponent } from './delivery-option-drop-box.component';

describe('DeliveryOptionDropBoxComponent', () => {
  let component: DeliveryOptionDropBoxComponent;
  let fixture: ComponentFixture<DeliveryOptionDropBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryOptionDropBoxComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryOptionDropBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
