import React, { useState } from "react";
import { chatAI } from "../api";

export default function ChatbotCard() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  async function ask() {
    if (!query.trim()) return;
    
    setLoading(true);
    setShowAnswer(false);
    
    try {
      const res = await chatAI(query);
      setAnswer(res.answer || res);
      setShowAnswer(true);
    } catch (e) {
      setAnswer("Sorry, I'm having trouble connecting. Please try again.");
      setShowAnswer(true);
    }
    
    setLoading(false);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Header */}
      <div className="mb-3">
        <h3 className="font-semibold text-gray-800">AI Assistant</h3>
        <p className="text-xs text-gray-600">Get expert advice on farming, crops, and agriculture</p>
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={2}
          placeholder="Ask about soil health, pest control, crop management, market prices, loans, or any farming question..."
          disabled={loading}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <span>AI Assistant Online</span>
          </div>
          
          <button
            onClick={ask}
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Thinking...
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Ask AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Answer Display */}
      {showAnswer && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="border-l-4 border-blue-500 pl-3">
            <h4 className="text-sm font-medium text-gray-800 mb-1">Response:</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{answer}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Press Enter to send • Powered by AgriSmartAI
        </p>
      </div>
    </div>
  );
}