import React from 'react';
import { useLive } from './components/live/LiveProvider';
import LivePreviewScreen from './components/live/LivePreviewScreen';
import LiveBroadcastScreen from './components/live/LiveBroadcastScreen';
import LiveEndSummaryModal from './components/live/LiveEndSummaryModal';

const AppLiveController = () => {
    const { streamState, liveStats, isHost } = useLive();

    if (!isHost) return null; // Viewer handles it in LiveViewerPage

    if (streamState === 'preview') {
        return <LivePreviewScreen />;
    }

    if (streamState === 'live') {
        return <LiveBroadcastScreen />;
    }

    if (streamState === 'ended') {
        return <LiveEndSummaryModal summary={liveStats} />;
    }

    return null;
};

export default AppLiveController;
