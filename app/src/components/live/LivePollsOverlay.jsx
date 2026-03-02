import React, { useState, useEffect } from 'react';
import { useLive } from './LiveProvider';
import { BarChart3, Plus, X } from 'lucide-react';

const LivePollsOverlay = ({ socket, streamId, isHost }) => {
    const [activePoll, setActivePoll] = useState(null);
    const [results, setResults] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

    // Create form state
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    useEffect(() => {
        if (!socket) return;

        socket.on('new_poll', (poll) => {
            setActivePoll(poll);
            setResults([]);
        });

        socket.on('poll_results_update', ({ results }) => {
            setResults(results);
        });

        return () => {
            socket.off('new_poll');
            socket.off('poll_results_update');
        };
    }, [socket]);

    const handleCreatePoll = () => {
        if (!question || options.some(o => !o)) return;
        socket?.emit('create_poll', {
            streamId,
            question,
            options: options.map(o => ({ text: o })),
            duration: 60
        });
        setShowCreate(false);
    };

    const totalVotes = results.reduce((acc, curr) => acc + parseInt(curr.count), 0);

    return (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 size={18} className="text-pink-500" />
                    Live Polls
                </h2>
                {isHost && (
                    <button
                        onClick={() => setShowCreate(true)}
                        className="p-1.5 rounded-lg bg-pink-600 text-white hover:bg-pink-500 transition-colors"
                    >
                        <Plus size={16} />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {showCreate ? (
                    <div className="space-y-4 animate-fade-in">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-white/50 uppercase tracking-tighter">Question</label>
                            <input
                                type="text"
                                value={question}
                                onChange={e => setQuestion(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
                                placeholder="What's your favorite color?"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-white/50 uppercase tracking-tighter">Options</label>
                            {options.map((opt, i) => (
                                <input
                                    key={i}
                                    type="text"
                                    value={opt}
                                    onChange={e => {
                                        const newOpts = [...options];
                                        newOpts[i] = e.target.value;
                                        setOptions(newOpts);
                                    }}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm"
                                    placeholder={`Option ${i + 1}`}
                                />
                            ))}
                            {options.length < 4 && (
                                <button
                                    onClick={() => setOptions([...options, ''])}
                                    className="text-[10px] font-bold text-pink-500 uppercase"
                                >
                                    + Add Option
                                </button>
                            )}
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button onClick={() => setShowCreate(false)} className="flex-1 py-2 rounded-xl bg-white/5 text-white text-xs font-bold uppercase">Cancel</button>
                            <button onClick={handleCreatePoll} className="flex-1 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold uppercase">Create</button>
                        </div>
                    </div>
                ) : activePoll ? (
                    <div className="space-y-6">
                        <div className="text-center space-y-2">
                            <h3 className="text-white font-bold leading-tight">{activePoll.question}</h3>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{totalVotes} votes total</p>
                        </div>

                        <div className="space-y-3">
                            {activePoll.options.map((opt, i) => {
                                const result = results.find(r => parseInt(r.option_index) === i);
                                const count = result ? parseInt(result.count) : 0;
                                const percent = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

                                return (
                                    <button
                                        key={i}
                                        onClick={() => socket?.emit('vote_poll', { streamId, pollId: activePoll.id, optionIndex: i })}
                                        className="w-full relative group"
                                    >
                                        <div className="absolute inset-0 bg-white/5 rounded-xl border border-white/10" />
                                        <div
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500/30 to-blue-500/30 rounded-xl transition-all duration-1000 ease-out"
                                            style={{ width: `${percent}%` }}
                                        />
                                        <div className="relative p-3 flex justify-between items-center">
                                            <span className="text-white text-sm font-medium tracking-tight">{opt.text}</span>
                                            <span className="text-white font-black text-xs">{percent}%</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <BarChart3 size={48} className="mx-auto text-white/10 mb-4" />
                        <p className="text-white/30 text-xs">No active polls</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LivePollsOverlay;
