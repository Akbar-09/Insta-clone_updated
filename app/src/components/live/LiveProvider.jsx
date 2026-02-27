import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const LiveContext = createContext(null);

export const useLive = () => useContext(LiveContext);

export const LiveProvider = ({ children }) => {
    // idle, preview, live, ended
    const [streamState, setStreamState] = useState('idle');
    const [streamData, setStreamData] = useState(null);
    const [connectionDetails, setConnectionDetails] = useState(null); // { token, livekit_url, room_name }
    const [isHost, setIsHost] = useState(false);
    const [liveStats, setLiveStats] = useState({ duration: 0, peakViewers: 0 });

    const { user: authUser } = useAuth();

    useEffect(() => {
        if (streamData && authUser?.id) {
            // Ensure comparison works regardless of type (string vs number)
            setIsHost(String(streamData.host_id) === String(authUser.id));
        } else {
            setIsHost(false);
        }
    }, [streamData, authUser?.id]);

    // Use relative path so Vite's HTTPS proxy handles the routing to backend port 5000 and avoids Mixed Content
    const API_URL = import.meta.env.VITE_API_URL || `/api/v1`;
    const api = axios.create({
        baseURL: API_URL
    });

    api.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    const createStream = async (formData) => {
        try {
            const res = await api.post('/live/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStreamData(res.data.data);
            setStreamState('preview');
            return res.data.data;
        } catch (error) {
            console.error('Create stream error:', error);
            throw error;
        }
    };

    const startStream = async (id) => {
        try {
            const res = await api.post(`/live/start/${id}`);
            setConnectionDetails(res.data.data);
            setStreamState('live');
        } catch (error) {
            console.error('Start stream error:', error);
            throw error;
        }
    };

    const joinStream = async (id, role = 'viewer') => {
        try {
            // Provide streamData for the UI viewer beforehand so thumbnail etc renders perfectly
            const detailsRes = await api.get(`/live/${id}`);
            setStreamData(detailsRes.data.data);

            const res = await api.post(`/live/join/${id}?role=${role}`);
            setConnectionDetails(res.data.data);
            setStreamState('live');
        } catch (error) {
            console.error('Join stream error:', error);
            throw error;
        }
    };

    const endStream = async (id, stats = null) => {
        try {
            if (stats) setLiveStats(stats);
            if (isHost) {
                await api.post(`/live/end/${id}`);
            }
            setConnectionDetails(null);
            setStreamState('ended');
        } catch (error) {
            console.error('End stream error:', error);
            setStreamState('ended');
        }
    };

    const resetStream = () => {
        setStreamState('idle');
        setStreamData(null);
        setConnectionDetails(null);
        setLiveStats({ duration: 0, peakViewers: 0 });
    };

    return (
        <LiveContext.Provider value={{
            streamState,
            streamData,
            connectionDetails,
            isHost,
            liveStats,
            createStream,
            startStream,
            joinStream,
            endStream,
            resetStream
        }}>
            {children}
        </LiveContext.Provider>
    );
};
