import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  GraduationCap, 
  Bell, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  Plus,
  Search,
  ArrowLeft,
  Download,
  AlertCircle,
  Mail,
  Lock,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  FileText,
  User as UserIcon,
  PieChart as PieIcon,
  TrendingUp,
  BarChart3
} from 'lucide-react';

// --- Design System Components ---

const Card = ({ children, className = "", onClick, ...props }: { children: React.ReactNode, className?: string, onClick?: () => void, [key: string]: any }) => (
  <div 
    onClick={onClick}
    {...props}
    className={`bg-surface rounded-xl shadow-subtle border border-gray-100 p-6 ${className} ${onClick ? 'cursor-pointer hover:shadow-card transition-shadow duration-300' : ''}`}
  >
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', className = "", fullWidth = false, ...props }: any) => {
  const variants: any = {
    primary: 'bg-primary text-white hover:bg-opacity-90',
    accent: 'bg-accent text-white hover:bg-opacity-90',
    secondary: 'bg-white border-2 border-gray-100 text-text-primary hover:bg-gray-50',
    ghost: 'hover:bg-gray-100 text-text-secondary'
  };
  return (
    <button 
      className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ label, placeholder, icon: Icon, error, ...props }: any) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</label>}
    <div className="relative group">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={18} />}
      <input 
        className={`w-full bg-gray-50 border ${error ? 'border-error' : 'border-gray-200 focus:border-accent'} rounded-lg py-2.5 ${Icon ? 'pl-10' : 'px-4'} pr-4 text-sm outline-none transition-all duration-200`}
        placeholder={placeholder}
        {...props}
      />
    </div>
    {error && <p className="text-[10px] text-error font-medium">{error}</p>}
  </div>
);

const Badge = ({ variant = 'default', children, className = "" }: { variant?: 'success' | 'warning' | 'error' | 'default', children: React.ReactNode, className?: string }) => {
  const styles = {
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-error/10 text-error',
    default: 'bg-gray-100 text-gray-500'
  };
  return (
    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Switch = ({ enabled, onChange }: { enabled: boolean, onChange: (val: boolean) => void }) => (
    <button 
        onClick={() => onChange(!enabled)}
        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${enabled ? 'bg-accent' : 'bg-gray-200'}`}
    >
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'}`} />
    </button>
);

// --- Screen Components ---

const LoginScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg p-6">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md"
    >
      <Card className="p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="text-accent" size={32} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-display font-bold text-primary">Campus AI</h1>
          <p className="text-text-secondary text-sm mt-1">Smart Student Management System</p>
        </div>
        
        <div className="space-y-5">
          <Input label="Email Address" placeholder="name@campus.edu" icon={Mail} />
          <Input label="Password" type="password" placeholder="••••••••" icon={Lock} />
          
          <div className="flex justify-end">
            <Link to="/forgot-password" title="Restore lost password" className="text-accent text-xs font-semibold hover:underline">Forgot Password?</Link>
          </div>
          
          <Link to="/dashboard" className="block">
            <Button variant="accent" fullWidth>Login to Workspace</Button>
          </Link>
        </div>
        
        <div className="mt-8 text-center text-xs text-text-secondary">
          Not a staff member? <span className="text-accent font-bold cursor-pointer underline">Request Access</span>
        </div>
      </Card>
    </motion.div>
  </div>
);

const ForgotPassword = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg p-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
      <Card className="p-10 shadow-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-accent mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Login
        </Link>
        <h1 className="text-2xl font-display font-bold text-primary mb-2">Reset Password</h1>
        <p className="text-text-secondary text-sm mb-8 italic">Enter your institution email to receive recovery instructions.</p>
        <div className="space-y-6">
          <Input label="Staff Email" placeholder="name@campus.edu" icon={Mail} />
          <Button variant="accent" fullWidth>Request Reset Link</Button>
        </div>
      </Card>
    </motion.div>
  </div>
);

