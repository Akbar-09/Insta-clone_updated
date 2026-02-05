import React, { useState, useEffect } from 'react';
import { Lock, Plus, Shield, UserCheck, MoreVertical, X, Check, Edit2, Trash2, Save, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditPermsModalOpen, setIsEditPermsModalOpen] = useState(false);
    const [newRole, setNewRole] = useState({ name: '', description: '', permissions: [] });
    const [editingRole, setEditingRole] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // Permissions List - can be expanded as needed
    const permissionsList = [
        "User Management", "Content Moderation", "System Settings", "Analytics View", "Reports Handling"
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const [isAdminRoleModalOpen, setIsAdminRoleModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [rolesRes, adminsRes] = await Promise.all([
                adminApi.listRoles(),
                adminApi.listAdmins()
            ]);

            if (rolesRes.success) {
                // Enrich roles with user counts from the admins list
                const enrichedRoles = rolesRes.data.map(role => ({
                    ...role,
                    users: adminsRes.data?.filter(a => a.roleId === role.id).length || 0
                }));
                setRoles(enrichedRoles);
            }
            if (adminsRes.success) setAdmins(adminsRes.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddRole = async (e) => {
        e.preventDefault();
        try {
            const res = await adminApi.createRole({
                name: newRole.name,
                description: newRole.description,
                permissions: [] // New roles start with no permissions
            });
            if (res.success) {
                fetchData();
                setIsAddModalOpen(false);
                setNewRole({ name: '', description: '', permissions: [] });
            }
        } catch (error) {
            console.error('Failed to add role', error);
            alert('Failed to add role');
        }
    };

    const handleEditPermissions = (role) => {
        setEditingRole({ ...role });
        setIsEditPermsModalOpen(true);
    };

    const handleTogglePermission = (perm) => {
        const currentPerms = editingRole.permissions || [];
        const newPerms = currentPerms.includes(perm)
            ? currentPerms.filter(p => p !== perm)
            : [...currentPerms, perm];
        setEditingRole({ ...editingRole, permissions: newPerms });
    };

    const handleSavePermissions = async () => {
        try {
            const res = await adminApi.updateRole(editingRole.id, {
                permissions: editingRole.permissions
            });
            if (res.success) {
                fetchData();
                setIsEditPermsModalOpen(false);
                setEditingRole(null);
            }
        } catch (error) {
            console.error('Failed to update permissions', error);
            alert('Failed to update permissions');
        }
    };

    const toggleDropdown = (id) => {
        if (activeDropdown === id) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(id);
        }
    };

    const handleEditAdminRole = (admin) => {
        setEditingAdmin(admin);
        setIsAdminRoleModalOpen(true);
        setActiveDropdown(null);
    };

    const handleUpdateAdminRole = async (roleId) => {
        try {
            const res = await adminApi.updateAdminRole(editingAdmin.id, roleId);
            if (res.success) {
                fetchData();
                setIsAdminRoleModalOpen(false);
                setEditingAdmin(null);
            }
        } catch (error) {
            console.error('Failed to update admin role', error);
            alert('Failed to update admin role');
        }
    };

    const handleDeleteAdmin = async (id) => {
        if (confirm('Are you sure you want to remove this admin access?')) {
            try {
                const res = await adminApi.deleteAdmin(id);
                if (res.success) {
                    fetchData();
                    setActiveDropdown(null);
                }
            } catch (error) {
                console.error('Failed to remove admin', error);
                alert('Failed to remove admin');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-pink-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-8 relative" onClick={() => activeDropdown && setActiveDropdown(null)}>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Lock className="text-gray-800 dark:text-white" /> Roles & Permissions
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage admin access levels and security.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white rounded-xl shadow-lg hover:opacity-90 transition-opacity"
                >
                    <Plus size={18} /> Add New Role
                </button>
            </div>

            {/* Roles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {roles.map((role) => (
                    <div key={role.id} className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-48 group hover:border-pink-500/30 transition-colors">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <Shield className="text-gray-400 group-hover:text-pink-500 transition-colors" size={24} />
                                <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs font-bold">
                                    {role.users} Users
                                </span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{role.name}</h3>
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{role.description || 'No description provided.'}</p>
                        </div>
                        <button
                            onClick={() => handleEditPermissions(role)}
                            className="text-sm font-semibold text-pink-600 dark:text-pink-400 self-start hover:underline"
                        >
                            Edit Permissions
                        </button>
                    </div>
                ))}
            </div>

            {/* Admin Table */}
            <div className="glass-panel rounded-2xl overflow-hidden p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Admin Accounts</h3>
                <div className="overflow-visible">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 text-left">
                            <tr>
                                <th className="pb-3 pl-4 font-medium text-gray-500 uppercase text-xs">Name</th>
                                <th className="pb-3 font-medium text-gray-500 uppercase text-xs">Role</th>
                                <th className="pb-3 font-medium text-gray-500 uppercase text-xs">Last Login</th>
                                <th className="pb-3 text-right font-medium text-gray-500 uppercase text-xs pr-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                            {admins.map((admin) => (
                                <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors relative">
                                    <td className="py-4 pl-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                                            {admin.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-gray-800 dark:text-white">{admin.name}</p>
                                            <p className="text-xs text-gray-500">{admin.email}</p>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${admin.role?.name === 'SuperAdmin' ? 'bg-purple-100 text-purple-700' :
                                            admin.role?.name === 'Moderator' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {admin.role?.name || 'No Role'}
                                        </span>
                                    </td>
                                    <td className="py-4 text-sm text-gray-500">
                                        {admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}
                                    </td>
                                    <td className="py-4 text-right pr-4 relative">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleDropdown(admin.id); }}
                                            className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500"
                                        >
                                            <MoreVertical size={16} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === admin.id && (
                                            <div className="absolute right-8 top-8 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-white/10 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                <button
                                                    onClick={() => handleEditAdminRole(admin)}
                                                    className="w-full text-left px-4 py-2 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2"
                                                >
                                                    <Edit2 size={12} /> Edit Role
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAdmin(admin.id)}
                                                    className="w-full text-left px-4 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                                >
                                                    <Trash2 size={12} /> Remove
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Update Admin Role Modal */}
            {isAdminRoleModalOpen && editingAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAdminRoleModalOpen(false)}></div>
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Assign Role</h3>
                            <button onClick={() => setIsAdminRoleModalOpen(false)} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300">Select a new role for <b>{editingAdmin.name}</b>:</p>
                            <div className="space-y-2">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={() => handleUpdateAdminRole(role.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-colors ${editingAdmin.roleId === role.id ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200'}`}
                                    >
                                        <div className="font-semibold text-sm">{role.name}</div>
                                        <div className={`text-[10px] ${editingAdmin.roleId === role.id ? 'text-pink-100' : 'text-gray-500'}`}>{role.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Role Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">Create New Role</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleAddRole} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newRole.name}
                                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                                    placeholder="e.g. Editor"
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    required
                                    value={newRole.description}
                                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                                    placeholder="Briefly describe what this role can do..."
                                    rows="3"
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white font-medium hover:from-pink-600 hover:to-violet-700 shadow-lg shadow-pink-500/20 transition-all">
                                    Create Role
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Permissions Modal */}
            {isEditPermsModalOpen && editingRole && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditPermsModalOpen(false)}></div>
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10">
                            <div>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white">Edit Permissions</h3>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">{editingRole.name}</p>
                            </div>
                            <button onClick={() => setIsEditPermsModalOpen(false)} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Select permissions for this role:</p>
                            <div className="grid grid-cols-1 gap-2">
                                {permissionsList.map((perm, idx) => {
                                    const isChecked = editingRole.permissions?.includes(perm);
                                    return (
                                        <label
                                            key={idx}
                                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                                            onClick={() => handleTogglePermission(perm)}
                                        >
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                                {isChecked && <Check size={12} strokeWidth={3} />}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{perm}</span>
                                        </label>
                                    );
                                })}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button onClick={() => setIsEditPermsModalOpen(false)} className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleSavePermissions} className="flex-1 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black font-medium hover:opacity-90 shadow-lg transition-all flex items-center justify-center gap-2">
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoleManagement;
