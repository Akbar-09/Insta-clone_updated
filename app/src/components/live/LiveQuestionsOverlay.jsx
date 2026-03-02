import React, { useState, useEffect } from 'react';
import { useLive } from './LiveProvider';
import { HelpCircle, X, Check, MessageSquare } from 'lucide-react';

const LiveQuestionsOverlay = ({ socket, streamId, isHost }) => {
    const [questions, setQuestions] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [newQuestion, setNewQuestion] = useState('');

    useEffect(() => {
        if (!socket) return;

        socket.on('new_question', (question) => {
            setQuestions(prev => [question, ...prev]);
        });

        socket.on('question_highlight_update', ({ questionId, isHighlighted }) => {
            if (isHighlighted) {
                // Find and set as active
                setQuestions(prev => prev.map(q => ({
                    ...q,
                    is_highlighted: q.id === questionId
                })));
            } else {
                setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, is_highlighted: false } : q));
            }
        });

        return () => {
            socket.off('new_question');
            socket.off('question_highlight_update');
        };
    }, [socket]);

    const handleAnswerQuestion = (qId) => {
        socket?.emit('highlight_question', { streamId, questionId: qId, isHighlighted: true });
    };

    const handleStopHighlight = (qId) => {
        socket?.emit('highlight_question', { streamId, questionId: qId, isHighlighted: false });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;
        socket?.emit('ask_question', { streamId, content: newQuestion });
        setNewQuestion('');
    };

    const highlighted = questions.find(q => q.is_highlighted);

    return (
        <div className="flex flex-col h-full bg-black/40 backdrop-blur-xl">
            <div className="p-4 border-b border-white/10">
                <h2 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    <HelpCircle size={18} className="text-pink-500" />
                    Q&A Session
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {questions.length === 0 && (
                    <div className="text-center py-20">
                        <MessageSquare size={48} className="mx-auto text-white/10 mb-4" />
                        <p className="text-white/30 text-xs">No questions yet. Ask something!</p>
                    </div>
                )}

                {questions.map(q => (
                    <div key={q.id} className={`p-3 rounded-2xl border transition-all ${q.is_highlighted ? 'glass-premium border-pink-500/50 bg-pink-500/10' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-white/40 uppercase">{q.username}</span>
                            {isHost && (
                                <button
                                    onClick={() => q.is_highlighted ? handleStopHighlight(q.id) : handleAnswerQuestion(q.id)}
                                    className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${q.is_highlighted ? 'bg-pink-600 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                                >
                                    {q.is_highlighted ? 'Stop' : 'Answer'}
                                </button>
                            )}
                        </div>
                        <p className="text-white text-sm leading-relaxed">{q.content}</p>
                    </div>
                ))}
            </div>

            {!isHost && (
                <div className="p-4 bg-gradient-to-t from-black to-transparent">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 bg-white/5 border-white/10 text-white text-sm rounded-xl px-4 py-2.5 outline-none focus:bg-white/10"
                        />
                        <button className="bg-pink-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase">Ask</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LiveQuestionsOverlay;
