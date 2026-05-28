import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="app">
      <app-sidebar active="reports" />
      <main class="main">
        <header class="topbar">
          <div>
            <h1 class="page-title">Reports</h1>
            <p class="page-sub">Analytics & insights</p>
          </div>
        </header>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div><p class="stat-label">Total Headcount</p><p class="stat-value">24</p></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div><p class="stat-label">Hired This Month</p><p class="stat-value">6</p></div>
          </div>
          <div class="stat-card">
            <div class="stat-icon purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div><p class="stat-label">Avg Tenure (yrs)</p><p class="stat-value">3.2</p></div>
          </div>
        </div>

        <div class="grid-2">
          <!-- Department Breakdown -->
          <div class="table-card">
            <div class="table-header">
              <h2 class="table-title">Department Breakdown</h2>
            </div>
            <table class="table">
              <thead>
                <tr><th>Department</th><th>Headcount</th><th>Share</th></tr>
              </thead>
              <tbody>
                @for (row of departments; track row.name) {
                  <tr>
                    <td>{{ row.name }}</td>
                    <td>{{ row.count }}</td>
                    <td>
                      <div class="bar-wrap">
                        <div class="bar" [style.width]="row.pct + '%'"></div>
                        <span>{{ row.pct }}%</span>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Recent Activity -->
          <div class="table-card">
            <div class="table-header">
              <h2 class="table-title">Recent Activity</h2>
            </div>
            <div class="activity-list">
              @for (a of activity; track a.msg) {
                <div class="activity-item">
                  <div class="activity-dot" [class]="a.type"></div>
                  <div>
                    <p class="activity-msg">{{ a.msg }}</p>
                    <p class="activity-time">{{ a.time }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import '../shared/layout.styles';
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .bar-wrap { display: flex; align-items: center; gap: 8px; }
    .bar { height: 6px; background: #6366f1; border-radius: 4px; }
    .bar-wrap span { font-size: 12px; color: #6b7280; }
    .activity-list { padding: 8px 0; }
    .activity-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 24px; border-bottom: 1px solid #f9fafb; }
    .activity-item:last-child { border-bottom: none; }
    .activity-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0; }
    .activity-dot.green { background: #22c55e; }
    .activity-dot.blue { background: #3b82f6; }
    .activity-dot.red { background: #ef4444; }
    .activity-msg { font-size: 13px; color: #374151; }
    .activity-time { font-size: 11px; color: #9ca3af; margin-top: 2px; }
  `]
})
export class ReportsComponent {
  departments = [
    { name: 'Engineering', count: 10, pct: 42 },
    { name: 'HR', count: 5, pct: 21 },
    { name: 'Finance', count: 4, pct: 17 },
    { name: 'Marketing', count: 3, pct: 12 },
    { name: 'Operations', count: 2, pct: 8 },
  ];

  activity = [
    { msg: 'John Doe was added to Engineering', time: '2 hours ago', type: 'green' },
    { msg: 'Jane Smith profile updated', time: '5 hours ago', type: 'blue' },
    { msg: 'Mark Lee was deactivated', time: 'Yesterday', type: 'red' },
    { msg: 'Sara Khan joined HR team', time: '2 days ago', type: 'green' },
    { msg: 'Bulk import completed — 3 records', time: '3 days ago', type: 'blue' },
  ];
}
