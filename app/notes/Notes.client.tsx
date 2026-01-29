"use client";

import css from "./notes.module.css";

import { useState } from "react";
import { useDebounce } from "use-debounce";


import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";



function NotesClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearchQuery] = useDebounce (searchQuery, 500);

  const { data } = useQuery({
    queryKey: ["notes", debounceSearchQuery, currentPage],
    queryFn: () => fetchNotes(debounceSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });


  const handleChange = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };



  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button
          onClick={() => {
            toggleModal();
          }}
          className={css.button}
        >
          Create note +
        </button>
      </header>

 {isModalOpen &&  <Modal onClose={toggleModal}>
   <NoteForm onClose = { () =>  toggleModal() } /> 
   </Modal>}


      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default NotesClient;
