
import React from 'react';

const MLOpsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">MLOps Pipeline</h2>
        <p className="text-slate-500">Continuous integration and deployment for toxicity models.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            Deployment Config (Kubernetes)
          </h3>
          <pre className="text-xs bg-slate-50 p-4 rounded-lg overflow-x-auto text-slate-700 border border-slate-100">
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: toxicity-classifier
spec:
  replicas: 3
  selector:
    matchLabels:
      app: sentinel-model
  template:
    spec:
      containers:
      - name: sentinel-api
        image: sentinel-ai/classifier:v2.1
        resources:
          limits:
            nvidia.com/gpu: 1
        readinessProbe:
          httpGet:
            path: /health
            port: 8080`}
          </pre>
        </section>

        <section className="bg-white p-6 rounded-xl border border-slate-200">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Fairness Audit Checklist
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-800 text-sm">Subgroup Performance</h4>
              <p className="text-xs text-green-700">Audit TPR/FPR across identity groups (race, religion, gender) to ensure no biased penalization.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 text-sm">Adversarial Robustness</h4>
              <p className="text-xs text-blue-700">Test against common obfuscation techniques (e.g., L00k at th!s) used to bypass filters.</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h4 className="font-semibold text-amber-800 text-sm">Explainability Hooks</h4>
              <p className="text-xs text-amber-700">Utilize Integrated Gradients or SHAP to visualize why a specific token was marked toxic.</p>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-white p-6 rounded-xl border border-slate-200">
        <h3 className="text-lg font-bold mb-4">Training Protocol (Jigsaw + In-Domain)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Data Ingestion', desc: 'S3 to DataBricks' },
            { step: '2', title: 'Fine-tuning', desc: 'PyTorch Lightning' },
            { step: '3', title: 'Validation', desc: 'A/B Canary Test' },
            { step: '4', title: 'Registry', desc: 'MLFlow Artifacts' },
          ].map((item) => (
            <div key={item.step} className="text-center p-4 border rounded-lg hover:border-indigo-300 transition-colors">
              <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2 font-bold">{item.step}</div>
              <h4 className="font-semibold text-sm">{item.title}</h4>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MLOpsView;
