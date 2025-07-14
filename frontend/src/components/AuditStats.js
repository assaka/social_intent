import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AuditStats = ({ user }) => {
    const [stats, setStats] = useState({
        total_audits: 0,
        completed_audits: 0,
        pending_audits: 0,
        failed_audits: 0
    });
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    useEffect(() => {
        fetchStats();
    }, [user]);

    const fetchStats = async () => {
        try {
            const params = new URLSearchParams();
            if (user?.id) params.append('user_id', user.id);
            params.append('per_page', '100'); // Get more for stats

            const response = await fetch(`${API_BASE_URL}/audits/history?${params}`);
            const data = await response.json();

            const audits = data.audits || [];
            const newStats = {
                total_audits: audits.length,
                completed_audits: audits.filter(a => a.status === 'completed').length,
                pending_audits: audits.filter(a => a.status === 'pending').length,
                failed_audits: audits.filter(a => a.status === 'failed').length
            };

            setStats(newStats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const chartData = [
        { name: 'Completed', value: stats.completed_audits, fill: '#10B981' },
        { name: 'Pending', value: stats.pending_audits, fill: '#F59E0B' },
        { name: 'Failed', value: stats.failed_audits, fill: '#EF4444' }
    ];

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Audit Statistics</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.total_audits}</div>
                    <div className="text-sm text-gray-600">Total Audits</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.completed_audits}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{stats.pending_audits}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{stats.failed_audits}</div>
                    <div className="text-sm text-gray-600">Failed</div>
                </div>
            </div>

            {stats.total_audits > 0 && (
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default AuditStats;