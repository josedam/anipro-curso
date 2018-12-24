import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { FileUrlPipe } from './file-url.pipe';


@NgModule({
  declarations: [ImagenPipe, FileUrlPipe],
  imports: [],
  exports: [ImagenPipe, FileUrlPipe]
})
export class PipesModule { }
