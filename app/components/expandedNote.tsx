import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface ExpandedNoteProps {
  note: {
    _id: string;
    title: string;
    content: string;
    aiSummary?: string;
  };
  id: string;
  showAISummary: boolean;
  onToggleAISummary: () => void;
  ref: React.RefObject<HTMLDivElement>;
}

const stripHTMLTags = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export const ExpandedNote = ({ note, id, showAISummary, onToggleAISummary, ref }: ExpandedNoteProps) => {
  const [aiSummary, setAiSummary] = useState(note.aiSummary || "");

  useEffect(() => {
    setAiSummary(note.aiSummary || "");
  }, [note.aiSummary]);

  return (
    <div className="fixed inset-0 grid place-items-center z-[100] p-4">
      <motion.div
        layoutId={`card-${note._id}-${id}`}
        ref={ref}
        className="w-[calc(100vw-2rem)] sm:w-full max-w-[500px] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl"
      >
        <div className="p-4 sm:p-6">
          <motion.h3
            layoutId={`title-${note._id}-${id}`}
            className="font-bold text-xl sm:text-2xl text-neutral-800 dark:text-neutral-200"
          >
            {note.title}
          </motion.h3>
          <motion.div layout className="text-neutral-600 dark:text-neutral-400 text-sm mt-4">
            <AnimatePresence mode="wait">
              {showAISummary ? (
                <motion.p 
                  key="summary"
                  layoutId={`content-${note._id}-${id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <strong className="block text-neutral-800 dark:text-neutral-200">AI Summary:</strong>
                  <span className="block">
                    {aiSummary?.replace(/^\*\*Summary:\*\*\s*/, "") || "No summary available"}
                  </span>
                </motion.p>
              ) : (
                <motion.p 
                  key="description"
                  layoutId={`content-${note._id}-${id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <strong className="block text-neutral-800 dark:text-neutral-200">Description:</strong>
                  <span className="block">
                    {stripHTMLTags(note.content)}
                  </span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
          <Button 
            onClick={onToggleAISummary} 
            variant="outline" 
            className="w-full mt-6 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border-neutral-200 dark:border-neutral-700"
          >
            {showAISummary ? "Show Description" : "Show AI Summary"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};