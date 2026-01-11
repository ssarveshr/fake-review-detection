import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { predictReview } from '../services/api';

const ReviewForm = () => {
    const [review, setReview] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const resultsRef = useRef(null);

    useEffect(() => {
        if (result && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [result]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!review.trim()) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const data = await predictReview(review);
            setResult(data);
        } catch (err) {
            setError(err.error || 'Failed to analyze review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Paste the review text here to analyze..."
                        className="w-full h-48 p-6 bg-card border border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-lg placeholder-gray-500 transition-all shadow-lg"
                    />
                    <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                        {review.length} chars
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading || !review.trim()}
                    className={`w-full py-4 text-lg font-bold rounded-xl shadow-lg transition-all ${loading || !review.trim()
                        ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                        : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-primary/30'
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Analyzing...
                        </span>
                    ) : (
                        'Analyze Review'
                    )}
                </motion.button>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center"
                    >
                        {error}
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        ref={resultsRef}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 grid grid-cols-2 gap-4"
                    >
                        <div className={`col-span-2 p-6 rounded-2xl border ${result.prediction === 'Fake'
                            ? 'bg-red-500/10 border-red-500/30'
                            : 'bg-green-500/10 border-green-500/30'
                            }`}>
                            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400 mb-1">
                                Prediction
                            </h3>
                            <div className={`text-3xl font-bold ${result.prediction === 'Fake' ? 'text-red-400' : 'text-green-400'
                                }`}>
                                {result.prediction} Review
                            </div>
                        </div>

                        <div className="col-span-2 p-6 bg-card border border-gray-700 rounded-2xl">
                            <div className="flex justify-between items-end mb-2">
                                <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                                    Confidence Score
                                </h3>
                                <span className="text-2xl font-bold text-white">
                                    {result.confidence}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${result.confidence}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`h-full ${result.prediction === 'Fake' ? 'bg-red-500' : 'bg-green-500'
                                        }`}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReviewForm;
