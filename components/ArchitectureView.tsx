
import React from 'react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">System Architecture</h2>
        <p className="text-slate-500">End-to-end design for scalable, fair, and explainable moderation.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Frontend Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <h3 className="font-semibold text-lg">Client Side</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span><strong>UX Nudges:</strong> Real-time feedback using debounced API calls.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span><strong>Span Highlighting:</strong> Visual indicators for toxic segments.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span><strong>Intervention UI:</strong> Educational modals explaining potential violations.</span>
            </li>
          </ul>
        </div>

        {/* Backend Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>
            </div>
            <h3 className="font-semibold text-lg">API & Logic</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-purple-500 font-bold">•</span>
              <span><strong>Rule Engine:</strong> Combines ML scores with profanity lexicons.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 font-bold">•</span>
              <span><strong>Authoritative Moderation:</strong> Final decision logic (Allow/Flag/Block).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 font-bold">•</span>
              <span><strong>Enrichment:</strong> Attaches metadata like PII detection & language ID.</span>
            </li>
          </ul>
        </div>

        {/* Inference Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 className="font-semibold text-lg">Inference Engine</h3>
          </div>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>Primary:</strong> Fine-tuned RoBERTa-large on GPU clusters.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>Fallback:</strong> SVM + TF-IDF for high-availability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              <span><strong>Registry:</strong> Versioned artifacts with canary deployment support.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Authoritative DB Schema (PostgreSQL)</h3>
        <pre className="text-xs md:text-sm bg-slate-800 p-6 rounded-lg overflow-x-auto leading-relaxed">
{`-- SQL Migrations for SentinelAI
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    text TEXT NOT NULL,
    language VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,
    message_id UUID REFERENCES messages(id),
    model_version VARCHAR(50) NOT NULL,
    scores JSONB NOT NULL,
    label VARCHAR(20),
    latency_ms INTEGER,
    explanation TEXT
);

CREATE TABLE moderation_actions (
    id SERIAL PRIMARY KEY,
    message_id UUID REFERENCES messages(id),
    action_type VARCHAR(20) CHECK (action_type IN ('ALLOW', 'FLAG', 'BLOCK')),
    reason_code VARCHAR(50),
    reviewer_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
        </pre>
      </div>
    </div>
  );
};

export default ArchitectureView;
