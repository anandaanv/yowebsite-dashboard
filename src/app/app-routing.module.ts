import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { TablesComponent } from './tables/tables.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CarouselComponent } from './carousel/carousel.component';
import { TabsComponent } from './tabs/tabs.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import {CreateWebsiteComponent} from "./create-website/create-website.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forms', component: FormsComponent, canActivate: [AuthGuard] },
  { path: 'buttons', component: ButtonsComponent, canActivate: [AuthGuard] },
  { path: 'tables', component: TablesComponent, canActivate: [AuthGuard] },
  { path: 'icons', component: IconsComponent, canActivate: [AuthGuard] },
  { path: 'typography', component: TypographyComponent, canActivate: [AuthGuard] },
  { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard] },
  { path: 'accordions', component: AccordionsComponent, canActivate: [AuthGuard] },
  { path: 'badges', component: BadgesComponent, canActivate: [AuthGuard] },
  { path: 'progressbar', component: ProgressbarComponent, canActivate: [AuthGuard] },
  { path: 'breadcrumbs', component: BreadcrumbsComponent, canActivate: [AuthGuard] },
  { path: 'pagination', component: PaginationComponent, canActivate: [AuthGuard] },
  { path: 'dropdowns', component: DropdownComponent, canActivate: [AuthGuard] },
  { path: 'tooltips', component: TooltipsComponent, canActivate: [AuthGuard] },
  { path: 'carousel', component: CarouselComponent, canActivate: [AuthGuard] },
  { path: 'tabs', component: TabsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: AuthComponent },
  { path: 'create-website', component: CreateWebsiteComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
