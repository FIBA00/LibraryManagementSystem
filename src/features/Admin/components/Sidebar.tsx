import { NavLink } from 'react-router'
import { BookOpen, Building2, ChartNoAxesCombined, ChevronRight, ClipboardCheck, LayoutDashboard, LibraryBig, LogOut, Settings, ShieldCheck, Users, X } from 'lucide-react'
import { cn } from '../lib/utils'

const items = [
 {to:'/',label:'Overview',icon:LayoutDashboard}, {to:'/registrations',label:'Registrations',icon:ClipboardCheck,badge:'12'}, {to:'/libraries',label:'Libraries',icon:Building2}, {to:'/users',label:'Members & users',icon:Users}, {to:'/books',label:'Books & catalog',icon:BookOpen}, {to:'/borrowing',label:'Borrowing',icon:LibraryBig}, {to:'/reports',label:'Reports',icon:ChartNoAxesCombined}
]
export function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}) {
 return <><div onClick={onClose} className={cn('fixed inset-0 z-30 bg-slate-950/40 transition-opacity lg:hidden',open?'opacity-100':'pointer-events-none opacity-0')}/><aside className={cn('fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-950 text-slate-300 transition-transform lg:static lg:translate-x-0',open?'translate-x-0':'-translate-x-full')}>
   <div className="flex h-20 items-center justify-between px-6"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-indigo-500 text-white"><ShieldCheck size={21}/></div><div><div className="font-bold text-white">Libra</div><div className="text-xs text-slate-500">Admin Console</div></div></div><button onClick={onClose} className="lg:hidden"><X size={20}/></button></div>
   <nav className="flex-1 space-y-1 px-3 py-4">{items.map(({to,label,icon:Icon,badge})=><NavLink key={to} to={to} onClick={onClose} className={({isActive})=>cn('flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition',isActive?'bg-white/10 text-white':'hover:bg-white/5 hover:text-white')}><Icon size={18}/><span className="flex-1">{label}</span>{badge&&<span className="rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-bold text-white">{badge}</span>}<ChevronRight size={14} className="opacity-40"/></NavLink>)}</nav>
   <div className="border-t border-white/10 p-3"><NavLink to="/settings" onClick={onClose} className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm hover:bg-white/5 hover:text-white"><Settings size={18}/>Settings</NavLink><button className="mt-1 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm hover:bg-white/5 hover:text-white"><LogOut size={18}/>Sign out</button></div>
 </aside></>
}
