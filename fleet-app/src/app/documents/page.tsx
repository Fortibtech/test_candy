import { FileText, Download, Filter, Search } from 'lucide-react'

// Mock Data
const documents = [
    { id: 1, title: 'Carte Grise - AB-123-CD', type: 'PDF', date: '01/01/2026', size: '2.4 MB' },
    { id: 2, title: 'Assurance Flotte 2026', type: 'PDF', date: '15/12/2025', size: '1.1 MB' },
    { id: 3, title: 'Facture Entretien #4592', type: 'Facture', date: '10/02/2026', size: '340 KB' },
    { id: 4, title: 'Contrôle Technique - EF-456-GH', type: 'Rapport', date: '20/01/2026', size: '5.2 MB' },
]

export default function DocumentsPage() {
    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Documents</h1>
                    <p className="text-slate-500">Centralisation de tous les fichiers administratifs.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Rechercher..." className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                        <Filter size={20} className="text-slate-600" />
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4">Nom du fichier</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Date d'ajout</th>
                            <th className="px-6 py-4">Taille</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {documents.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                        <FileText size={18} />
                                    </div>
                                    {doc.title}
                                </td>
                                <td className="px-6 py-4">{doc.type}</td>
                                <td className="px-6 py-4">{doc.date}</td>
                                <td className="px-6 py-4">{doc.size}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50">
                                        <Download size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
