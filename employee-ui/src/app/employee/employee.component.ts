import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from './employee.service';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  template: `
    <div class="app">

      <app-sidebar active="dashboard" />

      <!-- Main -->
      <main class="main">

        <!-- Top Bar -->
        <header class="topbar">
          <div class="topbar-left">
            <h1 class="page-title">Employee Dashboard</h1>
            <p class="page-sub">Manage your workforce</p>
          </div>
          <button class="btn-primary" (click)="openModal()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Employee
          </button>
        </header>

        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon blue">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <div>
              <p class="stat-label">Total Employees</p>
              <p class="stat-value">{{ employees().length }}</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon green">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <p class="stat-label">Active</p>
              <p class="stat-value">{{ activeCount() }}</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <p class="stat-label">Added Today</p>
              <p class="stat-value">{{ todayCount() }}</p>
            </div>
          </div>
        </div>

        <!-- Table Section -->
        <div class="table-card">
          <div class="table-header">
            <h2 class="table-title">All Employees</h2>
            <div class="search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input [ngModel]="search()" (ngModelChange)="search.set($event)" placeholder="Search employees..." class="search-input" />
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (emp of filtered(); track emp.id) {
                <tr>
                  <td class="id-cell">{{ emp.id }}</td>
                  <td>
                    <div class="emp-name-cell">
                      <div class="emp-avatar">{{ emp.name[0].toUpperCase() }}</div>
                      <span>{{ emp.name }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="badge" [class]="'badge-' + emp.status.toLowerCase()">{{ emp.status }}</span>
                  </td>
                  <td class="date-cell">{{ emp.createdAt | date:'dd MMM yyyy' }}</td>
                  <td>
                    <div class="action-btns">
                      <button class="icon-btn edit" (click)="openEdit(emp)" title="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button class="icon-btn delete" (click)="remove(emp.id)" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              }
              @empty {
                <tr>
                  <td colspan="5" class="empty-row">No employees found.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </main>
    </div>

    <!-- Modal -->
    @if (showModal()) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>{{ editId() ? 'Edit Employee' : 'Add Employee' }}</h3>
            <button class="modal-close" (click)="closeModal()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div class="modal-body">
            <label class="form-label">Full Name</label>
            <input [ngModel]="formName()" (ngModelChange)="formName.set($event)" placeholder="Enter employee name" class="form-input" />
          </div>
          <div class="modal-footer">
            <button class="btn-secondary" (click)="closeModal()">Cancel</button>
            <button class="btn-primary" (click)="submit()">{{ editId() ? 'Update' : 'Add' }}</button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    * { box-sizing: border-box; margin: 0; padding: 0; }

    .app {
      display: flex;
      height: 100vh;
      font-family: 'Inter', -apple-system, sans-serif;
      background: #f5f6fa;
      color: #1a1d23;
    }

    /* Sidebar */
    .sidebar {
      width: 240px;
      background: #0f1117;
      display: flex;
      flex-direction: column;
      padding: 24px 16px;
      flex-shrink: 0;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 8px 32px;
    }
    .brand-icon {
      width: 32px; height: 32px;
      background: #6366f1;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 700; font-size: 14px;
    }
    .brand-name { color: white; font-weight: 600; font-size: 15px; }

    .nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }
    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px;
      border-radius: 8px;
      color: #6b7280;
      cursor: pointer;
      font-size: 14px;
      text-decoration: none;
      transition: all 0.15s;
    }
    .nav-item:hover { background: #1e2130; color: #e5e7eb; }
    .nav-item.active { background: #1e2130; color: #6366f1; }

    .sidebar-footer {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 8px 0;
      border-top: 1px solid #1e2130;
    }
    .avatar {
      width: 32px; height: 32px;
      background: #6366f1;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: 600; font-size: 13px;
    }
    .user-info { display: flex; flex-direction: column; }
    .user-name { color: #e5e7eb; font-size: 13px; font-weight: 500; }
    .user-role { color: #6b7280; font-size: 11px; }

    /* Main */
    .main { flex: 1; overflow-y: auto; padding: 32px; display: flex; flex-direction: column; gap: 24px; }

    .topbar { display: flex; justify-content: space-between; align-items: flex-start; }
    .page-title { font-size: 22px; font-weight: 700; color: #0f1117; }
    .page-sub { font-size: 13px; color: #9ca3af; margin-top: 2px; }

    /* Buttons */
    .btn-primary {
      display: flex; align-items: center; gap: 6px;
      background: #6366f1; color: white;
      border: none; border-radius: 8px;
      padding: 10px 18px; font-size: 14px; font-weight: 500;
      cursor: pointer; transition: background 0.15s;
    }
    .btn-primary:hover { background: #4f46e5; }
    .btn-secondary {
      background: #f3f4f6; color: #374151;
      border: none; border-radius: 8px;
      padding: 10px 18px; font-size: 14px; font-weight: 500;
      cursor: pointer; transition: background 0.15s;
    }
    .btn-secondary:hover { background: #e5e7eb; }

    /* Stats */
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .stat-card {
      background: white; border-radius: 12px;
      padding: 20px; display: flex; align-items: center; gap: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
    }
    .stat-icon {
      width: 44px; height: 44px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .stat-icon.blue { background: #eff6ff; color: #3b82f6; }
    .stat-icon.green { background: #f0fdf4; color: #22c55e; }
    .stat-icon.purple { background: #faf5ff; color: #a855f7; }
    .stat-label { font-size: 12px; color: #9ca3af; margin-bottom: 4px; }
    .stat-value { font-size: 24px; font-weight: 700; color: #0f1117; }

    /* Table Card */
    .table-card {
      background: white; border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      overflow: hidden;
    }
    .table-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 24px; border-bottom: 1px solid #f3f4f6;
    }
    .table-title { font-size: 15px; font-weight: 600; }
    .search-box {
      display: flex; align-items: center; gap: 8px;
      background: #f9fafb; border: 1px solid #e5e7eb;
      border-radius: 8px; padding: 8px 12px;
      color: #9ca3af;
    }
    .search-input {
      border: none; background: transparent; outline: none;
      font-size: 13px; color: #374151; width: 200px;
    }

    .table { width: 100%; border-collapse: collapse; }
    .table th {
      text-align: left; padding: 12px 24px;
      font-size: 11px; font-weight: 600;
      color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;
      background: #f9fafb; border-bottom: 1px solid #f3f4f6;
    }
    .table td { padding: 14px 24px; border-bottom: 1px solid #f9fafb; font-size: 14px; }
    .table tr:last-child td { border-bottom: none; }
    .table tr:hover td { background: #fafafa; }

    .id-cell { color: #9ca3af; font-size: 13px; }
    .date-cell { color: #6b7280; font-size: 13px; }

    .emp-name-cell { display: flex; align-items: center; gap: 10px; }
    .emp-avatar {
      width: 30px; height: 30px; border-radius: 50%;
      background: #eff6ff; color: #3b82f6;
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 600; flex-shrink: 0;
    }

    .badge {
      padding: 3px 10px; border-radius: 20px;
      font-size: 11px; font-weight: 600; text-transform: uppercase;
    }
    .badge-active { background: #f0fdf4; color: #16a34a; }
    .badge-inactive { background: #fef2f2; color: #dc2626; }
    .badge-pending { background: #fffbeb; color: #d97706; }

    .action-btns { display: flex; gap: 6px; }
    .icon-btn {
      width: 30px; height: 30px; border-radius: 6px;
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    .icon-btn.edit { background: #eff6ff; color: #3b82f6; }
    .icon-btn.edit:hover { background: #dbeafe; }
    .icon-btn.delete { background: #fef2f2; color: #ef4444; }
    .icon-btn.delete:hover { background: #fee2e2; }

    .empty-row { text-align: center; color: #9ca3af; padding: 48px !important; }

    /* Modal */
    .modal-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.4);
      display: flex; align-items: center; justify-content: center;
      z-index: 100;
    }
    .modal {
      background: white; border-radius: 16px;
      width: 420px; box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    }
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 24px; border-bottom: 1px solid #f3f4f6;
    }
    .modal-header h3 { font-size: 16px; font-weight: 600; }
    .modal-close {
      background: none; border: none; cursor: pointer;
      color: #9ca3af; display: flex; align-items: center;
    }
    .modal-close:hover { color: #374151; }
    .modal-body { padding: 24px; }
    .form-label { display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 8px; }
    .form-input {
      width: 100%; padding: 10px 14px;
      border: 1px solid #e5e7eb; border-radius: 8px;
      font-size: 14px; outline: none; transition: border 0.15s;
    }
    .form-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
    .modal-footer {
      display: flex; justify-content: flex-end; gap: 10px;
      padding: 16px 24px; border-top: 1px solid #f3f4f6;
    }
  `]
})
export class EmployeeComponent implements OnInit {
  private svc = inject(EmployeeService);

