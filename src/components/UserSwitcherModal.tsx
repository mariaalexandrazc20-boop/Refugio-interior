import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Plus, Check, Flame, Droplet, Edit3 } from 'lucide-react';
import { playDuolingoSuccessChime } from '../utils/audio';

interface UserSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: UserProfile[];
  activeUserId: string;
  onSelectUser: (userId: string) => void;
  onAddUser: (name: string, avatar: string) => void;
  onUpdateUserName?: (userId: string, newName: string) => void;
}

const AVATAR_OPTIONS = ['👤', '🌸', '✨', '🕊️', '☀️', '🌊', '🌙', '🦋', '⭐', '🌈'];

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({
  isOpen,
  onClose,
  users,
  activeUserId,
  onSelectUser,
  onAddUser,
  onUpdateUserName
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👤');

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddUser(newName.trim(), selectedAvatar);
    setNewName('');
    setIsAddingNew(false);
    playDuolingoSuccessChime();
  };

  const handleSaveEdit = (userId: string) => {
    if (editNameValue.trim() && onUpdateUserName) {
      onUpdateUserName(userId, editNameValue.trim());
      playDuolingoSuccessChime();
    }
    setEditingUserId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 relative overflow-hidden transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 rounded-2xl mb-2 font-bold text-xl">
            👤
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            ¿Quién entra al Refugio?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Cada persona coloca su nombre y guarda su racha individual de serenidad.
          </p>
        </div>

        {/* Existing Users List */}
        {!isAddingNew ? (
          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
            {users.map((user) => {
              const isActive = user.id === activeUserId;
              const isEditing = editingUserId === user.id;

              return (
                <div
                  key={user.id}
                  onClick={() => {
                    if (!isEditing) {
                      onSelectUser(user.id);
                      onClose();
                    }
                  }}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-2xl w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs shrink-0">
                      {user.avatar || '🌱'}
                    </span>
                    <div className="flex-1 min-w-0">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            autoFocus
                            value={editNameValue}
                            onChange={(e) => setEditNameValue(e.target.value)}
                            placeholder="Escribe tu nombre..."
                            className="px-2.5 py-1 text-xs font-bold rounded-lg border-2 border-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none w-32"
                          />
                          <button
                            onClick={() => handleSaveEdit(user.id)}
                            className="p-1 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                            title="Guardar nombre"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100 text-sm">
                          <span className="truncate">
                            {user.name && user.name.trim().length > 0 ? user.name : '(Sin nombre aún)'}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingUserId(user.id);
                              setEditNameValue(user.name || '');
                            }}
                            className="text-slate-400 hover:text-emerald-600 p-0.5 rounded transition-colors"
                            title="Editar nombre"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {isActive && (
                            <span className="text-emerald-600 dark:text-emerald-400 flex items-center">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-400">
                          <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          {user.streakDays} días
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-medium text-sky-600 dark:text-sky-400">
                          <Droplet className="w-3.5 h-3.5 fill-sky-500 text-sky-500" />
                          {user.serenityDrops} gotas
                        </span>
                      </div>
                    </div>
                  </div>

                  {isActive ? (
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-2.5 py-1 rounded-full shrink-0">
                      Activo
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectUser(user.id);
                        onClose();
                      }}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 px-3 py-1 rounded-xl transition-colors shrink-0"
                    >
                      Elegir
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Form to Add New User */
          <form onSubmit={handleCreate} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Tu nombre
              </label>
              <input
                type="text"
                autoFocus
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Escribe tu nombre aquí..."
                className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-emerald-500 focus:outline-none text-slate-900 dark:text-slate-100 font-medium placeholder:text-slate-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Elige un símbolo personal
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    type="button"
                    key={av}
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border-2 transition-all ${
                      selectedAvatar === av
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 scale-105'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-slate-50 dark:bg-slate-800'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="flex-1 py-2.5 px-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-wider hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Volver
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all shadow-sm"
              >
                Guardar
              </button>
            </div>
          </form>
        )}

        {/* Bottom Actions */}
        {!isAddingNew && (
          <button
            onClick={() => {
              setNewName('');
              setIsAddingNew(true);
            }}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span>Colocar nuevo nombre</span>
          </button>
        )}
      </div>
    </div>
  );
};

