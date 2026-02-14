import React, { useState, useEffect } from 'react';
import { Server, Activity, Terminal, AlertCircle, RefreshCw, X } from 'lucide-react';
import { getServiceStatuses, getServiceLogs } from '../../api/adminApi';

const Monitoring = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState(null);
    const [logs, setLogs] = useState('');
    const [logType, setLogType] = useState('logs'); // 'logs' or 'errors'
    const [fetchingLogs, setFetchingLogs] = useState(false);

    const fetchStatuses = async () => {
        setLoading(true);
        try {
            const res = await getServiceStatuses();
            if (res.success) {
                setServices(res.data);
            }
        } catch (err) {
            console.error('Failed to fetch service statuses', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchLogs = async (serviceName, type) => {
        setFetchingLogs(true);
        try {
            const res = await getServiceLogs(serviceName, type);
            if (res.success) {
                setLogs(res.data);
            }
        } catch (err) {
            setLogs('Failed to fetch logs: ' + err.message);
        } finally {
            setFetchingLogs(false);
        }
    };

    useEffect(() => {
        fetchStatuses();
        const interval = setInterval(fetchStatuses, 30000); // refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const openLogs = (service) => {
        setSelectedService(service);
        setLogType('logs');
        fetchLogs(service.name, 'logs');
    };

    const toggleLogType = (type) => {
        setLogType(type);
        fetchLogs(selectedService.name, type);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        <Activity className="text-violet-600" size={32} />
                        Microservice Monitoring
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time status and logs for all backend services.</p>
                </div>
                <button
                    onClick={fetchStatuses}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-all font-medium text-sm text-gray-700 dark:text-gray-200"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    Refresh Status
                </button>
            </div>

            {loading && services.length === 0 ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.name}
                            className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer border-l-4"
                            style={{ borderLeftColor: service.status === 'online' ? '#10b981' : '#ef4444' }}
                            onClick={() => openLogs(service)}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">
                                    <Server className={service.status === 'online' ? 'text-emerald-500' : 'text-rose-500'} size={24} />
                                </div>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${service.status === 'online'
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                        : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                    }`}>
                                    {service.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 truncate">{service.name}</h3>
                            <p className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1">
                                Port: <span className="font-mono text-gray-600 dark:text-slate-400">{service.port}</span>
                            </p>

                            <div className="mt-4 pt-4 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                    View Logs →
                                </span>
                                {service.status === 'offline' && (
                                    <AlertCircle className="text-rose-500 animate-pulse" size={16} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Logs Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setSelectedService(null)}
                    ></div>
                    <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-black/20">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-violet-100 dark:bg-violet-500/10 rounded-lg">
                                    <Terminal className="text-violet-600 dark:text-violet-400" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedService.name} Logs</h2>
                                    <p className="text-xs text-gray-500 dark:text-slate-400">Viewing real-time output for {selectedService.name}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedService(null)}
                                className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-400"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex px-6 py-2 bg-white dark:bg-slate-900 gap-4 border-b border-gray-50 dark:border-slate-800">
                            <button
                                onClick={() => toggleLogType('logs')}
                                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${logType === 'logs'
                                        ? 'border-violet-600 text-violet-600'
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Standard Output
                            </button>
                            <button
                                onClick={() => toggleLogType('errors')}
                                className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${logType === 'errors'
                                        ? 'border-rose-600 text-rose-600'
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                Error Logs
                            </button>
                        </div>

                        {/* Log Window */}
                        <div className="flex-1 bg-slate-950 p-6 overflow-y-auto font-mono text-sm group custom-scrollbar">
                            {fetchingLogs ? (
                                <div className="flex justify-center items-center h-full text-slate-500 italic animate-pulse">
                                    Fetching data from service...
                                </div>
                            ) : (
                                <pre className="text-slate-300 whitespace-pre-wrap break-words leading-relaxed">
                                    {logs || 'No log data available yet.'}
                                </pre>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                            <span>Last updated: {new Date().toLocaleTimeString()}</span>
                            <button
                                onClick={() => fetchLogs(selectedService.name, logType)}
                                className="text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
                            >
                                Manual Refresh
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Monitoring;
