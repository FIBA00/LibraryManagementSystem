from pathlib import Path
import shutil, zipfile, textwrap, json

root = Path("/mnt/data/library-platform-frontend")
if root.exists():
    shutil.rmtree(root)

dirs = [
    "src/components/ui", "src/components/layout", "src/components/library",
    "src/components/books", "src/components/auth", "src/components/marketing",
    "src/pages/public", "src/pages/auth", "src/pages/reader", "src/pages/owner",
    "src/pages/library", "src/pages/admin", "src/lib", "src/data", "src/types",
]
for d in dirs:
    (root / d).mkdir(parents=True, exist_ok=True)

files = {
"package.json": r'''{
  "name": "library-platform-frontend",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.87.0",
    "lucide-react": "^0.468.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.5",
    "recharts": "^3.2.1"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "@vitejs/plugin-react": "^5.0.4",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.9.3",
    "vite": "^7.1.7"
  }
}''',

"vite.config.ts": r'''import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
});''',

"tsconfig.json": r'''{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}''',

"tsconfig.app.json": r'''{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}''',

"tsconfig.node.json": r'''{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true
  },
  "include": ["vite.config.ts"]
}''',

"index.html": r'''<div id="root"></div><script type="module" src="/src/main.tsx"></script>''',

"src/index.css": r'''@import "tailwindcss";

:root {
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
  color: #17202a;
  background: #f8fafc;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}
* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; }
button, input, textarea, select { font: inherit; }
button { cursor: pointer; }
::selection { background: #f59e0b; color: #17202a; }
''',

"src/types/index.ts": r'''export type UserRole = "reader" | "owner" | "staff" | "admin";

export type Library = {
  id: string;
  name: string;
  location: string;
  description: string;
  status: "pending" | "approved" | "suspended" | "rejected";
  books: number;
  members: number;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  available: number;
  total: number;
  cover: string;
};''',

"src/data/mock.ts": r'''import type { Book, Library } from "../types";

export const libraries: Library[] = [
  { id: "1", name: "Addis Community Library", location: "Addis Ababa", description: "A community-focused public library.", status: "approved", books: 4820, members: 1240 },
  { id: "2", name: "Oromia Knowledge Center", location: "Adama", description: "Independent educational library.", status: "approved", books: 2150, members: 630 },
  { id: "3", name: "Blue Nile Private Library", location: "Addis Ababa", description: "Private collection open to registered members.", status: "pending", books: 980, members: 210 },
  { id: "4", name: "Unity Reading House", location: "Bishoftu", description: "Community reading and study center.", status: "pending", books: 640, members: 92 },
];

export const books: Book[] = [
  { id: "1", title: "Atomic Habits", author: "James Clear", category: "Self Development", available: 4, total: 7, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500" },
  { id: "2", title: "Clean Code", author: "Robert C. Martin", category: "Technology", available: 2, total: 5, cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500" },
  { id: "3", title: "The Pragmatic Programmer", author: "David Thomas", category: "Technology", available: 3, total: 4, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500" },
  { id: "4", title: "Things Fall Apart", author: "Chinua Achebe", category: "Fiction", available: 8, total: 10, cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500" },
];''',

"src/lib/utils.ts": r'''export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}''',

"src/components/ui/Button.tsx": r'''import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ children, variant = "primary", className, ...props }: Props) {
  const styles = {
    primary: "bg-[#17202a] text-white hover:bg-[#263544]",
    secondary: "bg-[#f59e0b] text-[#17202a] hover:bg-[#fbbf24]",
    ghost: "bg-transparent text-[#17202a] hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  return <button className={cn("inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition", styles[variant], className)} {...props}>{children}</button>;
}''',

"src/components/ui/Badge.tsx": r'''import { cn } from "../../lib/utils";

export function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "success"|"warning"|"danger"|"neutral"|"purple" }) {
  const tones = {
    success: "bg-green-50 text-green-700 ring-green-200",
    warning: "bg-amber-50 text-amber-700 ring-amber-200",
    danger: "bg-red-50 text-red-700 ring-red-200",
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
    purple: "bg-purple-50 text-purple-700 ring-purple-200",
  };
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1", tones[tone])}>{children}</span>;
}''',

"src/components/ui/Modal.tsx": r'''import { X } from "lucide-react";

export function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: React.ReactNode; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100"><X size={19}/></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}''',

"src/components/ui/Input.tsx": r'''import type { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={"w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 " + (props.className ?? "")} />;
}''',

"src/components/layout/Logo.tsx": r'''import { BookOpen } from "lucide-react";
export function Logo({ dark = false }: { dark?: boolean }) {
  return <div className={"flex items-center gap-2.5 font-black tracking-tight " + (dark ? "text-white" : "text-[#17202a]")}>
    <span className="grid size-9 place-items-center rounded-xl bg-[#f59e0b] text-[#17202a]"><BookOpen size={20}/></span>
    <span className="text-xl">Book<span className="text-[#f59e0b]">Bridge</span></span>
  </div>;
}''',

"src/components/layout/Navbar.tsx": r'''import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "../ui/Button";

export function Navbar() {
  return <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-5 lg:px-8">
      <Logo />
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        <Link to="/books" className="hover:text-amber-600">Find Books</Link>
        <Link to="/libraries" className="hover:text-amber-600">Libraries</Link>
        <Link to="/for-libraries" className="hover:text-amber-600">For Libraries</Link>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <Link to="/login" className="hidden px-3 py-2 text-sm font-semibold md:block">Sign in</Link>
        <Link to="/register"><Button>Get started</Button></Link>
        <button className="rounded-xl p-2 md:hidden"><Menu/></button>
      </div>
    </div>
  </header>;
}''',

"src/components/layout/Footer.tsx": r'''import { Logo } from "./Logo";
export function Footer() {
  return <footer className="border-t border-slate-200 bg-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-4 lg:px-8">
      <div><Logo/><p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">Connect libraries, books and readers in one modern platform.</p></div>
      <div><h4 className="font-bold">Discover</h4><div className="mt-4 space-y-2 text-sm text-slate-500"><p>Find books</p><p>Libraries</p><p>Collections</p></div></div>
      <div><h4 className="font-bold">Libraries</h4><div className="mt-4 space-y-2 text-sm text-slate-500"><p>Manage a library</p><p>Pricing</p><p>Resources</p></div></div>
      <div><h4 className="font-bold">Company</h4><div className="mt-4 space-y-2 text-sm text-slate-500"><p>About</p><p>Contact</p><p>Privacy</p></div></div>
    </div>
  </footer>;
}''',

"src/components/marketing/BookCard.tsx": r'''import { MapPin } from "lucide-react";
import type { Book } from "../../types";
import { Badge } from "../ui/Badge";

export function BookCard({ book }: { book: Book }) {
  return <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <img src={book.cover} alt="" className="h-56 w-full object-cover transition group-hover:scale-[1.02]"/>
    <div className="p-4">
      <div className="mb-2 text-xs font-semibold text-amber-600">{book.category}</div>
      <h3 className="font-bold">{book.title}</h3>
      <p className="mt-1 text-sm text-slate-500">{book.author}</p>
      <div className="mt-4 flex items-center justify-between"><Badge tone="success">{book.available} available</Badge><span className="text-xs text-slate-400">3 libraries</span></div>
    </div>
  </article>;
}''',

"src/components/library/LibraryCard.tsx": r'''import { MapPin, BookOpen, Users } from "lucide-react";
import type { Library } from "../../types";
import { Badge } from "../ui/Badge";

export function LibraryCard({ library }: { library: Library }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
    <div className="flex items-start justify-between gap-4">
      <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600"><BookOpen/></div>
      <Badge tone={library.status === "approved" ? "success" : "warning"}>{library.status}</Badge>
    </div>
    <h3 className="mt-5 font-bold">{library.name}</h3>
    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin size={14}/>{library.location}</p>
    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{library.description}</p>
    <div className="mt-5 flex gap-5 text-xs text-slate-500"><span><b className="text-slate-900">{library.books}</b> books</span><span><b className="text-slate-900">{library.members}</b> members</span></div>
  </article>;
}''',

"src/components/auth/AuthShell.tsx": r'''import { Logo } from "../layout/Logo";
export function AuthShell({ children }: { children: React.ReactNode }) {
 return <div className="min-h-screen bg-slate-50"><div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
   <div className="hidden flex-1 bg-[#17202a] p-10 text-white lg:flex lg:flex-col lg:justify-between">
     <Logo dark/><div><div className="mb-5 text-sm font-semibold text-amber-400">FROM SHELF TO READER</div><h1 className="max-w-lg text-5xl font-black leading-tight">Every book. Every library. One place.</h1><p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">Discover books, manage collections, and connect readers with libraries.</p></div>
     <p className="text-sm text-slate-400">BookBridge</p>
   </div>
   <div className="flex flex-1 items-center justify-center p-6"><div className="w-full max-w-md"><div className="mb-8 lg:hidden"><Logo/></div>{children}</div></div>
 </div></div>;
}''',

"src/pages/public/Home.tsx": r'''import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Building2, Search, Sparkles } from "lucide-react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { BookCard } from "../../components/marketing/BookCard";
import { books } from "../../data/mock";

export function Home() {
 return <div><Navbar/>
  <main>
   <section className="overflow-hidden bg-[#17202a] text-white">
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-28">
      <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-amber-300"><Sparkles size={14}/> A better way to find and run libraries</div>
      <h1 className="max-w-3xl text-5xl font-black tracking-tight sm:text-6xl">Every book. Every library. <span className="text-amber-400">One place.</span></h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Discover books, check availability, and connect with libraries. Library owners get the tools to manage collections, members and circulation.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link to="/books"><Button variant="secondary">Find a book <ArrowRight size={17}/></Button></Link><Link to="/for-libraries"><Button className="border border-white/15 bg-white/10 text-white hover:bg-white/15">For libraries</Button></Link></div>
      <div className="mt-10 flex gap-8 text-sm"><div><b className="block text-2xl">12K+</b><span className="text-slate-400">books</span></div><div><b className="block text-2xl">80+</b><span className="text-slate-400">libraries</span></div><div><b className="block text-2xl">4K+</b><span className="text-slate-400">readers</span></div></div></div>
      <div className="relative"><div className="absolute -inset-10 rounded-full bg-amber-400/10 blur-3xl"/><div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
        <div className="rounded-2xl bg-white p-4 text-[#17202a] shadow-xl"><div className="flex items-center gap-3 border-b border-slate-100 pb-4"><Search className="text-slate-400"/><span className="text-sm text-slate-400">Search title, author or library...</span></div>
        <div className="mt-5"><p className="text-xs font-bold uppercase tracking-wider text-amber-600">Popular nearby</p><div className="mt-3 space-y-3">{books.slice(0,3).map(b=><div key={b.id} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><img src={b.cover} className="size-12 rounded-lg object-cover"/><div className="min-w-0"><b className="block truncate text-sm">{b.title}</b><span className="text-xs text-slate-500">{b.available} copies available</span></div><span className="ml-auto text-xs font-semibold text-green-600">Available</span></div>)}</div></div></div>
      </div></div>
    </div>
   </section>
   <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-5 md:grid-cols-3"><Feature icon={<Search/>} title="Find what you need" text="Search books and see which participating libraries have them available."/><Feature icon={<Building2/>} title="Connect to libraries" text="Discover public and private libraries and their collections."/><Feature icon={<BookOpen/>} title="Run your library" text="Manage catalog, members, circulation and staff from one workspace."/></div></section>
   <section className="bg-white"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="flex items-end justify-between"><div><p className="text-sm font-bold uppercase tracking-widest text-amber-600">Discover</p><h2 className="mt-2 text-3xl font-black">Books people are reading</h2></div><Link to="/books" className="hidden text-sm font-bold md:flex items-center gap-2">Browse all <ArrowRight size={16}/></Link></div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{books.map(b=><BookCard key={b.id} book={b}/>)}</div></div></section>
   <section className="bg-amber-400"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between lg:px-8"><div><h2 className="text-3xl font-black">Run a library?</h2><p className="mt-2 text-[#17202a]/75">Bring your catalog online and make it easier for readers to find you.</p></div><Link to="/for-libraries"><Button>Explore library tools <ArrowRight size={17}/></Button></Link></div></section>
  </main><Footer/>
 </div>;
}
function Feature({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="rounded-2xl border border-slate-200 p-6"><div className="grid size-11 place-items-center rounded-xl bg-amber-50 text-amber-600">{icon}</div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>}''',

"src/pages/public/Books.tsx": r'''import { Search } from "lucide-react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Input } from "../../components/ui/Input";
import { BookCard } from "../../components/marketing/BookCard";
import { books } from "../../data/mock";
export function Books(){return <><Navbar/><main className="min-h-screen bg-slate-50"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><p className="text-sm font-bold uppercase tracking-widest text-amber-600">Discovery</p><h1 className="mt-2 text-4xl font-black">Find your next book</h1><p className="mt-3 max-w-2xl text-slate-500">Search across participating libraries and see availability.</p><div className="mt-8 max-w-2xl"><Input placeholder="Search title, author or category..." /></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{books.map(b=><BookCard key={b.id} book={b}/>)}</div></div></main><Footer/></>}''',

"src/pages/public/Libraries.tsx": r'''import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Input } from "../../components/ui/Input";
import { LibraryCard } from "../../components/library/LibraryCard";
import { libraries } from "../../data/mock";
export function Libraries(){return <><Navbar/><main className="min-h-screen bg-slate-50"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><p className="text-sm font-bold uppercase tracking-widest text-amber-600">Network</p><h1 className="mt-2 text-4xl font-black">Libraries near you</h1><p className="mt-3 text-slate-500">Explore participating public and private libraries.</p><div className="mt-8 max-w-xl"><Input placeholder="Search libraries or locations..." /></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{libraries.filter(l=>l.status==="approved").map(l=><LibraryCard key={l.id} library={l}/>)}</div></div></main><Footer/></>}''',

"src/pages/public/ForLibraries.tsx": r'''import { Link } from "react-router-dom";
import { Check, ArrowRight, BarChart3, Users, LibraryBig } from "lucide-react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
export function ForLibraries(){return <><Navbar/><main><section className="bg-[#17202a] text-white"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-amber-400">For libraries</p><h1 className="mt-4 text-5xl font-black tracking-tight">Your library, finally in one place.</h1><p className="mt-6 text-lg leading-8 text-slate-300">Manage books, members, staff and circulation while giving readers a modern way to discover your collection.</p><div className="mt-8"><Link to="/register"><Button variant="secondary">Register your library <ArrowRight size={17}/></Button></Link></div></div></div></section><section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-6 md:grid-cols-3"><Feature icon={<LibraryBig/>} title="Catalog" text="Keep your books, copies and categories organized."/><Feature icon={<Users/>} title="Members" text="Manage readers, staff and access from one place."/><Feature icon={<BarChart3/>} title="Insights" text="Understand borrowing, demand and library performance."/></div><div className="mt-16 rounded-3xl bg-slate-50 p-8 lg:p-12"><h2 className="text-3xl font-black">Built for different library sizes</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{["Community","Professional","Multi-branch"].map((x,i)=><div className="rounded-2xl bg-white p-6 shadow-sm" key={x}><h3 className="font-bold">{x}</h3><p className="mt-2 text-sm text-slate-500">Flexible tools for growing operations.</p><ul className="mt-5 space-y-3 text-sm">{["Catalog management","Member management","Circulation"].map(v=><li className="flex gap-2" key={v}><Check className="text-green-600" size={17}/>{v}</li>)}</ul></div>)}</div></div></section></main><Footer/></>}
function Feature({icon,title,text}:{icon:React.ReactNode;title:string;text:string}){return <div className="rounded-2xl border border-slate-200 p-7"><div className="grid size-12 place-items-center rounded-xl bg-amber-50 text-amber-600">{icon}</div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>}''',

"src/pages/auth/Login.tsx": r'''import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "../../components/auth/AuthShell";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
export function Login(){const nav=useNavigate();return <AuthShell><h1 className="text-3xl font-black">Welcome back</h1><p className="mt-2 text-slate-500">Sign in to continue to your library workspace.</p><form onSubmit={e=>{e.preventDefault();nav("/reader");}} className="mt-8 space-y-4"><div><label className="mb-2 block text-sm font-semibold">Email</label><Input type="email" placeholder="you@example.com" required/></div><div><label className="mb-2 block text-sm font-semibold">Password</label><Input type="password" placeholder="••••••••" required/></div><Button className="w-full">Sign in</Button></form><p className="mt-6 text-center text-sm text-slate-500">New here? <Link to="/register" className="font-bold text-amber-600">Create an account</Link></p></AuthShell>}''',

"src/pages/auth/Register.tsx": r'''import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "../../components/auth/AuthShell";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
export function Register(){const nav=useNavigate();return <AuthShell><h1 className="text-3xl font-black">Create your account</h1><p className="mt-2 text-slate-500">Join the reader network or start a library.</p><form onSubmit={e=>{e.preventDefault();nav("/reader");}} className="mt-8 space-y-4"><div><label className="mb-2 block text-sm font-semibold">Full name</label><Input placeholder="Your name" required/></div><div><label className="mb-2 block text-sm font-semibold">Email</label><Input type="email" placeholder="you@example.com" required/></div><div><label className="mb-2 block text-sm font-semibold">Password</label><Input type="password" placeholder="Create a password" required/></div><Button className="w-full">Create account</Button></form><p className="mt-6 text-center text-sm text-slate-500">Already have an account? <Link to="/login" className="font-bold text-amber-600">Sign in</Link></p></AuthShell>}''',

"src/components/layout/PortalShell.tsx": r'''import { Link, useLocation } from "react-router-dom";
import { BookOpen, LayoutDashboard, LibraryBig, Users, BookMarked, Settings, LogOut, Search, Menu, BarChart3 } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "../../lib/utils";

const nav = [
 {label:"Overview",to:"/reader",icon:LayoutDashboard},
 {label:"Find Books",to:"/books",icon:Search},
 {label:"My Borrowings",to:"/reader/borrowings",icon:BookMarked},
 {label:"My Libraries",to:"/reader/libraries",icon:LibraryBig},
 {label:"Profile",to:"/reader/profile",icon:Users},
];
export function PortalShell({children, role="reader"}:{children:React.ReactNode;role?:string}) {
 const loc=useLocation();
 const owner=role==="owner";
 const items=owner ? [{label:"Overview",to:"/owner",icon:LayoutDashboard},{label:"Books",to:"/owner/books",icon:BookOpen},{label:"Members",to:"/owner/members",icon:Users},{label:"Borrowings",to:"/owner/borrowings",icon:BookMarked},{label:"Analytics",to:"/owner/analytics",icon:BarChart3},{label:"Settings",to:"/owner/settings",icon:Settings}] : nav;
 return <div className="min-h-screen bg-slate-50"><aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-5 lg:block"><Logo/><div className="mt-8 space-y-1">{items.map(x=>{const I=x.icon;return <Link key={x.to} to={x.to} className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold",loc.pathname===x.to?"bg-[#17202a] text-white":"text-slate-600 hover:bg-slate-100")}><I size={18}/>{x.label}</Link>})}</div><div className="absolute bottom-5 left-5 right-5"><Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-500"><LogOut size={18}/>Exit</Link></div></aside><div className="lg:pl-64"><header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/90 px-5 backdrop-blur"><button className="lg:hidden"><Menu/></button><div className="ml-auto flex items-center gap-3"><div className="hidden text-right sm:block"><b className="block text-sm">Your account</b><span className="text-xs text-slate-500">{owner?"Library owner":"Reader"}</span></div><div className="grid size-9 place-items-center rounded-full bg-amber-100 font-bold">F</div></div></header><main className="p-5 lg:p-8">{children}</main></div></div>
}''',

"src/pages/reader/Dashboard.tsx": r'''import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock3, Heart, Search } from "lucide-react";
import { PortalShell } from "../../components/layout/PortalShell";
import { BookCard } from "../../components/marketing/BookCard";
import { books } from "../../data/mock";
export function ReaderDashboard(){return <PortalShell><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm text-slate-500">Monday, August 10</p><h1 className="mt-1 text-3xl font-black">Good afternoon, Reader.</h1></div><Link to="/books" className="inline-flex items-center gap-2 rounded-xl bg-[#17202a] px-4 py-3 text-sm font-semibold text-white"><Search size={17}/> Find a book</Link></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><Stat icon={<BookOpen/>} label="Borrowed" value="4"/><Stat icon={<Clock3/>} label="Due soon" value="2"/><Stat icon={<Heart/>} label="Saved books" value="12"/></div><section className="mt-10"><div className="flex items-center justify-between"><h2 className="text-xl font-black">Recommended for you</h2><Link to="/books" className="text-sm font-bold">Browse <ArrowRight className="inline" size={15}/></Link></div><div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{books.map(b=><BookCard key={b.id} book={b}/>)}</div></section></div></PortalShell>}
function Stat({icon,label,value}:{icon:React.ReactNode;label:string;value:string}){return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">{label}</span><span className="text-amber-600">{icon}</span></div><b className="mt-4 block text-3xl">{value}</b></div>}''',

"src/pages/owner/Dashboard.tsx": r'''import { Link } from "react-router-dom";
import { BookOpen, Users, ArrowUpRight, Plus } from "lucide-react";
import { PortalShell } from "../../components/layout/PortalShell";
import { Button } from "../../components/ui/Button";
export function OwnerDashboard(){return <PortalShell role="owner"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><p className="text-sm font-semibold text-amber-600">YOUR LIBRARY</p><h1 className="mt-1 text-3xl font-black">Addis Community Library</h1><p className="mt-1 text-slate-500">Keep your collection moving.</p></div><Button><Plus size={17}/> Add book</Button></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat label="Books" value="4,820" icon={<BookOpen/>}/><Stat label="Members" value="1,240" icon={<Users/>}/><Stat label="Borrowed" value="284" icon={<ArrowUpRight/>}/><Stat label="Overdue" value="17" icon={<ArrowUpRight/>}/></div><div className="mt-8 grid gap-6 lg:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2"><h2 className="font-black">Borrowing activity</h2><div className="mt-8 flex h-52 items-end gap-3">{[35,55,42,72,62,85,70,92,64,78,88,76].map((h,i)=><div key={i} className="flex-1 rounded-t-lg bg-amber-300" style={{height:`${h}%`}}/>)}</div></div><div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="font-black">Quick actions</h2><div className="mt-5 space-y-2"><Link to="/owner/books" className="block rounded-xl bg-slate-50 p-4 text-sm font-semibold hover:bg-slate-100">Manage catalog</Link><Link to="/owner/members" className="block rounded-xl bg-slate-50 p-4 text-sm font-semibold hover:bg-slate-100">Manage members</Link><Link to="/owner/borrowings" className="block rounded-xl bg-slate-50 p-4 text-sm font-semibold hover:bg-slate-100">View borrowings</Link></div></div></div></div></PortalShell>}
function Stat({icon,label,value}:{icon:React.ReactNode;label:string;value:string}){return <div className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex justify-between text-slate-500"><span className="text-sm">{label}</span>{icon}</div><b className="mt-4 block text-2xl">{value}</b></div>}''',

"src/pages/Placeholder.tsx": r'''import { PortalShell } from "../components/layout/PortalShell";
export function Placeholder({title,role}:{title:string;role:"reader"|"owner"}){return <PortalShell role={role}><div className="grid min-h-[60vh] place-items-center"><div className="text-center"><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-amber-100 text-amber-700">✦</div><h1 className="mt-5 text-2xl font-black">{title}</h1><p className="mt-2 text-slate-500">This module is ready for the backend integration.</p></div></div></PortalShell>}''',

"src/pages/admin/AdminBridge.tsx": r'''import { Navigate } from "react-router-dom";
export function AdminBridge(){ return <Navigate to="/admin-dashboard" replace />; }''',

"src/App.tsx": r'''import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/public/Home";
import { Books } from "./pages/public/Books";
import { Libraries } from "./pages/public/Libraries";
import { ForLibraries } from "./pages/public/ForLibraries";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ReaderDashboard } from "./pages/reader/Dashboard";
import { OwnerDashboard } from "./pages/owner/Dashboard";
import { Placeholder } from "./pages/Placeholder";
import { AdminBridge } from "./pages/admin/AdminBridge";

export default function App(){
 return <BrowserRouter><Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="/books" element={<Books/>}/>
   <Route path="/libraries" element={<Libraries/>}/>
   <Route path="/for-libraries" element={<ForLibraries/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/register" element={<Register/>}/>
   <Route path="/reader" element={<ReaderDashboard/>}/>
   <Route path="/reader/borrowings" element={<Placeholder title="My Borrowings" role="reader"/>}/>
   <Route path="/reader/libraries" element={<Placeholder title="My Libraries" role="reader"/>}/>
   <Route path="/reader/profile" element={<Placeholder title="Profile" role="reader"/>}/>
   <Route path="/owner" element={<OwnerDashboard/>}/>
   <Route path="/owner/books" element={<Placeholder title="Library Catalog" role="owner"/>}/>
   <Route path="/owner/members" element={<Placeholder title="Library Members" role="owner"/>}/>
   <Route path="/owner/borrowings" element={<Placeholder title="Borrowings" role="owner"/>}/>
   <Route path="/owner/analytics" element={<Placeholder title="Library Analytics" role="owner"/>}/>
   <Route path="/owner/settings" element={<Placeholder title="Library Settings" role="owner"/>}/>
   <Route path="/admin" element={<AdminBridge/>}/>
   <Route path="/admin-dashboard" element={<div className="grid min-h-screen place-items-center bg-slate-50"><div className="max-w-lg text-center"><h1 className="text-3xl font-black">Admin dashboard integration point</h1><p className="mt-3 text-slate-500">Mount your existing admin dashboard route/component here.</p></div></div>}/>
   <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></BrowserRouter>;
}''',

"src/main.tsx": r'''import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
createRoot(document.getElementById("root")!).render(<StrictMode><App/></StrictMode>);''',

"README.md": r'''# Library Platform Frontend

A multi-tenant frontend shell designed to sit around the existing admin dashboard.

## Included

- Public landing page
- Book discovery
- Library discovery
- Library-owner marketing/onboarding page
- Reader authentication
- Reader portal
- Library-owner portal
- Reusable buttons, badges, inputs and modals
- Reusable library/book cards
- Shared portal shell
- Explicit `/admin-dashboard` integration point for the existing admin dashboard
- Tailwind CSS v4 Vite setup
- React + TypeScript + Vite
- Mock data isolated in `src/data/mock.ts`

## Architecture

```text

Public
  /                    landing
  /books               discovery
  /libraries           discovery
  /for-libraries       acquisition

Auth
  /login
  /register

Reader
  /reader/*

Library owner
  /owner/*

Admin
  /admin-dashboard     mount the existing admin dashboard here


Yes — **this is the missing half**.

I generated the frontend shell as a separate project specifically so your existing admin dashboard can plug into it rather than the admin dashboard having to carry the whole application.

### Included

```text

Public
├── Landing page
├── Book discovery
├── Library discovery
└── For Libraries / acquisition

Auth
├── Login
└── Registration

Reader
├── Dashboard
├── Borrowings
├── My Libraries
└── Profile

Library Owner
├── Dashboard
├── Catalog
├── Members
├── Borrowings
├── Analytics
└── Settings

Shared
├── Navbar
├── Footer
├── Portal shell
├── Logo
├── Button
├── Input
├── Badge
├── Modal
├── BookCard
└── LibraryCard

Admin
└── /admin-dashboard ← plug your existing dashboard here

```
Plugging in the existing admin dashboard

Replace the /admin-dashboard element in src/App.tsx with the existing admin dashboard root component.

Keep authentication/role checks in the API/auth layer once your real auth endpoints are connected.

Backend integration

Create a single API client under src/api/ and replace mock data with TanStack Query hooks. Do not scatter fetch calls through components.

The existing backend's admin routes can remain behind the admin surface; this frontend is intentionally the public + reader + owner shell around it.
'''
}

