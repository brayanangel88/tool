import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AngularFireStorageModule} from '@angular/fire/storage'



@NgModule({
  exports:[CarouselComponent],
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    NzCarouselModule,
    NzCardModule,
    AngularFireStorageModule
  ]
})
export class CarouselModule { }
