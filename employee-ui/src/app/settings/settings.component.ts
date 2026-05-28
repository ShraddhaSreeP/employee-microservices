import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  template: `
    <div class="app">
      <app-sidebar active="settings" />
      <main class="main">
        <header class="topbar">
          <div>
            <h1 class="page-title">Settings</h1>
            <p class="page-sub">Manage your preferences</p>
          </div>
        </header>

        <div class="settings-grid">
          <!-- Profile -->
          <div class="table-card">
            <div class="table-header"><h2 class="table-title">Profile</h2></div>
            <div class="settings-body">
              <div class="avatar-row">
                <div class="big-avatar">A</div>
                <div>
                  <p class="user-name-lg">Admin User</p>
                  <p class="user-email">admin&#64;company.com</p>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input class="form-input" value="Admin User" />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input class="form-input" value="admin&#64;company.com" />
              </div>
              <div class="form-group">
                <label class="form-label">Role</label>
                <input class="form-input" value="Super Admin" disabled />
              </div>
              <button class="btn-primary">Save Changes</button>
            </div>
          </div>

          <!-- Preferences -->
          <div class="settings-col">
            <div class="table-card">
              <div class="table-header"><h2 class="table-title">Notifications</h2></div>
              <div class="settings-body">
                @for (item of notifications; track item.label) {
                  <div class="toggle-row">
                    <div>
                      <p class="toggle-label">{{ item.label }}</p>
                      <p class="toggle-sub">{{ item.sub }}</p>
                    </div>
                    <div class="toggle" [class.on]="item.on" (click)="item.on = !item.on">
                      <div class="toggle-thumb"></div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="table-card" style="margin-top:16px">
              <div class="table-header"><h2 class="table-title">System</h2></div>
              <div class="settings-body">
                <div class="form-group">
                  <label class="form-label">API Base URL</label>
                  <input class="form-input" value="http://localhost:8081/api/v1" disabled />
                </div>
                <div class="form-group">
                  <label class="form-label">Eureka Server</label>
                  <input class="form-input" value="http://localhost:8761" disabled />
                </div>
                <div class="info-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Spring Boot 3.2 · Java 21 · MySQL 8.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import '../shared/layout.styles';
    .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }
    .settings-col { display: flex; flex-direction: column; }
    .settings-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }
    .avatar-row { display: flex; align-items: center; gap: 16px; padding-bottom: 8px; }
    .big-avatar { width: 56px; height: 56px; border-radius: 50%; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 700; }
    .user-name-lg { font-size: 15px; font-weight: 600; color: #0f1117; }
    .user-email { font-size: 13px; color: #9ca3af; margin-top: 2px; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .toggle-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
    .toggle-label { font-size: 13px; font-weight: 500; color: #374151; }
    .toggle-sub { font-size: 11px; color: #9ca3af; margin-top: 2px; }
    .toggle { width: 40px; height: 22px; border-radius: 11px; background: #e5e7eb; cursor: pointer; position: relative; transition: background 0.2s; flex-shrink: 0; }
    .toggle.on { background: #6366f1; }
    .toggle-thumb { width: 16px; height: 16px; border-radius: 50%; background: white; position: absolute; top: 3px; left: 3px; transition: left 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
    .toggle.on .toggle-thumb { left: 21px; }
    .info-badge { display: flex; align-items: center; gap: 6px; background: #f0fdf4; color: #16a34a; padding: 10px 14px; border-radius: 8px; font-size: 12px; font-weight: 500; }
  `]
})
export class SettingsComponent {
  notifications = [
    { label: 'Email Notifications', sub: 'Receive alerts via email', on: true },
    { label: 'New Employee Alert', sub: 'When a new employee is added', on: true },
    { label: 'Weekly Report', sub: 'Summary every Monday', on: false },
    { label: 'System Alerts', sub: 'Downtime and errors', on: true },
  ];
}
