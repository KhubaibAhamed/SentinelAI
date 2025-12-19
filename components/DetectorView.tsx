
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { classifyText } from '../services/geminiService';
import { ClassificationResult, ToxicSpan } from '../types';

const DetectorView: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleAnalyze = useCallback(async (text: string) => {
    if (!text.trim()) {
      setResult(null);
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await classifyText(text);
      setResult(data);
    } catch (err) {
      setError("Analysis failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (inputText.length > 5) {
      timeoutRef.current = window.setTimeout(() => {
        handleAnalyze(inputText);
      }, 1000);
    }
    return () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); };
  }, [inputText, handleAnalyze]);

  const getModerationAction = () => {
    if (!result) return { label: 'Unknown', color: 'bg-slate-100 text-slate-500' };
    // Fix: Explicitly cast to number[] to resolve unknown type error from Object.values in Math.max
    const maxScore = Math.max(...(Object.values(result.scores) as number[]));
    if (maxScore > 0.8) return { label: 'BLOCK', color: 'bg-red-100 text-red-700 border-red-200' };
    if (maxScore > 0.5) return { label: 'FLAG', color: 'bg-amber-100 text-amber-700 border-amber-200' };
    return { label: 'ALLOW', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  };

  const highlightedText = () => {
    if (!result || !result.spans.length) return inputText;
    
    // Sort spans by start index
    const sortedSpans = [...result.spans].sort((a, b) => a.start - b.start);
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    sortedSpans.forEach((span, idx) => {
      // Text before the span
      if (span.start > lastIndex) {
        elements.push(inputText.substring(lastIndex, span.start));
      }
      // The toxic span
      elements.push(
        <mark key={idx} className="bg-red-200 text-red-900 px-1 rounded cursor-help transition-all hover:bg-red-300" title={span.label}>
          {inputText.substring(span.start, span.end)}
        </mark>
      );
      lastIndex = span.end;
    });

    if (lastIndex < inputText.length) {
      elements.push(inputText.substring(lastIndex));
    }

    return elements;
  };

  const action = getModerationAction();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Live Content Guard</h2>
          {isAnalyzing && (
            <div className="flex items-center gap-2 text-indigo-600 animate-pulse">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xs font-semibold uppercase tracking-wider">Analyzing...</span>
            </div>
          )}
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Input Content</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste content here for real-time toxicity analysis..."
                className="w-full h-48 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none text-slate-800"
              />
            </div>
            
            {result && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Live Feedback (Spans)</h3>
                <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                  {highlightedText()}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700 uppercase">Authoritative Action</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${action.color}`}>
                {action.label}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-700 uppercase">Risk Breakdown</h3>
              {result ? (
                // Fix: Explicitly cast Object.entries to [string, number][] to avoid unknown type comparison and arithmetic errors
                (Object.entries(result.scores) as [string, number][]).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="capitalize text-slate-600">{key.replace('_', ' ')}</span>
                      <span className={`font-mono font-semibold ${value > 0.5 ? 'text-red-500' : 'text-slate-500'}`}>
                        {(value * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${value > 0.8 ? 'bg-red-500' : value > 0.4 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                        style={{ width: `${value * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-sm italic">Enter text to view metrics</p>
                </div>
              )}
            </div>

            {result && (
              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-mono">
                  <span>Model: {result.modelVersion}</span>
                  <span>Latency: {result.latencyMs}ms</span>
                </div>
                <div className="mt-2 p-3 bg-indigo-50 rounded-lg text-xs text-indigo-800 border border-indigo-100 italic">
                  "{result.explanation}"
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectorView;
