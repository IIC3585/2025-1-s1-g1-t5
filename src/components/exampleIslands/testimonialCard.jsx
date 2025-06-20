// TestimonialCard.jsx
import React from 'react';

const TestimonialCard = ({ name, role, quote, avatar }) => {
  return (
    <div className="max-w-md p-6 mb-8 glass-effect glass-purple"
    data-island="testimonial-Card" data-framework="react"
    >
      <div className="flex items-center mb-4">
        <img 
          className="h-12 w-12 rounded-full object-cover mr-4" 
          src={avatar} 
          alt={`${name}'s avatar`}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-200">{name}</h3>
          <p className="text-gray-300 text-sm">{role}</p>
        </div>
      </div>
      <blockquote className="text-gray-400 italic">
        "{quote}"
      </blockquote>
      <div className="mt-4 flex justify-end">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;