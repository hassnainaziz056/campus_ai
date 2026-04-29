import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard, Users, CalendarCheck, GraduationCap, Bell, Settings,
  LogOut, Menu, X, Plus, Search, Download, AlertCircle,
  Mail, Lock, Filter, MoreVertical, CheckCircle2, FileText,
  User as UserIcon, TrendingUp, BarChart3, Edit2, Trash2, Save, Shield, Database, Activity
} from 'lucide-react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface User {
  id: string; name: string; role: 'admin' | 'student';
  studentId?: string; department?: string; attendance?: number; gpa?: number;
}
interface Student {
  id: string; name: string; email: string; department: string;
  attendance: number; gpa: number; status: string; studentId: string; batch?: string;
}
interface Faculty {
  id: string; name: string; designation: string; subject: string;
  department: string; email: string;
}
interface Course {
  code: string; name: string; credits: number; facultyId: string; department: string;
}
interface Marks {
  studentId: string; courseCode: string; mid: number; final: number;
  assignment: number; quiz: number;
}
interface AttendanceRecord {
  studentId: string; courseCode: string; total: number; attended: number;
}

// ─────────────────────────────────────────────
// CENTRALIZED DATA
// ─────────────────────────────────────────────
const INITIAL_FACULTY: Faculty[] = [
  { id: 'T01', name: 'Dr. Ahmed Khan', designation: 'Professor', subject: 'Artificial Intelligence', department: 'Computer Science', email: 'ahmed.khan@campus.edu' },
  { id: 'T02', name: 'Sara Ali', designation: 'Assistant Professor', subject: 'Software Engineering', department: 'Computer Science', email: 'sara.ali@campus.edu' },
  { id: 'T03', name: 'Usman Tariq', designation: 'Lecturer', subject: 'Data Structures', department: 'Computer Science', email: 'usman.tariq@campus.edu' },
  { id: 'T04', name: 'Dr. Maria Garcia', designation: 'Professor', subject: 'Discrete Mathematics', department: 'Computer Science', email: 'm.garcia@campus.edu' },
  { id: 'T05', name: 'Kevin Lee', designation: 'Assistant Professor', subject: 'Operating Systems', department: 'Computer Science', email: 'k.lee@campus.edu' },
  { id: 'T06', name: 'Dr. Robert Brown', designation: 'Professor', subject: 'Thermodynamics', department: 'Mechanical Eng', email: 'r.brown@campus.edu' },
  { id: 'T07', name: 'Linda Wilson', designation: 'Lecturer', subject: 'Business Ethics', department: 'Business Admin', email: 'l.wilson@campus.edu' },
  { id: 'T08', name: 'Dr. Steven Wright', designation: 'Assistant Professor', subject: 'Corporate Law', department: 'Law', email: 's.wright@campus.edu' },
  { id: 'T09', name: 'Rachel Green', designation: 'Lecturer', subject: 'Art History', department: 'Fine Arts', email: 'r.green@campus.edu' },
  { id: 'T10', name: 'Dr. Thomas Anderson', designation: 'Professor', subject: 'Network Security', department: 'Computer Science', email: 'neo@campus.edu' },
];

const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Alexander Pierce', email: 'pierce@campus.edu', department: 'Computer Science', attendance: 85, gpa: 3.8, status: 'Active', studentId: 'STD-2024-102', batch: 'Fall 2024' },
  { id: '2', name: 'Sarah Smith', email: 'sarah.s@campus.edu', department: 'Business Admin', attendance: 92, gpa: 3.9, status: 'Active', studentId: 'STD-2024-105', batch: 'Fall 2024' },
  { id: '3', name: 'David Miller', email: 'miller.d@campus.edu', department: 'Mechanical Eng', attendance: 78, gpa: 3.2, status: 'On Probation', studentId: 'STD-2024-110', batch: 'Fall 2024' },
  { id: '4', name: 'Emily White', email: 'emily.w@campus.edu', department: 'Electrical Eng', attendance: 95, gpa: 4.0, status: 'Active', studentId: 'STD-2024-115', batch: 'Fall 2024' },
  { id: '5', name: 'Michael Ross', email: 'ross.m@campus.edu', department: 'Law', attendance: 88, gpa: 3.6, status: 'Active', studentId: 'STD-2024-120', batch: 'Fall 2024' },
  { id: '6', name: 'Jessica Day', email: 'jday@campus.edu', department: 'Fine Arts', attendance: 82, gpa: 3.5, status: 'Active', studentId: 'STD-2024-125', batch: 'Fall 2024' },
];

const ALL_COURSES: Course[] = [
  { code: 'CS-501', name: 'Data Structures', credits: 4, facultyId: 'T03', department: 'Computer Science' },
  { code: 'CS-502', name: 'Operating Systems', credits: 3, facultyId: 'T05', department: 'Computer Science' },
  { code: 'CS-503', name: 'Artificial Intelligence', credits: 3, facultyId: 'T01', department: 'Computer Science' },
  { code: 'MA-201', name: 'Discrete Mathematics', credits: 3, facultyId: 'T04', department: 'Computer Science' },
  { code: 'CS-504', name: 'Network Security', credits: 3, facultyId: 'T10', department: 'Computer Science' },
  { code: 'SE-401', name: 'Software Engineering', credits: 3, facultyId: 'T02', department: 'Computer Science' },
  { code: 'ME-301', name: 'Thermodynamics', credits: 3, facultyId: 'T06', department: 'Mechanical Eng' },
  { code: 'BA-201', name: 'Business Ethics', credits: 2, facultyId: 'T07', department: 'Business Admin' },
  { code: 'LW-101', name: 'Corporate Law', credits: 3, facultyId: 'T08', department: 'Law' },
  { code: 'FA-101', name: 'Art History', credits: 2, facultyId: 'T09', department: 'Fine Arts' },
];

const DEFAULT_MARKS: Marks[] = [
  { studentId: '23k0905', courseCode: 'CS-501', mid: 26, final: 62, assignment: 13, quiz: 9 },
  { studentId: '23k0905', courseCode: 'CS-502', mid: 22, final: 55, assignment: 11, quiz: 7 },
  { studentId: '23k0905', courseCode: 'MA-201', mid: 28, final: 65, assignment: 14, quiz: 9 },
  { studentId: '23k0905', courseCode: 'CS-503', mid: 20, final: 50, assignment: 10, quiz: 6 },
  { studentId: '1', courseCode: 'CS-501', mid: 25, final: 60, assignment: 12, quiz: 8 },
  { studentId: '1', courseCode: 'CS-502', mid: 22, final: 58, assignment: 11, quiz: 7 },
  { studentId: '1', courseCode: 'MA-201', mid: 27, final: 63, assignment: 13, quiz: 8 },
];

