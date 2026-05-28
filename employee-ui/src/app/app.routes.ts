import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
];
