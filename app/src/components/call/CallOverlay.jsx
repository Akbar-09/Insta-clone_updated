import React from 'react';
import { useLiveKitCall } from './CallProvider';
import OutgoingCallScreen from './OutgoingCallScreen';
import IncomingCallModal from './IncomingCallModal';
import ActiveCallScreen from './ActiveCallScreen';

const CallOverlay = () => {
    const { callState, activeCall, localToken, livekitUrl, acceptCall, rejectCall, endCall } = useLiveKitCall();

    if (callState === 'idle') return null;

    return (
        <>
            {callState === 'ringing_outgoing' && activeCall && (
                <OutgoingCallScreen call={activeCall} onEnd={endCall} />
            )}

            {callState === 'ringing_incoming' && activeCall && (
                <IncomingCallModal
                    call={activeCall}
                    onAccept={acceptCall}
                    onReject={rejectCall}
                />
            )}

            {callState === 'active' && localToken && livekitUrl && activeCall && (
                <ActiveCallScreen
                    token={localToken}
                    serverUrl={livekitUrl}
                    callType={activeCall.callType}
                    onEnd={endCall}
                />
            )}

            {callState === 'ended' && (
                <div className="fixed inset-0 z-[2000] bg-black/80 flex items-center justify-center backdrop-blur-md animate-in fade-in duration-300">
                    <div className="text-white text-2xl font-semibold">Call Ended</div>
                </div>
            )}
        </>
    );
};

export default CallOverlay;