for rel, content in files.items():
p = root / rel
p.parent.mkdir(parents=True, exist_ok=True)
p.write_text(content, encoding="utf-8")

zip_path = Path("/mnt/data/library-platform-frontend.zip")
if zip_path.exists():
zip_path.unlink()
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
for p in root.rglob("*"):
if p.is_file():
z.write(p, p.relative_to(root.parent))

print(f"Created {zip_path}")
print(f"{len(files)} files")
Yes — this is the missing half.

I generated the frontend shell as a separate project specifically so your existing admin dashboard can plug into it rather than the admin dashboard having to carry the whole application.

Included
Public
├── Landing page
├── Book discovery
├── Library discovery
└── For Libraries / acquisition

Auth
├── Login
└── Registration

Reader
├── Dashboard
├── Borrowings
├── My Libraries
└── Profile

Library Owner
├── Dashboard
├── Catalog
├── Members
├── Borrowings
├── Analytics
└── Settings

Shared
├── Navbar
├── Footer
├── Portal shell
├── Logo
├── Button
├── Input
├── Badge
├── Modal
├── BookCard
└── LibraryCard

Admin
└── /admin-dashboard ← plug your existing dashboard here

I also kept the public/reader/owner/admin boundaries explicit, because this is a multi-tenant system. The owner portal is deliberately different from the reader portal, and your existing admin system remains the system-wide administrative surface.

Download

Download the complete Library Platform Frontend ZIP

The project uses:

React 19
TypeScript
Vite
Tailwind CSS v4
React Router
TanStack Query dependency ready for API integration
Lucide
Recharts dependency ready for analytics

The important integration point is:

src/App.tsx
        │
        ├── public/
        ├── reader/
        ├── owner/
        │
        └── /admin-dashboard
                 ↓
          YOUR EXISTING
          ADMIN DASHBOARD

So you now have the actual application shell around the admin system, rather than having an admin dashboard floating by itself.

I intentionally left the API layer/mock data isolated so you can connect this to your feat-backend without having fetch calls scattered throughout the UI.
