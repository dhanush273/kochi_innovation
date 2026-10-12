import React, { useState, useEffect } from 'react';
import { X, Trash2, RotateCcw, Search, User, Building, Clock, UserX } from 'lucide-react';
import { api } from '../services/api';

export default function DeletedRegistrationsModal({ isOpen, onClose, onRestored }) {
  const [deletedList, setDeletedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [restoringId, setRestoringId] = useState(null);

  const fetchDeleted = async () => {
    try {
      setLoading(true);
      const res = await api.getDeletedRegistrations({ search });
      setDeletedList(res.data || []);
    } catch (err) {
      console.error('Failed to load deleted registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDeleted();
    }
  }, [isOpen, search]);

  const handleRestore = async (id, name) => {
    if (!window.confirm(`Restore registration for "${name}" back to active registrations?`)) return;
    try {
      setRestoringId(id);
      await api.restoreRegistration(id);
      await fetchDeleted();
      if (onRestored) onRestored();
    } catch (err) {
      alert('Failed to restore: ' + err.message);
    } finally {
      setRestoringId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                Deleted Registrations Archive
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 font-bold text-slate-700">
                  {deletedList.length}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Archived nominations with <strong>deleted by</strong> audit log. You can restore records anytime.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by candidate, company, email, or who deleted..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-red bg-slate-50"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="py-16 text-center text-slate-400">
              <Clock className="w-8 h-8 mx-auto mb-2 animate-spin text-slate-300" />
              <p className="text-xs font-semibold">Loading archived registrations...</p>
            </div>
          ) : deletedList.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <UserX className="w-12 h-12 mx-auto mb-3 opacity-25" />
              <p className="font-bold text-slate-700 text-sm">No deleted registrations</p>
              <p className="text-xs mt-1 text-slate-400">
                When a nomination is deleted, it is safely stored in the deleted registrations schema.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {deletedList.map(item => {
                const id = item._id || item.id;
                const isRestoring = restoringId === id;
                return (
                  <div
                    key={id}
                    className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:bg-slate-50/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{item.fullName}</span>
                        <span className="text-[11px] font-mono text-slate-400">({item.workEmail})</span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.companyName} &bull; {item.jobRole}</span>
                        </div>
                        <div className="text-slate-400 font-mono text-[11px]">
                          {item.phoneNumber}
                        </div>
                      </div>

                      {/* Deleted By audit line */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                          <User className="w-3 h-3 text-rose-500" />
                          Deleted By: <strong>{item.deletedBy || 'Admin'}</strong>
                        </span>
                        {item.deletedAt && (
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.deletedAt).toLocaleString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                        {item.reason && (
                          <span className="text-slate-500 italic">
                            Reason: "{item.reason}"
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <button
                        onClick={() => handleRestore(id, item.fullName)}
                        disabled={isRestoring}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs transition-colors disabled:opacity-50"
                        title="Restore this registration"
                      >
                        <RotateCcw className={`w-3.5 h-3.5 ${isRestoring ? 'animate-spin' : ''}`} />
                        <span>{isRestoring ? 'Restoring...' : 'Restore'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
