
'use client'

import React, { useEffect, useCallback, Suspense, memo } from "react";
import "react-quill-new/dist/quill.snow.css";
import { editNote } from "../store/editNote";
import { TitleInput } from "./titleInput";
import { TextEditor } from "./textEditor";
import { TagsInput } from "./tagsInput";
import CancelButton from "./cancelButton";
import { SubmitButton } from "./submitButton";
import axios from "axios";

interface EditNoteModalProps {
  noteId: string;
  closeModal: () => void;
  onNoteUpdate: (updatedNote: { _id: string; title: string; content: string; tags: string[],aiSummary?:string }) => void;
}

const MemoizedSubmitButton = memo(SubmitButton);

const EditNoteModal = ({ noteId, closeModal, onNoteUpdate }:EditNoteModalProps) => {
  const { title, content, tags, loading, fetchNote, updateNote, setTitle, setContent, setTags } = editNote();

  useEffect(() => {
    fetchNote(noteId);
  }, [noteId, fetchNote]);

  const handleSave = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const noteResponse = await axios.get(`https://masonbackend-production.up.railway.app/notes/${noteId}`, {
          headers: { Authorization: token }
        });
        
        const currentAiSummary = noteResponse.data.note.aiSummary;
        
        await updateNote(noteId, token, async () => "", () => {
          onNoteUpdate({ 
            _id: noteId, 
            title, 
            content, 
            tags,
            aiSummary: currentAiSummary
          });
          closeModal();
        });
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      console.error('No token found');
    }
  }, [updateNote, noteId, onNoteUpdate, title, content, tags, closeModal]);

  const handleTitleChange = useCallback((value: string) => setTitle(value), [setTitle]);
  const handleContentChange = useCallback((value: string) => setContent(value), [setContent]);
  const handleTagsChange = useCallback((value: string) => setTags(value.split(",")), [setTags]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-lg w-full border border-purple-100">
        <h2 className="text-xl font-semibold mb-4 text-purple-900">Edit Note</h2>

        <TitleInput value={title} onChange={handleTitleChange} />
        <TextEditor value={content} onChange={handleContentChange} />
        <br/>
        <TagsInput value={tags.join(",")} onChange={handleTagsChange} />

        <div className="flex justify-end space-x-2 mt-4">
          <Suspense fallback={<div>Loading...</div>}>
            <CancelButton onClick={closeModal} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <MemoizedSubmitButton loading={loading} onClick={handleSave} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default memo(EditNoteModal);