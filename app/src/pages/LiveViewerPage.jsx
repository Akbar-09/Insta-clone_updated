import React from 'react';
import { useParams } from 'react-router-dom';
import LiveViewerScreen from '../components/live/LiveViewerScreen';

const LiveViewerPage = () => {
    const { id } = useParams();
    return <LiveViewerScreen streamId={id} />;
};

export default LiveViewerPage;
