import React from 'react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  isLoading: boolean;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, title, content, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-md shadow-2xl overflow-hidden relative border border-white/20 bg-black/40">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-5 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 drop-shadow-md">
            <i className="fa-solid fa-wand-magic-sparkles text-purple-300"></i>
            {title}
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-white/90 leading-relaxed min-h-[150px] relative">
           {/* Decorative bg element */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/10 blur-[60px] rounded-full pointer-events-none"></div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
              <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
              <p className="text-white/60 text-sm font-medium animate-pulse">AI 導遊正在翻閱歷史書籍...</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm relative z-10">
               {content}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 bg-black/20 flex justify-end border-t border-white/5">
           <button 
             onClick={onClose}
             className="glass-button px-6 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all border border-white/10 shadow-lg"
           >
             關閉
           </button>
        </div>
      </div>
    </div>
  );
};