const DEFAULT_ATTENDANCE: AttendanceRecord[] = [
  { studentId: '23k0905', courseCode: 'CS-501', total: 32, attended: 30 },
  { studentId: '23k0905', courseCode: 'CS-502', total: 28, attended: 22 },
  { studentId: '23k0905', courseCode: 'MA-201', total: 30, attended: 29 },
  { studentId: '23k0905', courseCode: 'CS-503', total: 26, attended: 17 },
  { studentId: '1', courseCode: 'CS-501', total: 32, attended: 28 },
  { studentId: '1', courseCode: 'CS-502', total: 28, attended: 24 },
  { studentId: '1', courseCode: 'MA-201', total: 30, attended: 27 },
];

// ─────────────────────────────────────────────
// AUTH CONTEXT
// ─────────────────────────────────────────────
const AuthContext = createContext<{
  user: User | null;
  login: (u: string, p: string) => boolean;
  logout: () => void;
} | null>(null);

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth outside provider');
  return ctx;
};

// ─────────────────────────────────────────────
// DESIGN SYSTEM COMPONENTS
// ─────────────────────────────────────────────
const Card = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
  >{children}</div>
);

const Btn = ({ children, variant = 'primary', className = '', fullWidth = false, ...rest }: any) => {
  const styles: Record<string, string> = {
    primary: 'bg-slate-800 text-white hover:bg-slate-700',
    accent: 'bg-amber-500 text-slate-900 hover:bg-amber-400',
    secondary: 'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50',
    ghost: 'text-slate-500 hover:bg-gray-100',
    danger: 'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100',
  };
  return (
    <button
      className={`px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 justify-center transition-all ${styles[variant] || styles.primary} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >{children}</button>
  );
};

const Inp = ({ label, icon: Icon, error, ...rest }: any) => (
  <div className="space-y-1">
    {label && <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</label>}
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
      <input
        className={`w-full bg-gray-50 border ${error ? 'border-red-300' : 'border-gray-200 focus:border-amber-400'} rounded-xl py-2.5 ${Icon ? 'pl-9' : 'px-4'} pr-4 text-sm outline-none transition-colors`}
        {...rest}
      />
    </div>
    {error && <p className="text-[11px] text-red-500">{error}</p>}
  </div>
);

const Badge = ({ variant = 'default', children }: { variant?: string; children: React.ReactNode }) => {
  const styles: Record<string, string> = {
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    error: 'bg-red-50 text-red-600',
    info: 'bg-blue-50 text-blue-700',
    default: 'bg-gray-100 text-gray-600',
    accent: 'bg-amber-100 text-amber-800',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${styles[variant] || styles.default}`}>
      {children}
    </span>
  );
};

const ProgressBar = ({ value, max = 100 }: { value: number; max?: number }) => {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const c = pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500';
  const tc = pct >= 75 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600';
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} className={`h-full ${c}`} />
      </div>
      <span className={`text-xs font-bold w-9 text-right ${tc}`}>{pct}%</span>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, sub, color = 'text-amber-500' }: any) => (
  <Card>
    <div className="mb-4">
      <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center"><Icon size={18} className={color} /></div>
    </div>
    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
    <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
    {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
  </Card>
);

// ─────────────────────────────────────────────
// LOGIN SCREEN
// ─────────────────────────────────────────────
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(username, password)) {
      setError('Invalid credentials. Use admin/admin or any Student ID with any password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-slate-900 p-10 text-center">
            <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <GraduationCap className="text-slate-900" size={32} />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Campus AI</h1>
            <p className="text-slate-400 text-sm mt-1">Smart Student Management System</p>
          </div>
          <div className="p-10">
            <form onSubmit={handleLogin} className="space-y-5">
              <Inp label="Username / Student ID" placeholder="admin  or  23k0905" icon={UserIcon}
                value={username} onChange={(e: any) => { setUsername(e.target.value); setError(''); }} />
              <Inp label="Password" type="password" placeholder="••••••••" icon={Lock}
                value={password} onChange={(e: any) => { setPassword(e.target.value); setError(''); }} />
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100">
                  <AlertCircle size={16} className="text-red-500 shrink-0" />
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              )}
              <Btn variant="accent" fullWidth type="submit" className="py-3 text-base">Sign In</Btn>
            </form>
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Demo Credentials</p>
              <div className="space-y-1 text-xs text-slate-600">
                <p><span className="font-bold">Admin:</span> <code className="bg-amber-100 px-1 rounded">admin</code> / <code className="bg-amber-100 px-1 rounded">admin</code></p>
                <p><span className="font-bold">Student:</span> any ID like <code className="bg-amber-100 px-1 rounded">23k0905</code> + any password</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────
