import {fetchNoteById} from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
// import css from "..notes.module.css";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function NoteDetails ({ params }: PageProps) {
	 const queryClient = new QueryClient();
await queryClient.prefetchQuery({
	queryKey: ["note", params.id],
	queryFn: () => fetchNoteById(params.id),
  });

	  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
export default NoteDetails;

