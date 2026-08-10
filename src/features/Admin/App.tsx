import { BrowserRouter, Routes, Route } from 'react-router'
import { Layout } from './components/Layout'
import { Overview } from './pages/Overview'
import { Registrations } from './pages/Registrations'
import { Generic } from './pages/Generic'
export default function App(){return <BrowserRouter><Routes><Route element={<Layout/>}><Route path="/" element={<Overview/>}/><Route path="/registrations" element={<Registrations/>}/><Route path="/libraries" element={<Generic type="libraries"/>}/><Route path="/users" element={<Generic type="users"/>}/><Route path="/books" element={<Generic type="books"/>}/><Route path="/borrowing" element={<Generic type="borrowing"/>}/><Route path="/reports" element={<Generic type="reports"/>}/><Route path="/settings" element={<Generic type="settings"/>}/></Route></Routes></BrowserRouter>}