const Sidebar = ({ tabs, activeTab, setActiveTab, onClose }: {
  tabs: { id: string; label: string; icon: any }[];
  activeTab: string; setActiveTab: (t: string) => void; onClose?: () => void;
}) => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col h-full bg-slate-900 text-white">
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shrink-0">
          <GraduationCap className="text-slate-900" size={22} />
        </div>
        <div>
          <h1 className="text-base font-black tracking-tight">Campus AI</h1>
          <p className="text-[10px] text-amber-400 uppercase tracking-wider font-bold">
            {user?.role === 'admin' ? 'Admin Portal' : 'Student Hub'}
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto p-1 text-slate-400 hover:text-white"><X size={20} /></button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); onClose?.(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${active ? 'bg-amber-400 text-slate-900' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              <tab.icon size={18} strokeWidth={active ? 2.5 : 2} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center text-amber-400 font-bold text-sm">
            {user?.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-500 truncate">{user?.role === 'admin' ? 'Administrator' : user?.studentId}</p>
          </div>
        </div>
        <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 hover:bg-red-500/10 text-sm font-semibold transition-all">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ADMIN TAB CONTENTS
// ─────────────────────────────────────────────
const AdminOverview = ({ students, faculty }: { students: Student[]; faculty: Faculty[] }) => {
  const avgGpa = (students.reduce((a, s) => a + s.gpa, 0) / students.length).toFixed(2);
  const probation = students.filter(s => s.status === 'On Probation').length;
  const deptBreakdown = students.reduce((acc: Record<string, number>, s) => {
    acc[s.department] = (acc[s.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">System Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time campus dashboard</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Students" value={students.length} icon={Users} sub="Active enrollees" />
        <StatCard label="Faculty Members" value={faculty.length} icon={UserIcon} sub="Academic staff" color="text-blue-500" />
        <StatCard label="Average GPA" value={avgGpa} icon={TrendingUp} sub="Current semester" color="text-emerald-500" />
        <StatCard label="On Probation" value={probation} icon={AlertCircle} sub="Needs attention" color="text-red-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="font-bold text-slate-800 mb-4">Student Attendance</h2>
          <div className="space-y-4">
            {students.slice(0, 6).map(s => (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">{s.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate mb-1">{s.name}</p>
                  <ProgressBar value={s.attendance} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-bold text-slate-800 mb-4">Department Distribution</h2>
          <div className="space-y-3">
            {Object.entries(deptBreakdown).map(([dept, count]) => (
              <div key={dept} className="flex items-center justify-between gap-4">
                <p className="text-sm text-slate-700 font-medium truncate flex-1">{dept}</p>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(count / students.length) * 100}%` }} />
                  </div>
                  <span className="text-xs font-bold text-slate-600 w-4">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <h2 className="font-bold text-slate-800 mb-4">Weekly Attendance Trend</h2>
        <div className="h-36 flex items-end gap-2 border-b border-l border-gray-100 px-2">
          {[72, 85, 68, 91, 78, 88, 94].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }}
                className="w-full bg-amber-400/80 hover:bg-amber-400 rounded-t-lg transition-colors relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">{h}%</div>
              </motion.div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 px-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <span key={d} className="text-[10px] font-bold text-slate-400 uppercase flex-1 text-center">{d}</span>
          ))}
        </div>
      </Card>
    </div>
  );
};

const AdminStudents = ({ students, setStudents }: { students: Student[]; setStudents: React.Dispatch<React.SetStateAction<Student[]>> }) => {
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const emptyForm = { name: '', email: '', department: '', studentId: '', batch: '', status: 'Active', attendance: 90, gpa: 3.0 };
  const [form, setForm] = useState(emptyForm);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.studentId.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.studentId) return;
    setStudents(prev => [{ ...form, id: Date.now().toString() }, ...prev]);
    setAdding(false); setForm(emptyForm);
  };

  const handleEdit = (s: Student) => {
    setEditId(s.id);
    setForm({ name: s.name, email: s.email, department: s.department, studentId: s.studentId, batch: s.batch || '', status: s.status, attendance: s.attendance, gpa: s.gpa });
  };

  const handleSave = () => {
    setStudents(prev => prev.map(s => s.id === editId ? { ...s, ...form } : s));
    setEditId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Student Directory</h1>
          <p className="text-sm text-slate-500">{students.length} students enrolled</p>
        </div>
        <Btn variant="accent" onClick={() => { setAdding(true); setEditId(null); }}><Plus size={16} /> Add Student</Btn>
      </div>

      <AnimatePresence>
        {(adding || editId) && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Card className="border-amber-200 bg-amber-50">
              <h3 className="font-bold text-slate-800 mb-4">{adding ? 'Add New Student' : 'Edit Student'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Inp label="Full Name" value={form.name} onChange={(e: any) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. John Doe" />
                <Inp label="Email" type="email" value={form.email} onChange={(e: any) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@campus.edu" />
                <Inp label="Student ID" value={form.studentId} onChange={(e: any) => setForm(p => ({ ...p, studentId: e.target.value }))} placeholder="STD-2024-XXX" />
                <Inp label="Department" value={form.department} onChange={(e: any) => setForm(p => ({ ...p, department: e.target.value }))} placeholder="Computer Science" />
                <Inp label="Batch" value={form.batch} onChange={(e: any) => setForm(p => ({ ...p, batch: e.target.value }))} placeholder="Fall 2024" />
                <div className="flex gap-3">
                  <div className="flex-1"><Inp label="Attendance %" type="number" value={form.attendance} onChange={(e: any) => setForm(p => ({ ...p, attendance: Number(e.target.value) }))} /></div>
                  <div className="flex-1"><Inp label="GPA" type="number" step="0.01" value={form.gpa} onChange={(e: any) => setForm(p => ({ ...p, gpa: Number(e.target.value) }))} /></div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Btn variant="accent" onClick={adding ? handleAdd : handleSave}><Save size={14} /> {adding ? 'Add Student' : 'Save Changes'}</Btn>
                <Btn variant="secondary" onClick={() => { setAdding(false); setEditId(null); }}>Cancel</Btn>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-sm outline-none" placeholder="Search by name, ID or department..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Btn variant="secondary"><Filter size={14} /> Filter</Btn>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Student', 'ID', 'Department', 'Attendance', 'GPA', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm shrink-0">{s.name.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{s.name}</p>
                        <p className="text-[11px] text-slate-400">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-slate-500 whitespace-nowrap">{s.studentId}</td>
                  <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">{s.department}</td>
                  <td className="px-5 py-4 min-w-[140px]"><ProgressBar value={s.attendance} /></td>
                  <td className="px-5 py-4">
                    <span className={`text-sm font-bold ${s.gpa >= 3.5 ? 'text-emerald-600' : s.gpa >= 3.0 ? 'text-amber-600' : 'text-red-600'}`}>{s.gpa.toFixed(2)}</span>
                  </td>
                  <td className="px-5 py-4"><Badge variant={s.status === 'On Probation' ? 'warning' : 'success'}>{s.status}</Badge></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => setStudents(prev => prev.filter(x => x.id !== s.id))} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-slate-400 text-sm">No students found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const AdminFaculty = ({ faculty, setFaculty }: { faculty: Faculty[]; setFaculty: React.Dispatch<React.SetStateAction<Faculty[]>> }) => {
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', designation: 'Lecturer', subject: '', department: '', email: '' });

  const filtered = faculty.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.subject.toLowerCase().includes(search.toLowerCase()) ||
    f.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name) return;
    setFaculty(prev => [...prev, { ...form, id: `T${String(prev.length + 1).padStart(2, '0')}` }]);
    setAdding(false);
    setForm({ name: '', designation: 'Lecturer', subject: '', department: '', email: '' });
  };

  const desigVariant: Record<string, string> = { 'Professor': 'info', 'Assistant Professor': 'accent', 'Lecturer': 'default' };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Faculty Directory</h1>
          <p className="text-sm text-slate-500">{faculty.length} academic staff members</p>
        </div>
        <Btn variant="accent" onClick={() => setAdding(true)}><Plus size={16} /> Add Faculty</Btn>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card className="border-amber-200 bg-amber-50">
              <h3 className="font-bold text-slate-800 mb-4">Register New Faculty</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Inp label="Full Name" value={form.name} onChange={(e: any) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Dr. Jane Smith" />
                <Inp label="Email" type="email" value={form.email} onChange={(e: any) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="j.smith@campus.edu" />
                <Inp label="Subject" value={form.subject} onChange={(e: any) => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="e.g. Machine Learning" />
                <Inp label="Department" value={form.department} onChange={(e: any) => setForm(p => ({ ...p, department: e.target.value }))} placeholder="Computer Science" />
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Designation</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3 text-sm outline-none" value={form.designation} onChange={(e: any) => setForm(p => ({ ...p, designation: e.target.value }))}>
                    <option>Professor</option>
                    <option>Assistant Professor</option>
                    <option>Lecturer</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Btn variant="accent" onClick={handleAdd}><Save size={14} /> Add Faculty</Btn>
                <Btn variant="secondary" onClick={() => setAdding(false)}>Cancel</Btn>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
        <input className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-sm outline-none" placeholder="Search faculty..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(t => (
          <Card key={t.id}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {t.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-slate-800">{t.name}</h3>
                  <Badge variant={desigVariant[t.designation] || 'default'}>{t.designation}</Badge>
                </div>
                <p className="text-sm text-amber-600 font-semibold">{t.subject}</p>
                <p className="text-[11px] text-slate-400 mt-1">{t.department} · <span className="font-mono">{t.id}</span></p>
                <p className="text-[11px] text-slate-400">{t.email}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AdminAttendance = ({ students, setStudents }: { students: Student[]; setStudents: React.Dispatch<React.SetStateAction<Student[]>> }) => {
  const [marking, setMarking] = useState(false);
  const [marks, setMarks] = useState<Record<string, 'P' | 'L' | 'A'>>({});
  const low = students.filter(s => s.attendance < 75);

  const submitAttendance = () => {
    setStudents(prev => prev.map(s => {
      const mark = marks[s.id];
      if (mark === 'A') return { ...s, attendance: Math.max(0, s.attendance - 2) };
      if (mark === 'P') return { ...s, attendance: Math.min(100, s.attendance + 1) };
      return s;
    }));
    setMarks({}); setMarking(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Attendance Management</h1>
          <p className="text-sm text-slate-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <Btn variant="accent" onClick={() => setMarking(!marking)}>
          <CalendarCheck size={16} /> {marking ? 'Cancel' : 'Mark Attendance'}
        </Btn>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Est. Present Today" value="94%" icon={CheckCircle2} color="text-emerald-500" />
        <StatCard label="Avg Attendance" value={(students.reduce((a, s) => a + s.attendance, 0) / students.length).toFixed(1) + '%'} icon={BarChart3} color="text-amber-500" />
        <StatCard label="Below 75%" value={low.length} icon={AlertCircle} sub="At risk" color="text-red-500" />
      </div>

      <AnimatePresence>
        {marking && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card>
              <h3 className="font-bold text-slate-800 mb-1">Mark Today's Attendance</h3>
              <p className="text-sm text-slate-400 mb-4">P = Present · L = Late · A = Absent</p>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {students.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-700">{s.name}</span>
                      <span className="text-xs text-slate-400 hidden sm:block">{s.studentId}</span>
                    </div>
                    <div className="flex gap-2">
                      {(['P', 'L', 'A'] as const).map(st => (
                        <button key={st} onClick={() => setMarks(p => ({ ...p, [s.id]: st }))}
                          className={`w-9 h-9 rounded-lg font-bold text-xs transition-all border ${marks[s.id] === st
                            ? st === 'P' ? 'bg-emerald-500 text-white border-emerald-500' : st === 'A' ? 'bg-red-500 text-white border-red-500' : 'bg-amber-500 text-white border-amber-500'
                            : 'border-gray-200 text-slate-400 hover:border-slate-300'}`}
                        >{st}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-4">
                <Btn variant="accent" onClick={submitAttendance}><Save size={14} /> Submit</Btn>
                <Btn variant="secondary" onClick={() => setMarking(false)}>Cancel</Btn>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <h2 className="font-bold text-slate-800 mb-4">All Students — Attendance Records</h2>
        <div className="space-y-3">
          {students.map(s => (
            <div key={s.id} className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm shrink-0">{s.name.charAt(0)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-semibold text-slate-700 truncate">{s.name}</p>
                  <Badge variant={s.attendance >= 75 ? 'success' : 'error'}>{s.attendance}%</Badge>
                </div>
                <ProgressBar value={s.attendance} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {low.length > 0 && (
        <Card className="border-red-100 bg-red-50">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={18} className="text-red-500" />
            <h3 className="font-bold text-red-700">Students Below 75% Threshold</h3>
          </div>
          <div className="space-y-2">
            {low.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-red-100">
                <div>
                  <span className="text-sm font-bold text-slate-700">{s.name}</span>
                  <span className="text-xs text-slate-400 ml-2">{s.studentId}</span>
                </div>
                <span className="text-sm font-bold text-red-600">{s.attendance}%</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

const AdminAcademics = ({ students }: { students: Student[] }) => {
  const globalGpa = (students.reduce((a, s) => a + s.gpa, 0) / students.length).toFixed(2);
  const gradeData = [
    { grade: 'A+', count: 18, color: 'bg-emerald-500' }, { grade: 'A', count: 32, color: 'bg-emerald-400' },
    { grade: 'B+', count: 45, color: 'bg-amber-400' }, { grade: 'B', count: 38, color: 'bg-amber-300' },
    { grade: 'C', count: 22, color: 'bg-orange-400' }, { grade: 'D', count: 12, color: 'bg-red-400' },
    { grade: 'F', count: 5, color: 'bg-red-600' },
  ];
  const maxCount = Math.max(...gradeData.map(g => g.count));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Academic Performance</h1>
        <p className="text-sm text-slate-500">Consolidated grade analytics — Fall 2025</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Institution GPA" value={globalGpa} icon={TrendingUp} color="text-emerald-500" />
        <StatCard label="Honor Roll" value="24" icon={CheckCircle2} sub="Students" color="text-amber-500" />
        <StatCard label="Courses Active" value={ALL_COURSES.length} icon={FileText} color="text-blue-500" />
        <StatCard label="Failing Students" value="5" icon={AlertCircle} color="text-red-500" />
      </div>

      <Card>
        <h2 className="font-bold text-slate-800 mb-6">Grade Distribution</h2>
        <div className="h-44 flex items-end gap-2 border-b border-l border-gray-100 px-2">
          {gradeData.map((g, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <motion.div initial={{ height: 0 }} animate={{ height: `${(g.count / maxCount) * 100}%` }}
                className={`w-full rounded-t-lg ${g.color} relative group`}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">{g.count}</div>
              </motion.div>
              <span className="text-[11px] font-bold text-slate-400">{g.grade}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-bold text-slate-800 mb-4">Course Offerings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                {['Code', 'Course', 'Credits', 'Department', 'Faculty'].map(h => (
                  <th key={h} className="pb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 pr-5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ALL_COURSES.map(c => {
                const teacher = INITIAL_FACULTY.find(f => f.id === c.facultyId);
                return (
                  <tr key={c.code} className="hover:bg-gray-50">
                    <td className="py-3 pr-5 font-mono text-xs font-bold text-amber-600 whitespace-nowrap">{c.code}</td>
                    <td className="py-3 pr-5 text-sm font-semibold text-slate-700">{c.name}</td>
                    <td className="py-3 pr-5 text-sm text-slate-500">{c.credits}</td>
                    <td className="py-3 pr-5 text-sm text-slate-500 whitespace-nowrap">{c.department}</td>
                    <td className="py-3 text-sm text-slate-500">{teacher?.name || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="font-bold text-slate-800 mb-4">GPA Rankings</h2>
        <div className="space-y-2">
          {[...students].sort((a, b) => b.gpa - a.gpa).map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${i === 0 ? 'bg-amber-400 text-slate-900' : i === 1 ? 'bg-gray-200 text-slate-700' : i === 2 ? 'bg-orange-200 text-orange-800' : 'bg-gray-100 text-slate-500'}`}>{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-700">{s.name}</p>
                <p className="text-xs text-slate-400">{s.department}</p>
              </div>
              <span className={`text-sm font-black ${s.gpa >= 3.7 ? 'text-emerald-600' : s.gpa >= 3.0 ? 'text-amber-600' : 'text-red-500'}`}>{s.gpa.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const AdminActivity = () => {
  const items = [
    { user: 'System', action: 'Automated backup completed successfully', time: '2 min ago', type: 'success' },
    { user: 'Admin', action: 'Updated attendance for CS-501 (32 students)', time: '15 min ago', type: 'info' },
    { user: 'System', action: 'Grade submission deadline reminder sent', time: '1h ago', type: 'warning' },
    { user: 'Dr. Ahmed Khan', action: 'Uploaded midterm results for AI-503', time: '2h ago', type: 'info' },
    { user: 'System', action: 'New student 23k0905 registered successfully', time: '3h ago', type: 'success' },
    { user: 'Admin', action: 'Faculty schedule updated for next week', time: '5h ago', type: 'info' },
    { user: 'System', action: 'Low attendance alert: David Miller (78%)', time: '1d ago', type: 'error' },
    { user: 'Sara Ali', action: 'Assignment 3 marks uploaded for SE-401', time: '1d ago', type: 'info' },
    { user: 'System', action: 'Semester mid-term period commenced', time: '2d ago', type: 'warning' },
    { user: 'Admin', action: 'New course CS-504 Network Security added', time: '3d ago', type: 'success' },
  ];
  const bg: Record<string, string> = { success: 'bg-emerald-50 border-emerald-200', error: 'bg-red-50 border-red-200', warning: 'bg-amber-50 border-amber-200', info: 'bg-blue-50 border-blue-200' };
  const dot: Record<string, string> = { success: 'bg-emerald-500', error: 'bg-red-500', warning: 'bg-amber-500', info: 'bg-blue-500' };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Activity Log</h1>
        <p className="text-sm text-slate-500">System-wide audit trail</p>
      </div>
      <div className="space-y-3">
        {items.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
            <div className={`flex items-start gap-4 p-4 rounded-2xl border ${bg[a.type]}`}>
              <div className={`w-2.5 h-2.5 rounded-full ${dot[a.type]} mt-1.5 shrink-0`} />
              <div className="flex-1">
                <p className="text-sm text-slate-700"><span className="font-bold">{a.user}</span> — {a.action}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AdminSystems = () => {
  const [notifs, setNotifs] = useState({ grades: true, attendance: true, announcements: false, messages: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">System Settings</h1>
        <p className="text-sm text-slate-500">Configure platform preferences</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center"><Bell size={20} className="text-amber-500" /></div>
            <h2 className="font-bold text-slate-800">Notification Settings</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(notifs).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                <button onClick={() => setNotifs(p => ({ ...p, [key]: !val }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${val ? 'bg-amber-400' : 'bg-gray-200'}`}>
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${val ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Shield size={20} className="text-blue-500" /></div>
            <h2 className="font-bold text-slate-800">Security Overview</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: '2FA Authentication', status: 'Enabled', ok: true },
              { label: 'Last Backup', status: '2 hours ago', ok: true },
              { label: 'SSL Certificate', status: 'Valid — 182 days', ok: true },
              { label: 'Pending Updates', status: 'None', ok: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-slate-700">{item.label}</p>
                <Badge variant={item.ok ? 'success' : 'error'}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><Database size={20} className="text-emerald-500" /></div>
            <h2 className="font-bold text-slate-800">Data Management</h2>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-sm font-bold text-emerald-700">All records healthy — 0 errors detected</p>
            </div>
            <Btn variant="secondary" fullWidth><Download size={14} /> Export All Data (CSV)</Btn>
            <Btn variant="secondary" fullWidth><Activity size={14} /> Run Integrity Check</Btn>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center"><Settings size={20} className="text-slate-500" /></div>
            <h2 className="font-bold text-slate-800">Platform Preferences</h2>
          </div>
          <div className="space-y-4">
            <Inp label="Institution Name" defaultValue="Campus AI University" />
            <Inp label="Academic Year" defaultValue="2025-2026" />
            <Btn variant="accent"><Save size={14} /> Save Settings</Btn>
          </div>
        </Card>
      </div>

      <Card className="border-red-100 bg-red-50">
        <h3 className="font-bold text-red-700 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-600 mb-4">These actions are irreversible. Proceed with caution.</p>
        <div className="flex gap-3 flex-wrap">
          <Btn variant="danger">Reset All Attendance</Btn>
          <Btn variant="danger">Clear Activity Logs</Btn>
        </div>
      </Card>
    </div>
  );
};

// ─────────────────────────────────────────────
// STUDENT TAB CONTENTS
// ─────────────────────────────────────────────
const StudentOverview = ({ student, setActiveTab }: { student: Student; setActiveTab: (t: string) => void }) => {
  const courses = ALL_COURSES.filter(c => c.department === student.department).slice(0, 4);

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900 text-white border-none">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center text-slate-900 font-black text-2xl shrink-0">{student.name.charAt(0)}</div>
            <div>
              <h1 className="text-xl font-black">{student.name}</h1>
              <p className="text-amber-400 text-sm font-bold mt-0.5">{student.studentId}</p>
              <p className="text-slate-400 text-xs mt-0.5">{student.department} · {student.batch || 'Fall 2024'}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-black text-amber-400">{student.gpa.toFixed(2)}</p>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">GPA</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-black ${student.attendance >= 75 ? 'text-emerald-400' : 'text-red-400'}`}>{student.attendance}%</p>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider">Attendance</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div onClick={() => setActiveTab('Transcript')} className="cursor-pointer">
          <StatCard label="Academic Standing" value={student.gpa >= 3.5 ? "Dean's List" : 'Good Standing'} icon={GraduationCap} sub="Tap to view transcript" />
        </div>
        <div onClick={() => setActiveTab('Attendance')} className="cursor-pointer">
          <StatCard label="Attendance" value={`${student.attendance}%`} icon={CalendarCheck} sub="Tap for details" color={student.attendance >= 75 ? 'text-emerald-500' : 'text-red-500'} />
        </div>
        <div onClick={() => setActiveTab('Marks')} className="cursor-pointer">
          <StatCard label="Current GPA" value={student.gpa.toFixed(2)} icon={BarChart3} sub="Tap for marks" color="text-blue-500" />
        </div>
        <div onClick={() => setActiveTab('Faculty')} className="cursor-pointer">
          <StatCard label="Enrolled Courses" value={courses.length} icon={FileText} sub="Tap for faculty" color="text-purple-500" />
        </div>
      </div>

      <Card>
        <h2 className="font-bold text-slate-800 mb-4">Enrolled Courses</h2>
        <div className="space-y-3">
          {courses.map(c => {
            const teacher = INITIAL_FACULTY.find(f => f.id === c.facultyId);
            return (
              <div key={c.code} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-amber-400 font-black text-xs shrink-0">{c.credits}cr</div>
                  <div>
                    <p className="font-bold text-slate-700">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.code} · {teacher?.name || 'TBA'}</p>
                  </div>
                </div>
                <Badge variant="default">{c.credits} credits</Badge>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="bg-amber-50 border-amber-100">
        <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Bell size={18} className="text-amber-500" /> Recent Notifications</h2>
        <div className="space-y-3">
          {[
            { msg: 'New grades released: Data Structures (CS-501)', time: '1h ago', type: 'success' },
            { msg: student.attendance >= 75 ? 'Attendance is on track — keep it up!' : 'Warning: Attendance below required threshold', time: '4h ago', type: student.attendance >= 75 ? 'info' : 'error' },
            { msg: 'Lab session rescheduled to H-202 this Thursday', time: '1d ago', type: 'warning' },
          ].map((n, i) => (
            <div key={i} className="flex gap-3 p-3 bg-white rounded-xl border border-amber-100">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === 'success' ? 'bg-emerald-500' : n.type === 'error' ? 'bg-red-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
              <div>
                <p className="text-sm text-slate-700">{n.msg}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const getGrade = (pct: number) => {
  if (pct >= 90) return { grade: 'A+', gp: 4.0 };
  if (pct >= 85) return { grade: 'A', gp: 4.0 };
  if (pct >= 80) return { grade: 'A-', gp: 3.7 };
  if (pct >= 75) return { grade: 'B+', gp: 3.3 };
  if (pct >= 70) return { grade: 'B', gp: 3.0 };
  if (pct >= 65) return { grade: 'B-', gp: 2.7 };
  if (pct >= 60) return { grade: 'C+', gp: 2.3 };
  if (pct >= 55) return { grade: 'C', gp: 2.0 };
  if (pct >= 50) return { grade: 'D', gp: 1.0 };
  return { grade: 'F', gp: 0.0 };
};

const getStudentCourseMarks = (student: Student, allMarks: Marks[]) => {
  const courses = ALL_COURSES.filter(c => c.department === student.department).slice(0, 4);
  return courses.map(c => {
    const m = allMarks.find(x => (x.studentId === student.id || x.studentId === student.studentId) && x.courseCode === c.code)
              || { studentId: student.id, courseCode: c.code, mid: 22, final: 54, assignment: 11, quiz: 7 };
    const total = m.mid + m.final + m.assignment + m.quiz;
    const pct = Math.round((total / 125) * 100);
    const { grade, gp } = getGrade(pct);
    return { ...c, ...m, total, pct, grade, gp };
  });
};

const StudentTranscript = ({ student, marks }: { student: Student; marks: Marks[] }) => {
  const myMarks = getStudentCourseMarks(student, marks);
  const totalCredits = myMarks.reduce((a, m) => a + m.credits, 0);
  const gpa = totalCredits ? (myMarks.reduce((a, m) => a + m.gp * m.credits, 0) / totalCredits).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Academic Transcript</h1>
          <p className="text-sm text-slate-500">Spring 2025 — Official Record</p>
        </div>
        <Btn variant="secondary"><Download size={14} /> Download PDF</Btn>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-slate-900 text-white border-none text-center">
          <p className="text-3xl font-black text-amber-400">{gpa}</p>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Semester GPA</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-black text-slate-800">{totalCredits}</p>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Credits Attempted</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-black text-slate-800">{totalCredits}/128</p>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Degree Progress</p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-4 bg-slate-800 text-white"><p className="text-sm font-bold uppercase tracking-wider">Spring 2025 Grade Sheet</p></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Course', 'Code', 'Cr', 'Quiz', 'Assign', 'Mid', 'Final', 'Total', 'Grade', 'GP'].map(h => (
                  <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {myMarks.map(m => (
                <tr key={m.code} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-bold text-slate-800 whitespace-nowrap">{m.name}</td>
                  <td className="px-4 py-4 text-xs font-mono text-amber-600 whitespace-nowrap">{m.code}</td>
                  <td className="px-4 py-4 text-sm text-slate-500">{m.credits}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{m.quiz}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{m.assignment}</td>
                  <td className="px-4 py-4 text-sm font-bold text-slate-700">{m.mid}</td>
                  <td className="px-4 py-4 text-sm font-bold text-slate-700">{m.final}</td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-black ${m.pct >= 75 ? 'text-emerald-600' : m.pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{m.total}/125</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-black ${m.grade === 'F' ? 'text-red-600' : m.grade.startsWith('A') ? 'text-emerald-600' : 'text-amber-600'}`}>{m.grade}</span>
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-slate-700">{m.gp.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-8">
          <div className="text-right">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Semester GPA</p>
            <p className="text-xl font-black text-slate-800">{gpa}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const StudentAttendance = ({ student, attendance }: { student: Student; attendance: AttendanceRecord[] }) => {
  const courses = ALL_COURSES.filter(c => c.department === student.department).slice(0, 4);
  const myRecords = courses.map(c => {
    const r = attendance.find(x => (x.studentId === student.id || x.studentId === student.studentId) && x.courseCode === c.code)
              || { studentId: student.id, courseCode: c.code, total: 28, attended: Math.round(28 * student.attendance / 100) };
    const pct = Math.min(100, Math.round((r.attended / r.total) * 100));
    return { ...c, ...r, pct };
  });

  const overall = myRecords.length ? Math.round(myRecords.reduce((a, r) => a + r.pct, 0) / myRecords.length) : student.attendance;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Attendance Overview</h1>
        <p className="text-sm text-slate-500">Current semester attendance records</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className={`text-center ${overall < 75 ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
          <p className={`text-3xl font-black ${overall < 75 ? 'text-red-600' : 'text-emerald-600'}`}>{overall}%</p>
          <p className="text-xs text-slate-500 mt-1">Overall Attendance</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-black text-slate-800">{myRecords.reduce((a, r) => a + r.attended, 0)}</p>
          <p className="text-xs text-slate-500 mt-1">Classes Attended</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-black text-red-500">{myRecords.reduce((a, r) => a + (r.total - r.attended), 0)}</p>
          <p className="text-xs text-slate-500 mt-1">Classes Missed</p>
        </Card>
      </div>

      {overall < 75 && (
        <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-100">
          <AlertCircle size={20} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700 font-semibold">Your attendance is below 75%. Minimum required for final exams is 75%.</p>
        </div>
      )}

      <Card>
        <h2 className="font-bold text-slate-800 mb-5">Subject-wise Attendance</h2>
        <div className="space-y-5">
          {myRecords.map(r => (
            <div key={r.code}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-sm font-bold text-slate-700">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.code} · {r.attended}/{r.total} classes</p>
                </div>
                <Badge variant={r.pct >= 75 ? 'success' : r.pct >= 60 ? 'warning' : 'error'}>{r.pct}%</Badge>
              </div>
              <ProgressBar value={r.attended} max={r.total} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-bold text-slate-800 mb-4">Monthly Heatmap</h2>
        <div className="grid grid-cols-7 gap-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-center text-[11px] font-bold text-slate-400 pb-1">{d}</div>
          ))}
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 2;
            const valid = day > 0 && day <= 30;
            const seed = day + student.attendance;
            const status = !valid ? null : seed % 11 === 0 ? 'absent' : seed % 7 === 0 ? 'late' : 'present';
            const cls = !valid ? 'opacity-0' : status === 'absent' ? 'bg-red-400 text-white' : status === 'late' ? 'bg-amber-300 text-slate-800' : 'bg-emerald-400 text-white';
            return (
              <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 ${cls}`}>
                {valid ? day : ''}
              </div>
            );
          })}
        </div>
        <div className="flex gap-6 mt-4 justify-center">
          {[{ label: 'Present', color: 'bg-emerald-400' }, { label: 'Late', color: 'bg-amber-300' }, { label: 'Absent', color: 'bg-red-400' }].map(l => (
            <div key={l.label} className="flex items-center gap-2 text-[11px] text-slate-500">
              <div className={`w-3 h-3 rounded ${l.color}`} /> {l.label}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const StudentMarks = ({ student, marks }: { student: Student; marks: Marks[] }) => {
  const myMarks = getStudentCourseMarks(student, marks);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Examination Marks</h1>
          <p className="text-sm text-slate-500">Component-wise score breakdown</p>
        </div>
        <Btn variant="secondary"><Download size={14} /> Export</Btn>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Average Score" value={myMarks.length ? Math.round(myMarks.reduce((a, m) => a + m.pct, 0) / myMarks.length) + '%' : '—'} icon={TrendingUp} color="text-emerald-500" />
        <StatCard label="Best Performance" value={myMarks.length ? Math.max(...myMarks.map(m => m.total)) + '/125' : '—'} icon={CheckCircle2} color="text-amber-500" />
        <StatCard label="Courses Taken" value={myMarks.length} icon={FileText} color="text-blue-500" />
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-4 bg-slate-800 text-white flex justify-between items-center flex-wrap gap-2">
          <p className="text-sm font-bold uppercase tracking-wider">Score Breakdown</p>
          <p className="text-xs text-slate-400">Mid(30) · Final(70) · Assign(15) · Quiz(10) = 125 total</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Course', 'Mid /30', 'Final /70', 'Assign /15', 'Quiz /10', 'Total /125', 'Grade'].map(h => (
                  <th key={h} className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {myMarks.map(m => (
                <tr key={m.code} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <p className="text-sm font-bold text-slate-800">{m.name}</p>
                    <p className="text-xs font-mono text-amber-600">{m.code}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-bold text-slate-700">{m.mid}</p>
                    <div className="w-14 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden"><div className="h-full bg-blue-400 rounded-full" style={{ width: `${(m.mid / 30) * 100}%` }} /></div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm font-bold text-slate-700">{m.final}</p>
                    <div className="w-14 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden"><div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(m.final / 70) * 100}%` }} /></div>
                  </td>
                  <td className="px-4 py-4 text-sm text-slate-600">{m.assignment}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{m.quiz}</td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-black ${m.pct >= 75 ? 'text-emerald-600' : m.pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{m.total}</span>
                    <span className="text-xs text-slate-400 ml-1">({m.pct}%)</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${m.grade === 'F' ? 'bg-red-100 text-red-700' : m.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{m.grade}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="font-bold text-slate-800 mb-4">Performance Chart</h2>
        <div className="h-36 flex items-end gap-3 border-b border-l border-gray-100 px-2">
          {myMarks.map((m, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <motion.div initial={{ height: 0 }} animate={{ height: `${m.pct}%` }}
                className={`w-full rounded-t-lg relative group ${m.pct >= 75 ? 'bg-emerald-400' : m.pct >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">{m.pct}%</div>
              </motion.div>
              <span className="text-[10px] font-bold text-slate-400 text-center">{m.code}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const StudentFaculty = ({ student }: { student: Student }) => {
  const myFaculty = INITIAL_FACULTY.filter(f => f.department === student.department);
  const desigVariant: Record<string, string> = { 'Professor': 'info', 'Assistant Professor': 'accent', 'Lecturer': 'default' };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Your Instructors</h1>
        <p className="text-sm text-slate-500">Faculty for {student.department}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myFaculty.map(t => (
          <Card key={t.id}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400 font-black text-sm shrink-0">
                {t.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-slate-800">{t.name}</h3>
                  <Badge variant={desigVariant[t.designation] || 'default'}>{t.designation}</Badge>
                </div>
                <p className="text-sm text-amber-600 font-semibold">{t.subject}</p>
                <p className="text-[11px] text-slate-400 mt-1">{t.email}</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <Btn variant="ghost" className="text-xs py-1 px-3"><Mail size={12} /> Contact</Btn>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-amber-50 border-amber-100">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shrink-0"><Bell size={18} className="text-slate-900" /></div>
          <div>
            <h3 className="font-bold text-slate-800">Office Hours & Advisory</h3>
            <p className="text-sm text-slate-600 mt-1">Faculty advisors available Tue & Thu, 2:00–4:00 PM in Block B, Office 302. For urgent queries, email directly or visit the departmental office.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const StudentActivity = () => {
  const items = [
    { msg: 'New grades released: Data Structures (CS-501)', time: '1h ago', type: 'success' },
    { msg: 'Assignment 3 submitted successfully', time: '3h ago', type: 'info' },
    { msg: 'Lab session rescheduled to H-202 on Thursday', time: '1d ago', type: 'warning' },
    { msg: 'Mid-term result: Discrete Math — 28/30', time: '2d ago', type: 'success' },
    { msg: 'Library book "Clean Code" due in 3 days', time: '2d ago', type: 'warning' },
    { msg: 'Attendance warning: OS-502 below 80%', time: '3d ago', type: 'error' },
    { msg: 'Quiz 4 marks uploaded by Dr. Ahmed Khan', time: '4d ago', type: 'info' },
  ];
  const bg: Record<string, string> = { success: 'bg-emerald-50 border-emerald-200', error: 'bg-red-50 border-red-200', warning: 'bg-amber-50 border-amber-200', info: 'bg-blue-50 border-blue-200' };
  const dot: Record<string, string> = { success: 'bg-emerald-500', error: 'bg-red-500', warning: 'bg-amber-500', info: 'bg-blue-500' };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Activity Feed</h1>
        <p className="text-sm text-slate-500">Your recent campus updates</p>
      </div>
      <div className="space-y-3">
        {items.map((a, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={`flex items-start gap-4 p-4 rounded-2xl border ${bg[a.type]}`}>
              <div className={`w-2.5 h-2.5 rounded-full ${dot[a.type]} mt-1.5 shrink-0`} />
              <div>
                <p className="text-sm text-slate-700">{a.msg}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// LAYOUT WRAPPER
// ─────────────────────────────────────────────
const DashboardLayout = ({ tabs, activeTab, setActiveTab, headerRight, children }: {
  tabs: { id: string; label: string; icon: any }[];
  activeTab: string; setActiveTab: (t: string) => void;
  headerRight?: React.ReactNode; children: React.ReactNode;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="hidden lg:block w-64 h-full shrink-0">
        <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
              <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-5 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100"><Menu size={20} /></button>
            <p className="text-sm text-slate-500 hidden sm:block">
              <span className="text-slate-400">Dashboard</span> <span className="mx-1">/</span>
              <span className="font-semibold text-slate-700">{activeTab}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">{headerRight}</div>
        </header>
        <main className="flex-1 overflow-y-auto p-5 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.22 }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    try { const s = localStorage.getItem('campus_ai_user'); return s ? JSON.parse(s) : null; }
    catch { return null; }
  });
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [faculty, setFaculty] = useState<Faculty[]>(INITIAL_FACULTY);
  const [marks] = useState<Marks[]>(DEFAULT_MARKS);
  const [attendance] = useState<AttendanceRecord[]>(DEFAULT_ATTENDANCE);
  const [adminTab, setAdminTab] = useState('Overview');
  const [studentTab, setStudentTab] = useState('Overview');

  const login = (username: string, _pass: string): boolean => {
    if (username === 'admin' && _pass === 'admin') {
      const u: User = { id: '0', name: 'John Doe', role: 'admin' };
      setUser(u); localStorage.setItem('campus_ai_user', JSON.stringify(u)); return true;
    }
    if (username.trim().length >= 3) {
      const existing = students.find(s => s.studentId.toLowerCase() === username.toLowerCase());
      const name = existing?.name || (username === '23k0905' ? 'Ali Khan' : `Student ${username.toUpperCase()}`);
      const dept = existing?.department || 'Computer Science';
      const att = existing?.attendance || 85;
      const gpa = existing?.gpa || 3.5;
      const u: User = { id: username, name, role: 'student', studentId: username, department: dept, attendance: att, gpa };
      if (!existing) {
        setStudents(prev => [...prev, { id: username, name, email: `${username}@campus.edu`, department: dept, attendance: att, gpa, status: 'Active', studentId: username, batch: 'Fall 2024' }]);
      }
      setUser(u); localStorage.setItem('campus_ai_user', JSON.stringify(u)); return true;
    }
    return false;
  };

  const logout = () => { setUser(null); localStorage.removeItem('campus_ai_user'); setAdminTab('Overview'); setStudentTab('Overview'); };

  const adminTabs = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Students', label: 'Students', icon: Users },
    { id: 'Faculty', label: 'Faculty', icon: UserIcon },
    { id: 'Attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'Academics', label: 'Academics', icon: GraduationCap },
    { id: 'Activity', label: 'Activity', icon: Activity },
    { id: 'Systems', label: 'Systems', icon: Settings },
  ];

  const studentTabs = [
    { id: 'Overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'Transcript', label: 'Transcript', icon: GraduationCap },
    { id: 'Attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'Marks', label: 'Marks', icon: BarChart3 },
    { id: 'Faculty', label: 'Faculty', icon: UserIcon },
    { id: 'Activity', label: 'Activity', icon: Bell },
  ];

  const getCurrentStudent = (): Student => {
    if (!user) return INITIAL_STUDENTS[0];
    return students.find(s => s.studentId === user.studentId || s.id === user.id) || {
      id: user.id, name: user.name, email: `${user.studentId}@campus.edu`,
      department: user.department || 'Computer Science', attendance: user.attendance || 85,
      gpa: user.gpa || 3.5, status: 'Active', studentId: user.studentId || user.id, batch: 'Fall 2024',
    };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!user ? (
        <LoginScreen />
      ) : user.role === 'admin' ? (
        <DashboardLayout tabs={adminTabs} activeTab={adminTab} setActiveTab={setAdminTab}
          headerRight={
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input className="bg-gray-50 border border-gray-200 rounded-xl py-1.5 pl-8 pr-3 text-sm outline-none w-44" placeholder="Search..." />
              </div>
              <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-slate-900 font-black text-sm">A</div>
            </div>
          }
        >
          {adminTab === 'Overview' && <AdminOverview students={students} faculty={faculty} />}
          {adminTab === 'Students' && <AdminStudents students={students} setStudents={setStudents} />}
          {adminTab === 'Faculty' && <AdminFaculty faculty={faculty} setFaculty={setFaculty} />}
          {adminTab === 'Attendance' && <AdminAttendance students={students} setStudents={setStudents} />}
          {adminTab === 'Academics' && <AdminAcademics students={students} />}
          {adminTab === 'Activity' && <AdminActivity />}
          {adminTab === 'Systems' && <AdminSystems />}
        </DashboardLayout>
      ) : (
        <DashboardLayout tabs={studentTabs} activeTab={studentTab} setActiveTab={setStudentTab}
          headerRight={
            <div className="flex items-center gap-3">
              <Badge variant={getCurrentStudent().attendance >= 75 ? 'success' : 'error'} >{getCurrentStudent().attendance}% Attendance</Badge>
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400 font-black text-sm">{user.name.charAt(0)}</div>
            </div>
          }
        >
          {studentTab === 'Overview' && <StudentOverview student={getCurrentStudent()} setActiveTab={setStudentTab} />}
          {studentTab === 'Transcript' && <StudentTranscript student={getCurrentStudent()} marks={marks} />}
          {studentTab === 'Attendance' && <StudentAttendance student={getCurrentStudent()} attendance={attendance} />}
          {studentTab === 'Marks' && <StudentMarks student={getCurrentStudent()} marks={marks} />}
          {studentTab === 'Faculty' && <StudentFaculty student={getCurrentStudent()} />}
          {studentTab === 'Activity' && <StudentActivity />}
        </DashboardLayout>
      )}
    </AuthContext.Provider>
  );
}