const StudentProfileView = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link to="/students" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} /></Link>
                <h1 className="text-2xl font-bold">Student Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <Card className="lg:col-span-1 text-center py-10">
                    <div className="w-32 h-32 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-gray-50 shadow-lg">
                        <UserIcon size={48} className="text-accent" />
                    </div>
                    <h2 className="text-xl font-bold text-primary">Alexander Pierce</h2>
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mt-1">STD-2024-102</p>
                    <div className="mt-8 flex flex-col gap-3">
                        <Link to="/students/add"><Button variant="secondary" fullWidth className="text-xs py-2">Edit Data</Button></Link>
                        <Button variant="ghost" fullWidth className="text-xs py-2">Message Center</Button>
                    </div>
                </Card>

                <div className="lg:col-span-3 space-y-6">
                    <div className="flex border-b border-gray-100 bg-white p-1 rounded-t-xl">
                        {['Overview', 'Attendance', 'Performance'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-lg ${activeTab === tab ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:bg-gray-50'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <Card>
                        {activeTab === 'Overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { label: 'Full Name', value: 'Alexander Pierce' },
                                    { label: 'Department', value: 'Computer Science' },
                                    { label: 'Batch/Year', value: '2024 / Senior' },
                                    { label: 'Contact', value: '+1 (555) 000-0000' },
                                    { label: 'Guardian', value: 'John Pierce' },
                                    { label: 'Address', value: 'Campus Dorm #12, Building B' },
                                ].map(info => (
                                    <div key={info.label}>
                                        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{info.label}</label>
                                        <p className="text-sm font-semibold mt-1 p-3 bg-bg rounded-lg border border-gray-50">{info.value}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {activeTab === 'Attendance' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center px-1">
                                    <h3 className="font-bold text-primary">Attendance History (Current Term)</h3>
                                    <Badge variant="success">98.5% Consistency</Badge>
                                </div>
                                <div className="overflow-hidden rounded-xl border border-gray-100">
                                    <table className="w-full text-left text-xs">
                                        <thead className="bg-gray-50 uppercase font-black tracking-widest text-text-secondary border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4">Date</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Subject</th>
                                                <th className="px-6 py-4">Verification</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {[
                                                { date: '2026-04-25', status: 'Present', sub: 'CS-501', mode: 'Biometric' },
                                                { date: '2026-04-24', status: 'Present', sub: 'CS-502', mode: 'Manual' },
                                                { date: '2026-04-23', status: 'Late', sub: 'MA-201', mode: 'Biometric' },
                                                { date: '2026-04-22', status: 'Present', sub: 'CS-501', mode: 'Biometric' },
                                                { date: '2026-04-21', status: 'Absent', sub: 'HU-101', mode: 'System' },
                                            ].map((log, i) => (
                                                <tr key={i} className="hover:bg-bg transition-colors">
                                                    <td className="px-6 py-4 font-mono font-bold text-primary">{log.date}</td>
                                                    <td className="px-6 py-4">
                                                        <Badge variant={log.status === 'Present' ? 'success' : log.status === 'Late' ? 'warning' : 'error'}>
                                                            {log.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4 font-bold">{log.sub}</td>
                                                    <td className="px-6 py-4 text-text-secondary italic">{log.mode}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Button variant="ghost" fullWidth className="text-[10px] uppercase font-black">Download Detailed Logs</Button>
                            </div>
                        )}
                        {activeTab === 'Performance' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold">GPA Trend</h3>
                                    <Link to="/report"><Button variant="secondary" className="text-xs py-1.5"><Download size={14} /> Full Report</Button></Link>
                                </div>
                                <div className="h-48 border-b border-l border-gray-50 relative flex items-end px-4">
                                     <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <polyline points="0,80 25,60 50,45 75,30 100,15" fill="none" stroke="#C9A84C" strokeWidth="2" strokeDasharray="5,5" />
                                        <polyline points="0,90 25,70 50,75 75,40 100,20" fill="none" stroke="#1A1A2E" strokeWidth="3" />
                                     </svg>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

const MarkAttendance = ({ students, onUpdate }: { students: any[], onUpdate: (id: string, updates: any) => void }) => {
    const navigate = useNavigate();
    const [marks, setMarks] = useState<Record<string, 'P' | 'L' | 'A'>>({});

    const handleMark = (id: string, status: 'P' | 'L' | 'A') => {
        setMarks(prev => ({ ...prev, [id]: status }));
    };

    const handleSubmit = () => {
        // Logic to update student attendance percentage in a real app would be complex
        // For this demo, we'll just slightly adjust their percentage based on marks
        students.forEach(student => {
            const mark = marks[student.id];
            if (mark === 'A') {
                onUpdate(student.id, { attendance: Math.max(0, student.attendance - 2) });
            } else if (mark === 'P') {
                onUpdate(student.id, { attendance: Math.min(100, student.attendance + 1) });
            }
        });
        navigate('/attendance');
    };

    return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link to="/attendance" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} /></Link>
                <h1 className="text-2xl font-bold">Mark Attendance</h1>
            </div>
            <div className="text-xs font-bold bg-primary text-accent px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                Session: {new Date().toLocaleDateString()}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4"><Input label="Subject" value="Operating Systems" readOnly /></Card>
            <Card className="p-4"><Input label="Class" value="CS-10A" readOnly /></Card>
            <Card className="p-4"><Input label="Total Students" value={students.length} readOnly /></Card>
        </div>

        <Card className="p-0 overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                 <h3 className="font-bold text-sm uppercase tracking-wider">Student Register</h3>
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold"><div className="w-3 h-3 bg-success rounded-full" /> Present</div>
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold"><div className="w-3 h-3 bg-error rounded-full" /> Absent</div>
                 </div>
            </div>
            <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                {students.map((student, i) => (
                    <div key={student.id} className="p-4 flex items-center justify-between hover:bg-bg transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center flex font-bold text-gray-400">#{i+1}</div>
                            <div className="font-bold text-sm">{student.name}</div>
                        </div>
                        <div className="flex gap-2">
                             {['P', 'L', 'A'].map(status => (
                                 <button 
                                    key={status}
                                    title={`Mark as ${status === 'P' ? 'Present' : status === 'L' ? 'Late' : 'Absent'}`}
                                    onClick={() => handleMark(student.id, status as any)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs border transition-all ${
                                        marks[student.id] === status ? 
                                        (status === 'P' ? 'bg-success text-white border-success shadow-lg scale-110' :
                                         status === 'A' ? 'bg-error text-white border-error shadow-lg scale-110' :
                                         'bg-warning text-white border-warning shadow-lg scale-110') :
                                        'bg-white text-gray-300 border-gray-200 hover:border-accent'
                                    }`}
                                 >
                                    {status}
                                 </button>
                             ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>

        <div className="flex justify-end gap-x-4">
            <Link to="/attendance"><Button variant="secondary">Discard</Button></Link>
            <Button variant="accent" className="px-12" onClick={handleSubmit}>Submit Attendance</Button>
        </div>
    </div>
);
};

const SubjectPerformance = () => (
    <div className="space-y-8">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link to="/grades" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} /></Link>
                <div>
                    <h1 className="text-2xl font-bold text-primary">CS-501: Data Structures</h1>
                    <p className="text-xs text-text-secondary font-bold uppercase tracking-widest mt-1">Academic Year 2025-26 • Term 1</p>
                </div>
            </div>
            <div className="flex gap-3">
                <Button variant="secondary" className="text-xs"><Download size={14} /> Subject Syllabus</Button>
                <Button variant="accent" className="text-xs">Full Academic Audit</Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Card className="lg:col-span-3">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="font-bold text-lg uppercase tracking-widest text-primary">Term Performance Map</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase"><div className="w-2 h-2 bg-accent rounded-full" /> Student</div>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase"><div className="w-2 h-2 bg-primary/20 rounded-full" /> Class Avg</div>
                    </div>
                 </div>
                 
                 <div className="h-72 border-b border-l border-gray-100 flex items-end px-8 relative gap-x-8 md:gap-x-12">
                    {[
                        { label: 'Quiz 1', student: 88, avg: 72 },
                        { label: 'Quiz 2', student: 65, avg: 68 },
                        { label: 'Quiz 3', student: 94, avg: 75 },
                        { label: 'Quiz 4', student: 82, avg: 70 },
                        { label: 'Mid-Term', student: 85, avg: 74 },
                    ].map((quiz, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center group">
                            <div className="w-full flex items-end justify-center gap-1.5 h-full relative">
                                <motion.div 
                                    initial={{ height: 0 }} 
                                    animate={{ height: `${quiz.avg}%` }} 
                                    className="w-4 bg-primary/10 rounded-t-lg transition-colors group-hover:bg-primary/20"
                                />
                                <motion.div 
                                    initial={{ height: 0 }} 
                                    animate={{ height: `${quiz.student}%` }} 
                                    className="w-4 bg-accent rounded-t-lg shadow-lg relative"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                        {quiz.student}%
                                    </div>
                                </motion.div>
                            </div>
                            <span className="text-[10px] font-black uppercase mt-6 text-text-secondary whitespace-nowrap">{quiz.label}</span>
                        </div>
                    ))}
                 </div>
            </Card>
            
            <div className="space-y-6">
                <Card className="bg-primary text-white">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60 mb-2">Current Standing</h4>
                    <p className="text-4xl font-black text-accent">Top 5%</p>
                    <p className="text-xs mt-4 italic opacity-80 leading-relaxed">Consistently outperforming the class mean by 14.2% across all technical quizzes.</p>
                </Card>
                
                <Card className="p-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4">Quiz Difficulty Matrix</h4>
                    <div className="space-y-4">
                         {['Most Challenging: Quiz 2', 'Highest Scoring: Quiz 3'].map((item, i) => (
                             <div key={i} className="flex items-center gap-3">
                                 <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-error' : 'bg-success'}`} />
                                 <span className="text-[10px] font-bold uppercase text-primary">{item}</span>
                             </div>
                         ))}
                    </div>
                </Card>
            </div>
        </div>

        <Card className="mt-8">
             <h3 className="font-bold text-lg uppercase tracking-widest text-primary mb-10">Subject Grade Distribution</h3>
             <div className="h-48 flex items-end gap-x-4 px-4 border-b border-gray-100">
                {[
                    { grade: 'F', count: 23, color: 'bg-error/30' },
                    { grade: 'D', count: 50, color: 'bg-warning/30' },
                    { grade: 'C', count: 85, color: 'bg-primary/20' },
                    { grade: 'B', count: 120, color: 'bg-primary/20' },
                    { grade: 'B+', count: 95, color: 'bg-accent' },
                    { grade: 'A-', count: 60, color: 'bg-primary/20' },
                    { grade: 'A', count: 35, color: 'bg-primary/20' },
                ].map((data, i) => {
                    const maxHeight = 120;
                    const h = (data.count / maxHeight) * 100;
                    return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                className={`w-full rounded-t-lg group relative ${data.color} hover:brightness-110 transition-all`}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                                    {data.count} Students
                                </div>
                            </motion.div>
                            <span className="text-[10px] font-black uppercase text-text-secondary pb-2">{data.grade}</span>
                        </div>
                    )
                })}
             </div>
        </Card>
    </div>
);

const NotificationList = () => {
    const [activeTab, setActiveTab] = useState('All');

    const notifications = [
        {
            id: 1,
            category: 'Attendance',
            title: 'Academic Alert: Class Attendance Below Threshold',
            time: '2h ago',
            desc: 'Class BBA-12 has reported an average attendance of 62% for the ongoing week. Review faculty logs immediately.',
            unread: true
        },
        {
            id: 2,
            category: 'Grades',
            title: 'Grade Submission Reminder: CS-501',
            time: '5h ago',
            desc: 'The deadline for submitting mid-term grades for Data Structures (CS-501) is tomorrow at 5:00 PM.',
            unread: true
        },
        {
            id: 3,
            category: 'System',
            title: 'System Maintenance Scheduled',
            time: '1d ago',
            desc: 'Campus AI portals will be offline for scheduled maintenance this Saturday from 2:00 AM to 4:00 AM.',
            unread: false
        },
        {
            id: 4,
            category: 'Attendance',
            title: 'Attendance Discrepancy Flagged',
            time: '1d ago',
            desc: 'Multiple students in MA-201 reported biometrics failure. Manual override may be required.',
            unread: false
        },
        {
            id: 5,
            category: 'Grades',
            title: 'Performance Report Generated',
            time: '2d ago',
            desc: 'The monthly performance analytics report for the Engineering department is now available for download.',
            unread: false
        }
    ];

    const filteredNotifications = activeTab === 'All' 
        ? notifications 
        : notifications.filter(n => n.category === activeTab);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <Button variant="ghost" className="text-xs font-bold uppercase">Mark All Read</Button>
            </div>

            <div className="flex gap-2 p-1 bg-white rounded-xl shadow-subtle mb-6 overflow-x-auto">
                {['All', 'Attendance', 'Grades', 'System'].map((tab) => (
                    <button 
                        key={tab} 
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all whitespace-nowrap ${activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-text-secondary hover:bg-gray-50'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredNotifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            layout
                        >
                            <Card className={`p-4 flex gap-6 hover:border-accent transition-all cursor-pointer group ${notification.unread ? 'border-l-4 border-l-accent' : ''}`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${notification.unread ? 'bg-primary text-accent' : 'bg-gray-50 text-gray-400'}`}>
                                    <Bell size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-sm text-primary group-hover:text-accent transition-colors">{notification.title}</h4>
                                        <span className="text-[10px] font-mono font-bold text-text-secondary uppercase">{notification.time}</span>
                                    </div>
                                    <p className="text-xs text-text-secondary leading-relaxed">{notification.desc}</p>
                                    <div className="mt-2 text-[8px] font-black uppercase tracking-widest text-accent opacity-60">
                                        Category: {notification.category}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                    {filteredNotifications.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <p className="text-sm text-text-secondary italic">No notifications found in this category.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const [activeSection, setActiveSection] = useState('Profile Settings');

    const sections = ['Profile Settings', 'Privacy & Security', 'Notification Config', 'Data & Integration', 'Billing'];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold">System Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                     <div className="bg-white rounded-2xl shadow-subtle overflow-hidden p-2">
                        {sections.map((s) => (
                            <button 
                                key={s} 
                                onClick={() => setActiveSection(s)} 
                                className={`w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all ${activeSection === s ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:bg-gray-50 hover:pl-8'}`}
                            >
                                {s}
                            </button>
                        ))}
                     </div>
                </div>

                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeSection === 'Profile Settings' && <ProfileSettings />}
                            {activeSection === 'Privacy & Security' && <PrivacySettings />}
                            {activeSection === 'Notification Config' && <NotificationConfigSection />}
                            {activeSection === 'Data & Integration' && <DataIntegrationSettings />}
                            {activeSection === 'Billing' && <BillingSettings />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const ProfileSettings = () => (
    <Card className="space-y-10">
        <div className="border-b border-gray-50 pb-8">
            <h3 className="font-bold text-lg mb-6 text-primary uppercase tracking-widest">Staff Profile</h3>
            <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-primary text-accent flex items-center justify-center rounded-2xl relative shadow-xl">
                    <UserIcon size={40} />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-lg border-4 border-white flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                        <Plus size={14} className="text-primary" />
                    </div>
                </div>
                <div>
                        <p className="font-bold text-primary">John Doe</p>
                        <p className="text-xs text-text-secondary mt-1 tracking-wide uppercase font-black">Head of Informatics Division</p>
                        <Badge variant="success" className="mt-4 inline-block">Verified Admin</Badge>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input label="Display Name" placeholder="John Doe" />
            <Input label="Institutional Email" placeholder="doe.j@campus.edu" readOnly />
            <Input label="Designation" placeholder="HOD Computer Science" />
            <Input label="Base Office" placeholder="Block B, Office 302" />
        </div>

        <div className="pt-8 flex justify-end gap-4 border-t border-gray-50">
            <Button variant="secondary">Reset Defaults</Button>
            <Button variant="primary" className="px-10">Save Configuration</Button>
        </div>
    </Card>
);

const PrivacySettings = () => {
    const [tfa, setTfa] = useState(true);
    return (
        <Card className="space-y-10">
            <div className="border-b border-gray-50 pb-8 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-lg text-primary uppercase tracking-widest">Privacy & Security</h3>
                    <p className="text-xs text-text-secondary mt-1">Manage your account access and credentials.</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-text-secondary mb-1">Security Score</p>
                    <Badge variant="success">High</Badge>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-bg rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-6">
                        <div className="p-3 bg-white rounded-xl shadow-sm"><Lock size={20} className="text-accent" /></div>
                        <div>
                            <h4 className="font-bold text-sm text-primary">Two-Factor Authentication</h4>
                            <p className="text-xs text-text-secondary italic">Ensure extra layer of security via mobile code.</p>
                        </div>
                    </div>
                    <Switch enabled={tfa} onChange={setTfa} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Credentials Recovery</h4>
                        <Input label="Current Password" type="password" placeholder="••••••••" />
                        <Input label="New Password" type="password" placeholder="••••••••" />
                        <Button variant="primary" className="w-full">Update Password</Button>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Identity Management</h4>
                        <Input label="Global Username" placeholder="jdoe_campus" />
                        <p className="text-[10px] text-text-secondary italic">Your username is used for internal staff mentions and logging.</p>
                        <Button variant="secondary" className="w-full">Rename Identity</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const NotificationConfigSection = () => (
    <Card className="divide-y divide-gray-50 p-0 overflow-hidden">
        {[
            { title: 'Academic Performance Alerts', desc: 'Real-time push for grade drops or failing marks.', status: true },
            { title: 'Attendance System Logs', desc: 'Daily summary of student presence and absences.', status: true },
            { title: 'Institution Announcements', desc: 'Critical policy updates and campus-wide news.', status: false },
            { title: 'Staff Direct Messages', desc: 'Internal communication between faculty members.', status: true },
        ].map(item => (
            <div key={item.title} className="p-8 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                    <h4 className="font-bold text-sm text-primary mb-1 tracking-tight">{item.title}</h4>
                    <p className="text-xs text-text-secondary italic font-medium">{item.desc}</p>
                </div>
                <div className="flex gap-2 p-1 bg-bg rounded-lg border border-gray-100">
                    <button className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-md transition-all ${!item.status ? 'bg-white shadow-sm text-primary' : 'text-text-secondary hover:text-primary'}`}>OFF</button>
                    <button className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-md transition-all ${item.status ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-primary'}`}>ON</button>
                </div>
            </div>
        ))}
    </Card>
);

const DataIntegrationSettings = () => (
    <Card className="space-y-10">
        <div className="border-b border-gray-50 pb-8">
            <h3 className="font-bold text-lg text-primary uppercase tracking-widest">Data Integrity</h3>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">System-wide data health, backups, and cross-module consistency checks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-bg rounded-2xl border border-gray-100 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-success/10 text-success rounded-xl flex items-center justify-center"><CheckCircle2 size={20} /></div>
                    <h4 className="font-bold text-sm text-primary">System Backups</h4>
                </div>
                <p className="text-xs text-text-secondary italic">Last integrity sync: <span className="font-bold text-primary">2 hours ago</span></p>
                <div className="flex gap-3">
                    <Button variant="primary" className="text-xs py-2">Initialize Backup</Button>
                    <Button variant="secondary" className="text-xs py-2">Logs</Button>
                </div>
            </div>

            <div className="p-8 bg-bg rounded-2xl border border-gray-100 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center"><AlertCircle size={20} /></div>
                    <h4 className="font-bold text-sm text-primary">Integrity Scrub</h4>
                </div>
                <p className="text-xs text-text-secondary italic">Analyze 14,203 student records for inconsistent descriptors.</p>
                <Button variant="accent" className="w-full text-xs">Run Deep Validation</Button>
            </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span className="text-[10px] font-black uppercase text-text-secondary">Cloud Sync: Active (Standard)</span>
            </div>
            <Button variant="ghost" className="text-xs text-accent">Modify Storage Strategy</Button>
        </div>
    </Card>
);

const BillingSettings = () => (
    <Card className="p-0 overflow-hidden">
        <div className="p-10 bg-primary text-white">
            <div className="flex justify-between items-start">
                <div>
                    <Badge variant="warning" className="mb-4">Institution Plan</Badge>
                    <h3 className="text-3xl font-black text-accent uppercase tracking-tighter">Enterprise</h3>
                    <p className="text-xs opacity-60 mt-1 uppercase font-bold tracking-widest">Active since Jan 2024</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase opacity-40 mb-1">Seats Used</p>
                    <p className="text-2xl font-bold">42 / 100</p>
                </div>
            </div>
            
            <div className="mt-10 flex gap-4">
                <Button variant="accent" className="px-8 shadow-xl">Upgrade Capacity</Button>
                <Button variant="secondary" className="bg-transparent border-white/20 text-white hover:bg-white/10">Invoicing Center</Button>
            </div>
        </div>

        <div className="p-10 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Available Subscriptions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { name: 'Academic Lite', price: '$49', desc: 'Up to 500 students, core SIS modules only.', current: false },
                    { name: 'Research Pro', price: '$199', desc: '10k+ students, custom AI analytics & reporting.', current: false },
                ].map(plan => (
                    <div key={plan.name} className="p-6 rounded-2xl border border-gray-100 hover:border-accent transition-all group">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-primary group-hover:text-accent transition-colors">{plan.name}</span>
                            <span className="font-black text-lg text-primary">{plan.price}</span>
                        </div>
                        <p className="text-xs text-text-secondary italic mb-6 leading-relaxed">{plan.desc}</p>
                        <Button variant="secondary" className="w-full text-xs" disabled={plan.current}>
                            {plan.current ? 'Current Plan' : 'Switch Plan'}
                        </Button>
                    </div>
                ))}
            </div>
            <div className="pt-8 border-t border-gray-50">
                 <p className="text-[10px] text-center text-text-secondary uppercase font-bold tracking-widest">Securely processed by <span className="text-primary italic">Campus FinOps</span></p>
            </div>
        </div>
    </Card>
);

const NotificationSettings = () => (
    <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
            <Link to="/settings" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} /></Link>
            <h1 className="text-2xl font-bold">Notification Config</h1>
        </div>
        
        <Card className="divide-y divide-gray-50 p-0 overflow-hidden">
            {[
                { title: 'Academic Performance Alerts', desc: 'Real-time push for grade drops or failing marks.' },
                { title: 'Attendance System Logs', desc: 'Daily summary of student presence and absences.' },
                { title: 'Institution Announcements', desc: 'Critical policy updates and campus-wide news.' },
                { title: 'Staff Direct Messages', desc: 'Internal communication between faculty members.' },
            ].map(item => (
                <div key={item.title} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                        <h4 className="font-bold text-sm text-primary mb-1">{item.title}</h4>
                        <p className="text-xs text-text-secondary italic">{item.desc}</p>
                    </div>
                    <div className="flex gap-2 p-1 bg-bg rounded-lg border border-gray-100">
                        <button className="px-4 py-1.5 text-[10px] font-black uppercase text-text-secondary hover:text-primary transition-colors">OFF</button>
                        <button className="px-4 py-1.5 text-[10px] font-black uppercase bg-primary text-white shadow-md rounded-md">ON</button>
                    </div>
                </div>
            ))}
        </Card>
    </div>
);

const StudentReport = () => (
  <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center bg-primary p-8 rounded-2xl shadow-2xl text-white">
          <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-primary shadow-xl">
                  <GraduationCap size={40} />
              </div>
              <div>
                  <h1 className="text-2xl font-display font-black tracking-widest text-accent uppercase">Campus AI</h1>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-[0.3em] mt-1">Official Academic Transcript</p>
              </div>
          </div>
          <Button variant="accent" className="shadow-lg"><Download size={16} /> PDF Export</Button>
      </div>

      <Card className="p-12 space-y-12 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b-4 border-primary pb-12">
               <div className="flex gap-8 items-center">
                    <div className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-gray-100 flex items-center justify-center font-bold text-2xl text-gray-200">PHOTO</div>
                    <div>
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Student Identity</p>
                        <h2 className="text-xl font-bold text-primary">Alexander Pierce</h2>
                        <p className="text-sm font-mono text-accent">#STD-2024-102</p>
                    </div>
               </div>
               <div className="text-right space-y-2 uppercase">
                    <p className="text-xs font-bold">Batch: Fall 2024</p>
                    <p className="text-xs font-bold">Department: Computer Science</p>
                    <p className="text-xs font-bold text-accent">Status: Honors List</p>
               </div>
          </div>

          <div className="space-y-6">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary border-l-4 border-accent pl-4">Grade Matrix</h3>
               <div className="overflow-x-auto">
                    <table className="w-full text-left uppercase text-xs font-mono">
                        <thead className="bg-bg">
                            <tr>
                                <th className="p-5 border-b border-gray-100">Subject Code</th>
                                <th className="p-5 border-b border-gray-100">Subject Title</th>
                                <th className="p-5 border-b border-gray-100 text-center">GP</th>
                                <th className="p-5 border-b border-gray-100 text-center">Grade</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 italic">
                            {[
                                { code: 'CS-501', title: 'Operating Systems', gp: '4.0', g: 'A+' },
                                { code: 'CS-502', title: 'Data Structures', gp: '3.7', g: 'A-' },
                                { code: 'CS-503', title: 'Computer Architecture', gp: '3.4', g: 'B+' },
                                { code: 'MA-201', title: 'Discrete Mathematics', gp: '4.0', g: 'A+' },
                            ].map(row => (
                                <tr key={row.code} className="hover:bg-bg/50 transition-colors">
                                    <td className="p-5 font-bold">{row.code}</td>
                                    <td className="p-5">{row.title}</td>
                                    <td className="p-5 text-center font-bold">{row.gp}</td>
                                    <td className="p-5 text-center text-accent font-black">{row.g}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
               </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-50 gap-8">
              <div className="flex gap-12">
                  <div className="text-center">
                      <p className="text-[10px] font-bold text-text-secondary uppercase">Cumulative GPA</p>
                      <p className="text-3xl font-black text-primary mt-1">3.82</p>
                  </div>
                  <div className="text-center">
                      <p className="text-[10px] font-bold text-text-secondary uppercase">Ranking</p>
                      <p className="text-3xl font-black text-accent mt-1">12/120</p>
                  </div>
              </div>
              <div className="w-48 h-12 border-b-2 border-gray-200 italic text-[10px] flex items-end justify-center text-gray-300">Registrar Signature</div>
          </div>
      </Card>
  </div>
);

import { useNavigate } from 'react-router-dom';

const StudentForm = ({ onAdd }: { onAdd: (s: any) => void }) => {
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newStudent = {
            name: formData.get('name'),
            studentId: formData.get('studentId'),
            email: formData.get('email'),
            department: formData.get('department'),
            attendance: 100, // Default for new student
            gpa: 0.0, // Default for new student
            status: 'Active'
        };
        onAdd(newStudent);
        navigate('/students');
    };

    return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
            <Link to="/students" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft size={20} /></Link>
            <h1 className="text-2xl font-bold">Maintain Student Record</h1>
        </div>

        <Card className="p-10 space-y-10">
            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="flex flex-col md:flex-row gap-12">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-40 h-40 bg-gray-50 rounded-2xl border-4 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300 hover:border-accent hover:text-accent transition-all cursor-pointer group">
                            <Plus size={32} className="group-hover:scale-125 transition-transform" />
                            <span className="text-[10px] font-bold uppercase mt-2">Upload Profile</span>
                        </div>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Full Name" name="name" placeholder="e.g. Johnathan Doe" required />
                        <Input label="Student ID" name="studentId" placeholder="STD-2024-XXX" required />
                        <Input label="Email Address" name="email" placeholder="john.d@campus.edu" type="email" required />
                        <Input label="Department" name="department" placeholder="Computer Science" required />
                        <div className="md:col-span-2">
                            <Input label="Residential Address" name="address" placeholder="Street, Building, Dorm #" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-50">
                     <Input label="Batch" name="batch" placeholder="Fall 2024" />
                     <Input label="Guardian Contact" name="guardian" placeholder="+1 (000) 000-0000" />
                     <Input label="Scholarship Tier" name="scholarship" placeholder="None / Merit 25%" />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Link to="/students"><Button variant="secondary" type="button">Cancel</Button></Link>
                    <Button variant="accent" className="px-12 shadow-lg" type="submit">Save Record</Button>
                </div>
            </form>
        </Card>
    </div>
);
};

// --- Design System Components ---

const Dashboard = ({ students }: { students: any[] }) => (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-primary">Welcome back, Administrator</h1>
        <p className="text-sm text-text-secondary">Here's a pulse check of the campus today.</p>
      </div>
      <Button variant="primary">
        <Download size={16} /> Generate Daily Report
      </Button>
    </div>

    {/* Stat Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Students', value: students.length.toLocaleString(), icon: Users, trend: '+12%', variant: 'primary' },
        { label: 'Present Today', value: '94%', icon: CalendarCheck, trend: '-2%', variant: 'success' },
        { label: 'Avg Attendance', value: (students.reduce((acc, s) => acc + s.attendance, 0) / students.length).toFixed(1) + '%', icon: BarChart3, trend: '+5%', variant: 'warning' },
        { label: 'Pending Alerts', value: '24', icon: Bell, trend: '+3', variant: 'error' },
      ].map((stat, i) => (
        <Card key={i} className="flex flex-col justify-between h-36 translate-z-0 group hover:-translate-y-1 transition-transform">
          <div className="flex justify-between items-start">
            <div className={`p-2.5 rounded-xl bg-bg border border-gray-100 group-hover:bg-primary transition-colors`}>
              <stat.icon className="text-primary group-hover:text-accent transition-colors" size={20} />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
              {stat.trend}
            </span>
          </div>
          <div className="mt-auto">
            <p className="text-[10px] font-bold uppercase text-text-secondary tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-bold text-primary mt-1">{stat.value}</h3>
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Performance Chart Placeholder */}
      <Card className="lg:col-span-2">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold text-lg">Overall Performance Chart</h2>
          <div className="flex gap-2">
            <Button variant="ghost" className="px-3 py-1">Week</Button>
            <Button variant="secondary" className="px-3 py-1">Month</Button>
          </div>
        </div>
        <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-l border-gray-50 relative">
          {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
            <motion.div 
              key={i} 
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              className="w-8 md:w-12 bg-primary/10 hover:bg-accent transition-colors rounded-t-lg relative group"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Score: {h}
              </div>
            </motion.div>
          ))}
          <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
            {[1,2,3,4].map(i => <div key={i} className="w-full border-t border-primary" />)}
          </div>
        </div>
        <div className="flex justify-between mt-4 px-4 text-[10px] font-bold text-text-secondary uppercase">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
        </div>
      </Card>

      {/* Activity Feed */}
      <Card className="flex flex-col h-full">
        <h2 className="font-bold text-lg mb-6">Recent Activity</h2>
        <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {[
            { user: 'Sarah Smith', action: 'applied for Leave', time: '2m ago', icon: FileText, color: 'success' },
            { user: 'David Miller', action: 'failed Math Quiz', time: '15m ago', icon: AlertCircle, color: 'error' },
            { user: 'System', action: 'Term 1 Grades Published', time: '1h ago', icon: Bell, color: 'warning' },
            { user: 'Principal', action: 'updated Policy #901', time: '2h ago', icon: Settings, color: 'primary' },
          ].map((activity, i) => (
            <div key={i} className="flex gap-4 group">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-gray-100 bg-gray-50 group-hover:bg-primary transition-colors`}>
                  <activity.icon size={16} className="text-text-secondary group-hover:text-accent transition-colors" />
               </div>
               <div>
                  <p className="text-sm">
                    <span className="font-bold text-primary">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-[10px] text-text-secondary mt-1">{activity.time}</p>
               </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" fullWidth className="mt-6 border-t pt-4">View All Logs</Button>
      </Card>
    </div>
  </div>
);

const StudentList = ({ students, onUpdate }: { students: any[], onUpdate: (id: string, updates: any) => void }) => {
  const [editingEmail, setEditingEmail] = useState<string | null>(null);

  return (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-primary">Student Directory</h1>
        <p className="text-sm text-text-secondary">Managing {students.length} active students</p>
      </div>
      <Link to="/students/add">
        <Button variant="accent">
          <Plus size={18} /> Add New Student
        </Button>
      </Link>
    </div>

    <Card className="p-0 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row gap-4">
        <Input placeholder="Search students by name, ID, or department..." icon={Search} />
        <Button variant="secondary">
          <Filter size={16} /> Filters
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {['Name', 'Student ID', 'Department', 'Attendance', 'GPA', 'Status', ''].map(h => (
                <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {students.map(student => (
              <tr 
                key={student.id} 
                className="hover:bg-bg cursor-pointer transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Link to="/students/view" className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center font-bold text-primary overflow-hidden hover:bg-primary/10">
                       <UserIcon size={18} />
                    </Link>
                    <div>
                      <div className="text-sm font-bold text-primary group-hover:text-accent transition-colors">{student.name}</div>
                      {editingEmail === student.id ? (
                        <input 
                          autoFocus
                          className="text-[10px] text-accent bg-transparent border-b border-accent outline-none"
                          defaultValue={student.email}
                          onBlur={(e) => {
                            onUpdate(student.id, { email: e.target.value });
                            setEditingEmail(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onUpdate(student.id, { email: (e.target as HTMLInputElement).value });
                              setEditingEmail(null);
                            }
                          }}
                        />
                      ) : (
                        <div 
                          className="text-[10px] text-text-secondary hover:text-accent italic cursor-text"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingEmail(student.id);
                          }}
                        >
                          {student.email}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-mono font-bold text-text-secondary">{student.studentId}</td>
                <td className="px-6 py-4 text-xs font-semibold">{student.department}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${student.attendance < 75 ? 'bg-error' : 'bg-success'}`} 
                        style={{ width: `${student.attendance}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-bold">{student.attendance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <div className="flex items-center gap-1">
                      <TrendingUp size={12} className={student.gpa >= 3.5 ? 'text-success' : 'text-warning'} />
                      <span className="text-sm font-bold">{student.gpa}</span>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={student.status === 'On Probation' ? 'warning' : 'success'}>
                    {student.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" className="p-2 min-w-0" onClick={(e: any) => e.stopPropagation()}>
                    <MoreVertical size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-text-secondary">
        <div>Showing 1-{students.length} of {students.length} entries</div>
        <div className="flex gap-2">
           <Button variant="secondary" className="px-3 py-1 text-[10px]">Prev</Button>
           <Button variant="secondary" className="px-3 py-1 text-[10px]">Next</Button>
        </div>
      </div>
    </Card>
  </div>
);
};

const AttendanceOverview = ({ students }: { students: any[] }) => {
  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  // Generate a consistent "random" pattern based on student id for the demo
  const getAttendanceStatus = (day: number, studentId: string) => {
    const seed = parseInt(studentId) + day;
    if (seed % 11 === 0) return 'error';
    if (seed % 7 === 0) return 'warning';
    if (seed % 3 === 0) return 'success';
    return 'success-light';
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold">Attendance Analytics</h1>
         <Link to="/attendance/mark">
            <Button variant="accent">Mark Today's Attendance</Button>
         </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Student Selection Table */}
         <Card className="lg:col-span-4 h-[600px] flex flex-col overflow-hidden">
            <div className="mb-6">
              <h2 className="font-bold text-lg">Student Directory</h2>
              <p className="text-xs text-text-secondary mt-1">Select a student to view details</p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
               {students.map((student) => (
                  <div 
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${selectedStudent?.id === student.id ? 'border-accent bg-accent/5 shadow-sm' : 'border-gray-50 hover:border-gray-200 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${selectedStudent?.id === student.id ? 'bg-accent text-white' : 'bg-gray-100 text-text-secondary group-hover:bg-primary group-hover:text-white'}`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">{student.name}</p>
                        <p className="text-[10px] text-text-secondary font-medium uppercase tracking-wider">{student.studentId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-black ${student.attendance > 90 ? 'text-success' : student.attendance > 80 ? 'text-primary' : 'text-error'}`}>
                        {student.attendance}%
                      </p>
                    </div>
                  </div>
               ))}
            </div>
         </Card>

         {/* Detailed View */}
         <div className="lg:col-span-8 space-y-8">
            <Card className="relative overflow-hidden group">
               {/* Decorative background for selected student */}
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <UserIcon size={120} />
               </div>

               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="font-bold text-xl text-primary">{selectedStudent?.name}</h2>
                      <div className="flex gap-4 mt-2">
                        <Badge variant="success">{selectedStudent?.department}</Badge>
                        <Badge variant="default">{selectedStudent?.studentId}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-text-secondary tracking-[0.2em] mb-1">Total Attendance</p>
                      <p className="text-4xl font-black text-primary">{selectedStudent?.attendance}%</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-text-secondary flex items-center gap-2">
                      Monthly Heatmap
                    </h3>
                    <div className="flex gap-3 text-[10px] font-black uppercase">
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-success rounded-full" /> Present</div>
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-error rounded-full" /> Absent</div>
                       <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-warning rounded-full" /> Late</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2 sm:gap-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                       <div key={d} className="text-center text-[10px] font-black uppercase text-text-secondary opacity-50 pb-2">{d}</div>
                    ))}
                    {Array.from({ length: 35 }).map((_, i) => {
                       const day = i - 3;
                       const isValid = day > 0 && day <= 30;
                       let bgClass = 'bg-gray-50';
                       let statusLabel = '';
                       if (isValid) {
                          const status = getAttendanceStatus(day, selectedStudent?.id || '0');
                          if (status === 'error') bgClass = 'bg-error text-white';
                          else if (status === 'warning') bgClass = 'bg-warning text-white';
                          else if (status === 'success') bgClass = 'bg-success text-white';
                          else bgClass = 'bg-success/40 text-white';
                          statusLabel = status;
                       }
                       return (
                          <div 
                            key={i} 
                            title={isValid ? `Day ${day}: ${statusLabel}` : ''}
                            className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all hover:scale-110 cursor-pointer ${bgClass} ${!isValid ? 'opacity-0 pointer-events-none' : 'shadow-sm'}`}
                          >
                             {isValid ? day : ''}
                          </div>
                       );
                    })}
                  </div>
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="flex items-center gap-6 p-8">
                  <div className="w-20 h-20 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                       <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={220} strokeDashoffset={220 * (1 - (selectedStudent?.attendance / 100))} className="text-accent" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-primary mb-1">Consistency Score</h4>
                    <p className="text-xs text-text-secondary leading-relaxed">Student is performing {selectedStudent?.attendance > 90 ? 'exceptionally well' : 'stably'} in regular lectures.</p>
                  </div>
               </Card>

               <Card className="bg-primary text-white p-8">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">Quick Insights</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="opacity-60">Consecutive Days present</span>
                      <span className="font-bold">12 Days</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="opacity-60">Missed Morning sessions</span>
                      <span className="font-bold text-error">2</span>
                    </div>
                  </div>
               </Card>
            </div>
         </div>
      </div>
    </div>
  );
};

const GradesOverview = ({ students }: { students: any[] }) => {
  const globalGpa = (students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(2);

  return (
  <div className="space-y-8">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-primary">Academic Performance</h1>
        <p className="text-sm text-text-secondary">Consolidated grading overview for Fall 2025</p>
      </div>
      <div className="flex gap-3">
         <Button variant="secondary">Global GPA: {globalGpa}</Button>
         <Button variant="accent"><PieIcon size={16} /> Analysis</Button>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {[
          { subject: 'Mathematics', grade: 'A-', trend: 'up', students: 120 },
          { subject: 'Physics', grade: 'B+', trend: 'down', students: 84 },
          { subject: 'Computer Sci', grade: 'A+', trend: 'up', students: 212 },
          { subject: 'Literature', grade: 'B', trend: 'stable', students: 95 },
       ].map((sub, i) => (
          <Card key={i} className="hover:border-accent group" onClick={() => window.location.href='/grades/subject'}>
             <div className="flex justify-between mb-4">
                <h3 className="font-bold text-primary">{sub.subject}</h3>
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                   <ChevronRight size={14} />
                </div>
             </div>
             <div className="text-4xl font-black text-primary mb-4">{sub.grade}</div>
             <div className="flex justify-between items-end">
                <div className="text-[10px] font-bold text-text-secondary uppercase">
                   {sub.students} Enrolled
                </div>
                {sub.trend === 'up' ? <TrendingUp className="text-success" size={18} /> : sub.trend === 'down' ? <TrendingUp className="text-error rotate-90" size={18} /> : <div className="h-1 w-4 bg-gray-200" />}
             </div>
          </Card>
       ))}
    </div>

    <Card>
       <div className="flex justify-between items-center mb-10">
          <h2 className="text-lg font-bold">Grade Distribution</h2>
          <Button variant="ghost" className="text-xs">Download CSV</Button>
       </div>
       <div className="h-64 flex items-end gap-1 px-4 border-b border-gray-100">
          {[
             { grade: 'F', count: 23, color: 'bg-error/30' },
             { grade: 'D', count: 50, color: 'bg-warning/30' },
             { grade: 'C', count: 85, color: 'bg-primary/20' },
             { grade: 'B', count: 156, color: 'bg-primary/20' },
             { grade: 'B+', count: 212, color: 'bg-accent' },
             { grade: 'A-', count: 140, color: 'bg-primary/20' },
             { grade: 'A', count: 65, color: 'bg-primary/20' },
          ].map((data, i) => {
             const maxHeight = 212; 
             const h = (data.count / maxHeight) * 100;
             return (
             <div key={i} className="flex-1 flex flex-col items-center gap-4 h-full justify-end">
                <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${h}%` }}
                   className={`w-full max-w-[60px] rounded-t-xl group relative ${data.color} hover:brightness-110 transition-all`}
                >
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap z-10">
                      {data.count} Students
                   </div>
                </motion.div>
                <div className="text-[10px] font-black uppercase text-text-secondary rotate-45 sm:rotate-0 mt-4 whitespace-nowrap pb-2">
                   {data.grade}
                </div>
             </div>
          )})}
       </div>
    </Card>
  </div>
  );
};

// --- Layout & Components ---

const SidebarItem = ({ to, label, icon: Icon, active }: any) => (
  <Link 
    to={to} 
    className={`flex items-center gap-4 px-6 py-4 transition-all relative group ${active ? 'bg-white/10 text-accent font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
  >
    {active && <motion.div layoutId="nav-pill" className="absolute left-0 w-1.5 h-full bg-accent rounded-r-full" />}
    <Icon size={20} className={active ? 'text-accent' : 'text-gray-400 group-hover:text-white'} />
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </Link>
);

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAuth = location.pathname === '/' || location.pathname === '/forgot-password';

  if (isAuth) return <>{children}</>;

  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 bg-primary text-white z-50 shadow-2xl">
        <div className="p-8 mb-10">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <GraduationCap className="text-primary" size={28} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white tracking-widest">CAMPUS AI</h1>
              <p className="text-[8px] font-bold text-accent tracking-[0.4em] uppercase opacity-70">Admin Portal</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1">
          {[
            { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
            { path: '/students', label: 'Students', icon: Users },
            { path: '/attendance', label: 'Attendance', icon: CalendarCheck },
            { path: '/grades', label: 'Academics', icon: GraduationCap },
            { path: '/notifications', label: 'Activity', icon: Bell },
            { path: '/settings', label: 'Systems', icon: Settings },
            { path: '/usability-testing', label: 'Testing', icon: AlertCircle },
          ].map(item => (
            <SidebarItem 
               key={item.path}
               to={item.path}
               label={item.label}
               icon={item.icon}
               active={location.pathname.startsWith(item.path)}
            />
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 space-y-6">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold">JD</div>
              <div>
                 <p className="text-xs font-bold">John Doe</p>
                 <p className="text-[10px] opacity-40 uppercase font-bold tracking-wider">HOD Computer Science</p>
              </div>
           </div>
           <Link to="/" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-error/60 hover:text-error transition-colors">
              <LogOut size={16} /> Terminate Session
           </Link>
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <header className="lg:hidden h-20 bg-primary px-6 flex items-center justify-between sticky top-0 z-50">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
              <GraduationCap className="text-primary" size={24} />
            </div>
            <span className="font-bold text-white tracking-tighter text-lg uppercase">Campus AI</span>
         </div>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
         </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
         {mobileMenuOpen && (
            <motion.div 
               initial={{ x: '-100%' }}
               animate={{ x: 0 }}
               exit={{ x: '-100%' }}
               className="lg:hidden fixed inset-0 bg-primary text-white z-40 pt-24"
            >
               <nav className="p-8 space-y-4">
                  {[
                    { path: '/dashboard', label: 'Overview', icon: LayoutDashboard },
                    { path: '/students', label: 'Students', icon: Users },
                    { path: '/attendance', label: 'Attendance', icon: CalendarCheck },
                    { path: '/grades', label: 'Academics', icon: GraduationCap },
                  ].map(item => (
                    <Link 
                       key={item.path} 
                       to={item.path} 
                       onClick={() => setMobileMenuOpen(false)}
                       className="flex items-center gap-6 text-2xl font-bold uppercase tracking-widest border-b border-white/5 pb-6 text-gray-300 active:text-accent"
                    >
                       <item.icon size={28} /> {item.label}
                    </Link>
                  ))}
               </nav>
            </motion.div>
         )}
      </AnimatePresence>

      <main className="flex-1 lg:ml-72 min-h-screen">
        <header className="hidden lg:flex h-24 bg-white border-b border-gray-100 px-12 items-center justify-between sticky top-0 z-40">
           <div className="text-[11px] font-black uppercase text-text-secondary flex items-center gap-3">
              <span className="opacity-40">Portal</span> / <span className="text-primary">{location.pathname.split('/')[1] || 'Dashboard'}</span>
           </div>
           
           <div className="flex items-center gap-8">
              <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={16} />
                 <input className="bg-bg border border-transparent focus:border-gray-200 outline-none rounded-full pl-10 pr-4 py-2 text-xs w-64 transition-all" placeholder="Global search..." />
              </div>
              <div className="flex gap-4">
                 <Link to="/notifications" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center relative hover:bg-bg cursor-pointer transition-colors">
                    <Bell size={18} className="text-text-secondary" />
                    <div className="absolute top-0 right-0 w-3 h-3 bg-error rounded-full border-2 border-white" />
                 </Link>
                 <Link to="/settings" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center hover:bg-bg cursor-pointer transition-colors overflow-hidden">
                    <UserIcon size={18} className="text-text-secondary" />
                 </Link>
              </div>
           </div>
        </header>

        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const INITIAL_STUDENTS = [
  { id: '1', name: 'Alexander Pierce', email: 'pierce@campus.edu', department: 'Computer Science', attendance: 85, gpa: 3.8, status: 'Active', studentId: 'STD-2024-102' },
  { id: '2', name: 'Sarah Smith', email: 'sarah.s@campus.edu', department: 'Business Admin', attendance: 92, gpa: 3.9, status: 'Active', studentId: 'STD-2024-105' },
  { id: '3', name: 'David Miller', email: 'miller.d@campus.edu', department: 'Mechanical Eng', attendance: 78, gpa: 3.2, status: 'On Probation', studentId: 'STD-2024-110' },
  { id: '4', name: 'Emily White', email: 'emily.w@campus.edu', department: 'Electrical Eng', attendance: 95, gpa: 4.0, status: 'Active', studentId: 'STD-2024-115' },
  { id: '5', name: 'Michael Ross', email: 'ross.m@campus.edu', department: 'Law', attendance: 88, gpa: 3.6, status: 'Active', studentId: 'STD-2024-120' },
  { id: '6', name: 'Jessica Day', email: 'jday@campus.edu', department: 'Fine Arts', attendance: 82, gpa: 3.5, status: 'Active', studentId: 'STD-2024-125' },
];

export default function App() {
  const [students, setStudents] = useState<any[]>(INITIAL_STUDENTS);

  const addStudent = (student: any) => {
    setStudents(prev => [{ ...student, id: Date.now().toString() }, ...prev]);
  };

  const updateStudent = (id: string, updates: any) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard students={students} />} />
          
          <Route path="/students" element={<StudentList students={students} onUpdate={updateStudent} />} />
          <Route path="/students/view" element={<StudentProfileView />} />
          <Route path="/students/add" element={<StudentForm onAdd={addStudent} />} />
          
          <Route path="/attendance" element={<AttendanceOverview students={students} />} />
          <Route path="/attendance/mark" element={<MarkAttendance students={students} onUpdate={updateStudent} />} />
          
          <Route path="/grades" element={<GradesOverview students={students} />} />
          <Route path="/grades/subject" element={<SubjectPerformance />} />
          <Route path="/report" element={<StudentReport />} />
          
          <Route path="/notifications" element={<NotificationList />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notification-settings" element={<NotificationSettings />} />
          <Route path="/usability-testing" element={<UsabilityTesting />} />
          
          <Route path="*" element={<Dashboard students={students} />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

const UsabilityTesting = () => {
    const tasks = [
        { id: 1, title: 'Login Access', desc: 'Log in using your admin credentials to access the secure portal.', success: 'Reaches Dashboard' },
        { id: 2, title: 'Student Entry', desc: 'Register a new student: Ali Raza (ID: 24K0001) in Computer Science.', success: 'Record saved to Directory' },
        { id: 3, title: 'Marking Presence', desc: 'Perform daily roll call: 3 students present, 2 absent.', success: 'Attendance log updated' },
        { id: 4, title: 'Audit Performance', desc: 'Analyze the grade trend for student Alexander Pierce.', success: 'Viewed performance chart' },
        { id: 5, title: 'Communication Check', desc: 'Locate and read the latest Low Attendance alert.', success: 'Notification status changed' },
    ];

    return (
        <div className="space-y-12 pb-20">
            <div className="max-w-4xl">
                <h1 className="text-3xl font-bold text-primary mb-4">Phase 4: Usability Testing</h1>
                <p className="text-text-secondary">Perform the following standardized tasks to validate the system architecture and interface efficiency.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map(task => (
                    <Card key={task.id} className="border-t-4 border-t-accent flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[10px] font-black bg-primary text-white px-2 py-0.5 rounded">TASK 0{task.id}</span>
                            <Badge variant="default">Testing</Badge>
                        </div>
                        <h3 className="font-bold text-primary mb-2">{task.title}</h3>
                        <p className="text-xs text-text-secondary italic mb-6 leading-relaxed">"{task.desc}"</p>
                        <div className="mt-auto pt-4 border-t border-gray-50">
                            <p className="text-[10px] font-bold uppercase text-accent">Success Condition:</p>
                            <p className="text-[10px] font-medium text-primary mt-1">{task.success}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                <Card className="bg-primary text-white p-10">
                    <h2 className="text-xl font-bold mb-8 uppercase tracking-widest text-accent">Internal Metrics</h2>
                    <div className="space-y-6">
                        {[
                            { label: 'Task Completion Rate', val: '94%' },
                            { label: 'Avg. Time on Task', val: '18.2s' },
                            { label: 'Error Rate', val: '1.2%' },
                            { label: 'User Satisfaction', val: '4.8/5' },
                        ].map(m => (
                            <div key={m.label} className="flex justify-between items-end border-b border-white/10 pb-2">
                                <span className="text-xs font-bold opacity-60 uppercase">{m.label}</span>
                                <span className="text-xl font-black text-accent">{m.val}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-10">
                    <h2 className="text-xl font-bold text-primary mb-8 uppercase tracking-widest">Feedback Terminal</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-bold text-text-secondary uppercase mb-4 block">Overall Rating</label>
                            <div className="flex gap-2">
                                {[1,2,3,4,5].map(s => <div key={s} className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center font-bold text-xs cursor-pointer transition-all ${s <= 4 ? 'border-accent bg-accent text-white' : 'border-gray-100 text-gray-200 hover:border-accent hover:text-accent'}`}>{s}</div>)}
                            </div>
                        </div>
                        <Input label="Point of Friction" placeholder="What was confusing?" />
                        <Input label="System Strengths" placeholder="What worked well?" />
                        <Button variant="accent" fullWidth className="mt-4">Submit Evaluation</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};
