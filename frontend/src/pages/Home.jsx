import React from 'react';
import ReviewForm from '../components/ReviewForm';

const Home = () => {
    return (
        <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-4xl mx-auto text-center mb-12 space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                    Fake Review <br />
                    <span className="gradient-text">Detection</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                    This system uses Machine Learning and Natural Language Processing (NLP) to analyze product reviews and 
                    identify whether they are genuine or potentially fake by 
                    applying TF-IDF text vectorization and a Naive Bayes 
                    classification model trained on labeled review data.
                </p>
            </div>

            <ReviewForm />

        
        </div>
    );
};

export default Home;
