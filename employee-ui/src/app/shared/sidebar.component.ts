import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-icon">E</div>
        <span class="brand-name">EmpManager</span>
      </div>
      <nav class="nav">
        <a routerLink="/" class="nav-item" [class.active]="active === 'dashboard'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Dashboard
        </a>
        <a routerLink="/employees" class="nav-item" [class.active]="active === 'employees'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Employees
        </a>
        <a routerLink="/reports" class="nav-item" [class.active]="active === 'reports'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          Reports
        </a>
        <a routerLink="/settings" class="nav-item" [class.active]="active === 'settings'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
          Settings
        </a>
      </nav>
      <div class="sidebar-footer">
        <div class="avatar">A</div>
        <div class="user-info">
          <span class="user-name">Admin</span>
          <span class="user-role">Super Admin</span>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar { width: 240px; background: #0f1117; display: flex; flex-direction: column; padding: 24px 16px; flex-shrink: 0; height: 100vh; }
    .brand { display: flex; align-items: center; gap: 10px; padding: 0 8px 32px; }
    .brand-icon { width: 32px; height: 32px; background: #6366f1; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px; }
    .brand-name { color: white; font-weight: 600; font-size: 15px; }
    .nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
    .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; color: #6b7280; cursor: pointer; font-size: 14px; text-decoration: none; transition: all 0.15s; }
    .nav-item:hover { background: #1e2130; color: #e5e7eb; }
    .nav-item.active { background: #1e2130; color: #6366f1; }
    .sidebar-footer { display: flex; align-items: center; gap: 10px; padding: 12px 8px 0; border-top: 1px solid #1e2130; }
    .avatar { width: 32px; height: 32px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 13px; }
    .user-info { display: flex; flex-direction: column; }
    .user-name { color: #e5e7eb; font-size: 13px; font-weight: 500; }
    .user-role { color: #6b7280; font-size: 11px; }
  `]
})
export class SidebarComponent {
  @Input() active = 'dashboard';
}
