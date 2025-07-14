import React, { useState, useEffect } from 'react';

const GTMConnector = ({ user }) => {
    const [gtmAccounts, setGtmAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedContainer, setSelectedContainer] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

    useEffect(() => {
        if (user?.id) {
            fetchGTMAccounts();
        }
    }, [user]);

    const fetchGTMAccounts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/gtm/accounts/${user.id}`);

            if (response.ok) {
                const data = await response.json();
                setGtmAccounts(data.account || []);
            } else if (response.status === 401) {
                setError('Please connect your Google account first');
            } else {
                setError('Failed to fetch GTM accounts');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const analyzeGTMSetup = async () => {
        if (!selectedAccount || !selectedContainer) {
            setError('Please select an account and container');
            return;
        }

        try {
            setLoading(true);
            setError('');

            const response = await fetch(`${API_BASE_URL}/gtm/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account_id: selectedAccount,
                    container_id: selectedContainer,
                    user_id: user.id
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setAnalysis(data);
            } else {
                const errorData = await response.json();
                setError(errorData.detail || 'Failed to analyze GTM setup');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleConnect = () => {
        window.location.href = `${API_BASE_URL}/auth/google`;
    };

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Connect Your Google Account
                    </h2>
                    <p className="text-gray-600 mb-6">
                        To analyze your Google Tag Manager setup, please connect your Google account
                    </p>
                    <button
                        onClick={handleGoogleConnect}
                        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 flex items-center justify-center mx-auto"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Connect with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Google Tag Manager Analysis
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            GTM Account
                        </label>
                        <select
                            value={selectedAccount}
                            onChange={(e) => setSelectedAccount(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        >
                            <option value="">Select Account</option>
                            {gtmAccounts.map((account) => (
                                <option key={account.accountId} value={account.accountId}>
                                    {account.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Container
                        </label>
                        <select
                            value={selectedContainer}
                            onChange={(e) => setSelectedContainer(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading || !selectedAccount}
                        >
                            <option value="">Select Container</option>
                            {selectedAccount &&
                                gtmAccounts
                                    .find((acc) => acc.accountId === selectedAccount)
                                    ?.container?.map((container) => (
                                    <option key={container.containerId} value={container.containerId}>
                                        {container.name} ({container.publicId})
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <button
                    onClick={analyzeGTMSetup}
                    disabled={loading || !selectedAccount || !selectedContainer}
                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Analyzing...
                        </>
                    ) : (
                        'Analyze GTM Setup'
                    )}
                </button>
            </div>

            {analysis && (
                <div className="space-y-6">
                    {/* Container Info */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Container Information
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p><strong>Name:</strong> {analysis.container_info.name}</p>
                                <p><strong>Public ID:</strong> {analysis.container_info.publicId}</p>
                            </div>
                            <div>
                                <p><strong>Domain:</strong> {analysis.container_info.domainName?.join(', ') || 'All domains'}</p>
                                <p><strong>Usage Context:</strong> {analysis.container_info.usageContext?.join(', ') || 'Web'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tags Analysis */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Tags Analysis
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">
                                    {analysis.tags_analysis.total_tags}
                                </div>
                                <div className="text-sm text-gray-600">Total Tags</div>
                            </div>
                            <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {analysis.tags_analysis.paused_tags}
                                </div>
                                <div className="text-sm text-gray-600">Paused Tags</div>
                            </div>
                            <div className="text-center p-4 bg-red-50 rounded-lg">
                                <div className="text-2xl font-bold text-red-600">
                                    {analysis.tags_analysis.tags_without_triggers}
                                </div>
                                <div className="text-sm text-gray-600">Tags Without Triggers</div>
                            </div>
                        </div>

                        {analysis.tags_analysis.tag_types && (
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-700 mb-3">Tag Types</h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                    {Object.entries(analysis.tags_analysis.tag_types).map(([type, count]) => (
                                        <div key={type} className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span className="text-sm">{type}</span>
                                            <span className="text-sm font-medium">{count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Recommendations */}
                    {analysis.recommendations && analysis.recommendations.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Recommendations
                            </h3>
                            <ul className="space-y-2">
                                {analysis.recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-blue-500 mr-2">•</span>
                                        <span className="text-gray-700">{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GTMConnector;