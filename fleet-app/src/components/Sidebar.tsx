'use client'

import {
    LayoutDashboard,
    Truck,
    Wrench,
    FileText,
    Settings,
    ChevronLeft,
    ChevronRight,
    Users,
    Bell
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export function Sidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const links = [
        { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
        { href: '/fleet', label: 'Flotte', icon: Truck },
        { href: '/maintenance', label: 'Entretiens', icon: Wrench },
        { href: '/drivers', label: 'Chauffeurs', icon: Users },
        { href: '/documents', label: 'Documents', icon: FileText },
        { href: '/alerts', label: 'Alertes', icon: Bell },
        { href: '/settings', label: 'Paramètres', icon: Settings },
    ]

    return (
        <aside
            className={`
                h-screen bg-slate-900 text-slate-100 flex flex-col transition-all duration-300 relative
                ${isCollapsed ? 'w-20' : 'w-64'}
            `}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 bg-blue-600 rounded-full p-1 shadow-lg hover:bg-blue-700 transition-colors z-50"
            >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Logo */}
            <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                    <Truck className="text-white" size={20} />
                </div>
                {!isCollapsed && (
                    <span className="font-bold text-xl tracking-wide whitespace-nowrap">Nova Fleet</span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname.startsWith(link.href)
                    const Icon = link.icon

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                                flex items-center gap-3 p-3 rounded-lg transition-colors group relative
                                ${isActive
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }
                            `}
                        >
                            <Icon size={22} className="shrink-0" />

                            {!isCollapsed && (
                                <span className="font-medium whitespace-nowrap">{link.label}</span>
                            )}

                            {/* Tooltip for collapsed mode */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                    {link.label}
                                </div>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-slate-800">
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                        <span className="font-bold text-slate-300">JD</span>
                    </div>
                    {!isCollapsed && (
                        <div className="overflow-hidden">
                            <p className="font-medium text-sm text-white truncate">John Doe</p>
                            <p className="text-xs text-slate-400 truncate">Admin Flotte</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}
