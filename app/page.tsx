"use client"

import { useEffect } from "react"
import Navbar from "@/components/shared/Nav"
import NoteCard from "@/components/shared/Note-Card"
import { useAppSelector, useAppDispatch } from "@/store/hooks"
import { Status } from "@/store/notes/types"
import { fetchNotes } from "@/store/notes/noteSlice"

export default function Page() {
  const dispatch = useAppDispatch()
  const { notes, status } = useAppSelector((state) => state.note)

  useEffect(() => {
    dispatch(fetchNotes())
  }, [dispatch]) 
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Notes</h1>

          {status === Status.LOADING ? (
            <p className="text-gray-500">Loading notes...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    id={note._id }
                    title={note.title}
                    content={note.content}
                    createdAt={note.createdAt ?? ""}
                  />
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
