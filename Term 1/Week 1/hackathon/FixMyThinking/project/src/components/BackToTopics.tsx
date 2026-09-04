import { useState } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

interface BackToTopicsProps {
  hasProgress: boolean;
  onConfirm: () => void;
}

export function BackToTopics({ hasProgress, onConfirm }: BackToTopicsProps) {
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    if (hasProgress) {
      setShowDialog(true);
    } else {
      onConfirm();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-700 font-medium transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to topics
      </button>

      {showDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-ink-900/40 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowDialog(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-600" strokeWidth={2.2} />
              </div>
              <h3 className="font-semibold text-ink-900">Leave practice?</h3>
            </div>
            <p className="text-sm text-ink-500 leading-relaxed mb-6">
              Your current session progress will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="flex-1 px-4 py-3 text-sm font-medium text-ink-700 bg-ink-100 rounded-xl hover:bg-ink-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDialog(false);
                  onConfirm();
                }}
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-ink-900 rounded-xl hover:bg-ink-800 transition-colors"
              >
                Leave practice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