  employees = signal<Employee[]>([]);
  search = signal('');
  showModal = signal(false);
  editId = signal<number | null>(null);
  formName = signal('');

  activeCount = computed(() => this.employees().filter(e => e.status === 'ACTIVE').length);
  todayCount = computed(() => {
    const today = new Date().toDateString();
    return this.employees().filter(e => new Date(e.createdAt).toDateString() === today).length;
  });
  filtered = computed(() =>
    this.employees().filter(e => e.name.toLowerCase().includes(this.search().toLowerCase()))
  );

  ngOnInit() { this.load(); }

  load() { this.svc.getAll().subscribe(data => this.employees.set(data)); }

  openModal() { this.showModal.set(true); this.editId.set(null); this.formName.set(''); }
  openEdit(emp: Employee) { this.showModal.set(true); this.editId.set(emp.id); this.formName.set(emp.name); }
  closeModal() { this.showModal.set(false); this.formName.set(''); }

  submit() {
    if (!this.formName().trim()) return;
    const id = this.editId();
    const action = id
      ? this.svc.update(id, this.formName().trim())
      : this.svc.add(this.formName().trim());
    action.subscribe(() => { this.closeModal(); this.load(); });
  }

  remove(id: number) { this.svc.delete(id).subscribe(() => this.load()); }
}
