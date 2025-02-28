import { useState, useEffect } from 'react';
import { useNoteManagementStore } from '../store/noteManagement';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchNotes = useNoteManagementStore(state => state.searchNotes);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchNotes(searchTerm);
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchNotes]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search notes..."
      className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
};
