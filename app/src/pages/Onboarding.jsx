import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

// Custom debounce function to avoid lodash dependencies breaking Vite bounds
function useDebounce(callback, delay) {
    const timeoutRef = useRef(null);
    return useCallback((...args) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
}

const STEPS = {
    USERNAME: 1,
    FULLNAME: 2,
    BIRTHDAY: 3,
    INTERESTS: 4,
    FOLLOW_SUGGESTIONS: 5,
    NOTIFICATIONS: 6,
    TUTORIAL: 7
};

const Onboarding = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(AuthContext);

    // We start at the step saved in the user profile, or 1
    const [step, setStep] = useState(user?.onboardingStep || 1);
    const [loading, setLoading] = useState(false);

    // Form Data
    const [username, setUsername] = useState(user?.username || '');
    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [usernameMsg, setUsernameMsg] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [fullName, setFullName] = useState(user?.fullName || '');
    const [birthDate, setBirthDate] = useState('');

    const [selectedInterests, setSelectedInterests] = useState([]);
    const [availableInterests, setAvailableInterests] = useState([]);

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [followingIds, setFollowingIds] = useState([]);

    useEffect(() => {
        if (user && user.onboardingCompleted) {
            navigate('/feed');
        }
    }, [user, navigate]);

    // Save step progress to backend
    const saveProgress = async (newStep, data = {}, isComplete = false) => {
        setLoading(true);
        try {
            await api.put('/users/profile/onboarding/profile', {
                ...data,
                onboardingStep: newStep,
                onboardingCompleted: isComplete
            });
            updateUser({ ...data, onboardingStep: newStep, onboardingCompleted: isComplete });
            if (isComplete) {
                // Save completed event
                await api.post('/users/profile/onboarding/event', { eventType: 'completed_onboarding' });
                navigate('/feed');
            } else {
                setStep(newStep);
            }
        } catch (error) {
            console.error('Error saving progress', error);
        }
        setLoading(false);
    };

    const handleSkip = () => {
        if (step === STEPS.TUTORIAL) {
            saveProgress(step, {}, true);
        } else {
            saveProgress(step + 1);
        }
    };

    // ------------- STEP 1: USERNAME -------------
    const checkUsernameBackend = useCallback(async (uname) => {
        if (uname.length < 3) return;
        try {
            // Note: we fetch this from auth-service path in the gateway
            const res = await api.get(`/auth/check-username?username=${uname}`);
            if (res.data.status === 'success') {
                setUsernameAvailable(res.data.available);
                if (res.data.available) {
                    setUsernameMsg('Username is available');
                    setSuggestions([]);
                } else {
                    setUsernameMsg(res.data.reason || 'Username is taken');
                    setSuggestions(res.data.suggestions || []);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, []);

    const debouncedCheck = useDebounce(checkUsernameBackend, 500);

    const handleUsernameChange = (e) => {
        const val = e.target.value.toLowerCase();
        setUsername(val);
        setUsernameAvailable(null);
        setUsernameMsg('');
        if (val === user?.username) {
            setUsernameAvailable(true); // Same as current
            return;
        }
        debouncedCheck(val);
    };

    const submitUsername = () => {
        if (usernameAvailable) {
            saveProgress(STEPS.FULLNAME, { username });
        }
    };

    // ------------- STEP 2: FULLNAME -------------
    const submitFullName = () => {
        saveProgress(STEPS.BIRTHDAY, { fullName });
    };

    // ------------- STEP 3: BIRTHDAY -------------
    const submitBirthday = () => {
        if (!birthDate) return;

        // Age gate logic optional frontend checks
        const dateObj = new Date(birthDate);
        const ageDifMs = Date.now() - dateObj.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (age < 13) {
            alert("You must be at least 13 years old to use Jaadoe.");
            return;
        }

        saveProgress(STEPS.INTERESTS, { birthDate });
    };

    // ------------- STEP 4: INTERESTS -------------
    useEffect(() => {
        if (step === STEPS.INTERESTS && availableInterests.length === 0) {
            api.get('/users/profile/onboarding/interests').then(res => {
                if (res.data.status === 'success') {
                    setAvailableInterests(res.data.data);
                }
            });
        }
    }, [step]);

    const toggleInterest = (id) => {
        if (selectedInterests.includes(id)) {
            setSelectedInterests(selectedInterests.filter(i => i !== id));
        } else {
            if (selectedInterests.length < 10) setSelectedInterests([...selectedInterests, id]);
        }
    };

    const submitInterests = async () => {
        if (selectedInterests.length < 3) return;
        setLoading(true);
        try {
            await api.post('/users/profile/onboarding/interests', { interestIds: selectedInterests });
            saveProgress(STEPS.FOLLOW_SUGGESTIONS);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    // ------------- STEP 5: FOLLOW -------------
    useEffect(() => {
        if (step === STEPS.FOLLOW_SUGGESTIONS) {
            api.get('/users/profile/onboarding/suggestions').then(res => {
                if (res.data.status === 'success') {
                    setSuggestedUsers(res.data.data);
                }
            });
        }
    }, [step]);

    const toggleFollow = async (targetId) => {
        try {
            if (followingIds.includes(targetId)) {
                await api.delete(`/users/${targetId}/follow`);
                setFollowingIds(followingIds.filter(id => id !== targetId));
            } else {
                await api.post(`/users/${targetId}/follow`);
                setFollowingIds([...followingIds, targetId]);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const submitFollows = () => {
        saveProgress(STEPS.NOTIFICATIONS);
    };

    // ------------- STEP 6: NOTIFICATIONS -------------
    const requestNotifications = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                saveProgress(STEPS.TUTORIAL, { notificationsEnabled: true });
                return;
            }
        }
        saveProgress(STEPS.TUTORIAL, { notificationsEnabled: false });
    };

    // ------------- RENDERERS -------------
    const renderStepContent = () => {
        switch (step) {
            case STEPS.USERNAME:
                return (
                    <div className="flex flex-col items-center animate-fadeIn">
                        <h2 className="text-2xl font-bold mb-2">Create Username</h2>
                        <p className="text-text-secondary mb-6 text-center">Add a username or use our suggestion. You can change this at any time.</p>
                        <input type="text" value={username} onChange={handleUsernameChange}
                            className="w-full bg-white/10 border border-white/20 p-3 rounded-xl outline-none focus:border-blue-500 mb-2"
                            placeholder="Username" />

                        {usernameMsg && (
                            <div className={`text-sm mb-4 ${usernameAvailable ? 'text-green-500' : 'text-red-500'}`}>
                                {usernameMsg}
                            </div>
                        )}

                        {suggestions.length > 0 && (
                            <div className="w-full flex gap-2 flex-wrap mb-4">
                                {suggestions.map(s => (
                                    <button key={s} onClick={() => { setUsername(s); setUsernameAvailable(true); setSuggestions([]); }}
                                        className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-sm hover:bg-white/20">
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button onClick={submitUsername} disabled={!usernameAvailable || loading || username.length < 3}
                            className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold mt-2 disabled:opacity-50 hover:bg-blue-700 transition">
                            Next
                        </button>
                    </div>
                );
            case STEPS.FULLNAME:
                return (
                    <div className="flex flex-col items-center animate-fadeIn">
                        <h2 className="text-2xl font-bold mb-2">Add Your Name</h2>
                        <p className="text-text-secondary mb-6 text-center">Add your name so friends can find you.</p>
                        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 p-3 rounded-xl outline-none focus:border-blue-500 mb-6"
                            placeholder="Full Name" />

                        <button onClick={submitFullName} disabled={!fullName || loading}
                            className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold disabled:opacity-50 hover:bg-blue-700 transition">
                            Next
                        </button>
                    </div>
                );
            case STEPS.BIRTHDAY:
                return (
                    <div className="flex flex-col items-center animate-fadeIn">
                        <div className="bg-blue-500/20 p-4 rounded-full mb-4">🎂</div>
                        <h2 className="text-2xl font-bold mb-2">What's your birthday?</h2>
                        <p className="text-text-secondary mb-6 text-center text-sm">Use your own birthday, even if this account is for a business, a pet, or something else. No one will see this unless you choose to share it.</p>
                        <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 p-3 rounded-xl outline-none focus:border-blue-500 mb-6 text-text-primary" />

                        <button onClick={submitBirthday} disabled={!birthDate || loading}
                            className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold disabled:opacity-50 hover:bg-blue-700 transition">
                            Next
                        </button>
                    </div>
                );
            case STEPS.INTERESTS:
                return (
                    <div className="flex flex-col items-center animate-fadeIn w-full max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-2">What are you into?</h2>
                        <p className="text-text-secondary mb-6 text-center">Pick at least 3 interests so we can personalize your experience.</p>

                        <div className="w-full flex flex-wrap gap-3 justify-center mb-6">
                            {availableInterests.map(interest => (
                                <button key={interest.id}
                                    onClick={() => toggleInterest(interest.id)}
                                    className={`px-4 py-2 rounded-full border transition-all ${selectedInterests.includes(interest.id)
                                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                                        : 'bg-white/5 border-white/20 text-text-primary hover:bg-white/10'
                                        }`}>
                                    {interest.name}
                                </button>
                            ))}
                        </div>

                        <button onClick={submitInterests} disabled={selectedInterests.length < 3 || loading}
                            className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold disabled:opacity-50 hover:bg-blue-700 transition">
                            Next ({selectedInterests.length}/10 Max)
                        </button>
                    </div>
                );
            case STEPS.FOLLOW_SUGGESTIONS:
                return (
                    <div className="flex flex-col w-full h-full max-h-[80vh] animate-fadeIn">
                        <h2 className="text-2xl font-bold mb-2 text-center">Find People to Follow</h2>
                        <p className="text-text-secondary mb-4 text-center">Follow accounts to see their photos and videos.</p>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
                            {suggestedUsers.map(u => (
                                <div key={u.userId} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-600 rounded-full overflow-hidden">
                                            {u.profilePicture && <img src={u.profilePicture} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                        <div>
                                            <div className="font-bold">{u.username}</div>
                                            <div className="text-xs text-text-secondary">{u.fullName}</div>
                                        </div>
                                    </div>
                                    <button onClick={() => toggleFollow(u.userId)}
                                        className={`px-4 py-1.5 rounded-lg font-semibold text-sm transition-colors ${followingIds.includes(u.userId) ? 'bg-white/20 text-text-primary' : 'bg-blue-600 text-white'}`}>
                                        {followingIds.includes(u.userId) ? 'Following' : 'Follow'}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button onClick={submitFollows} disabled={loading}
                            className="w-full bg-blue-600 text-white rounded-xl py-3 font-bold hover:bg-blue-700 transition">
                            Next
                        </button>
                    </div>
                );
            case STEPS.NOTIFICATIONS:
                return (
                    <div className="flex flex-col items-center animate-fadeIn text-center">
                        <div className="bg-blue-500/20 p-6 rounded-full mb-6 text-4xl">🔔</div>
                        <h2 className="text-2xl font-bold mb-4">Turn on Notifications</h2>
                        <p className="text-text-secondary mb-8 leading-relaxed">Know right away when people follow you or like and comment on your photos.</p>

                        <div className="w-full space-y-3">
                            <button onClick={requestNotifications} className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold hover:bg-blue-700 transition">
                                Turn On
                            </button>
                            <button onClick={() => handleSkip()} className="w-full bg-transparent text-blue-500 font-bold py-3.5 hover:bg-blue-500/10 rounded-xl transition">
                                Skip
                            </button>
                        </div>
                    </div>
                );
            case STEPS.TUTORIAL:
                return (
                    <div className="flex flex-col items-center animate-fadeIn text-center w-full">
                        <div className="w-full h-48 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl mb-6 flex items-center justify-center">
                            <span className="text-5xl">✨</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-4">You're All Set!</h2>
                        <p className="text-text-secondary mb-8">Welcome to Jaadoe. Start exploring photos, videos, and live streams from around the world.</p>

                        <button onClick={() => saveProgress(step, {}, true)} className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold hover:bg-blue-700 transition mt-auto">
                            Finish
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-bg-dark text-text-primary flex flex-col justify-center items-center py-5 px-4 font-sans">
            <div className="glass p-8 w-full max-w-[450px] min-h-[500px] flex flex-col rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-xl border border-white/10">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500" style={{ width: `${(step / 7) * 100}%` }}></div>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center h-full pt-4">
                    {renderStepContent()}
                </div>

                {/* Footer Controls */}
                {step > 1 && step < STEPS.NOTIFICATIONS && step !== STEPS.TUTORIAL && (
                    <div className="flex justify-between mt-6 pt-4 border-t border-white/10 w-full animate-fadeIn">
                        <button onClick={() => setStep(step - 1)} className="text-sm font-semibold text-text-secondary hover:text-text-primary transition">Back</button>
                        <button onClick={handleSkip} className="text-sm font-semibold text-text-secondary hover:text-text-primary transition">Skip</button>
                    </div>
                )}
                {step === 1 && (
                    <div className="flex justify-end mt-6 pt-4 border-t border-white/10 w-full animate-fadeIn">
                        <button onClick={handleSkip} className="text-sm font-semibold text-text-secondary hover:text-text-primary transition">Skip</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;
