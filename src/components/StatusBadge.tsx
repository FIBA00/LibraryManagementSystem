import type { LibraryStatus } from '../types'
import { cn } from '../lib/utils'

const styles: Record<LibraryStatus,string> = {
  pending:'bg-amber-50 text-amber-700 ring-amber-200', approved:'bg-emerald-50 text-emerald-700 ring-emerald-200', rejected:'bg-rose-50 text-rose-700 ring-rose-200', suspended:'bg-slate-100 text-slate-600 ring-slate-200'
}
export function StatusBadge({ status }: { status: LibraryStatus }) {
  return <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1', styles[status])}><span className="size-1.5 rounded-full bg-current" />{status}</span>
}
