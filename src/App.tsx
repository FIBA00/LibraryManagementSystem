import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from './layouts/AdminLayout'
import { Overview } from './pages/Overview'
import { Libraries } from './pages/Libraries'
import { LibraryDetail } from './pages/LibraryDetail'
import { Placeholder } from './pages/Placeholder'

export default function App(){return <BrowserRouter><AdminLayout><Routes><Route path="/admin" element={<Overview/>}/><Route path="/admin/libraries" element={<Libraries/>}/><Route path="/admin/libraries/:id" element={<LibraryDetail/>}/><Route path="/admin/books" element={<Placeholder title="Books & catalog"/>}/><Route path="/admin/borrowings" element={<Placeholder title="Borrowings"/>}/><Route path="/admin/members" element={<Placeholder title="Members"/>}/><Route path="/admin/reports" element={<Placeholder title="Reports"/>}/><Route path="/admin/settings" element={<Placeholder title="Settings"/>}/><Route path="*" element={<Navigate to="/admin" replace/>}/></Routes></AdminLayout></BrowserRouter>}
