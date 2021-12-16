import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfomanceAnimationComponent } from './perfomance-animation/perfomance-animation.component';
import { TestComponentComponent } from './test-component/test-component.component';

const routes: Routes = [{
  component: PerfomanceAnimationComponent,
  path: 'perfomance'
},
{
  component: TestComponentComponent,
  path: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
