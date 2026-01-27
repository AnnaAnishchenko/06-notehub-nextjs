"use client"
import {fetchNoteById} from "@/lib/api";
import css from '../notes.module.css';

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";



function NoteDetailsClient () {
const { id } = useParams<{ id: string }>();

const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });


 if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
export default NoteDetailsClient;










// "use client"
// import {fetchNoteById} from "@/lib/api";
// import css from "./Notes.module.css";


// interface NoteDetailsProps {
//    params: Promise<{ id: string }>;
// }


// async function NoteDetailsClient ({params}: NoteDetailsProps) {
// const { id } = await params;
// const note = await fetchNoteById(id);
//     return(
//        <div className={css.container}>
// 	<div className={css.item}>
// 	  <div className={css.header}>
// 	    <h2>Note title</h2>
// 	  </div>
// 	  <p className={css.content}>Note content</p>
// 	  <p className={css.date}>Created date</p>
// 	</div>
// </div>
//     )
// }
// export default NoteDetailsClient;