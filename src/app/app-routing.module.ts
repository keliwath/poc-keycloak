import { HelloComponent } from './hello/hello.component';
import { GucontentComponent } from './gucontent/gucontent.component';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'content', component: GucontentComponent, canActivate: [AuthGuard]},
  { path: '', component: HelloComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
