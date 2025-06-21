"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch } from "@/store/hooks"
import { createNote, updateNote } from "@/store/notes/noteSlice"
import { Note } from "@/store/notes/types"

interface NoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  note?: Note | null
  onSubmit?: (note: Note) => void
  mode: "create" | "edit"
}

export default function NoteDialog({ open, onOpenChange, note, onSubmit, mode }: NoteDialogProps) {
  const dispatch = useAppDispatch()
  const [data, setData] = useState({ title: "", content: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      if (mode === "edit" && note) {
        setData({ title: note.title, content: note.content })
      } else {
        setData({ title: "", content: "" })
      }
    }
  }, [open, note, mode])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!data.title.trim() || !data.content.trim()) return

    setIsSubmitting(true)

    try {
      const noteData: Note = {
        title: data.title.trim(),
        content: data.content.trim(),
        createdAt: mode === "edit" && note?.createdAt ? note.createdAt : new Date().toISOString(),
      }

      if (mode === "edit" && note?.id) {
        noteData.id = note.id
        await dispatch(updateNote(note.id, noteData))
      } else {
        await dispatch(createNote(noteData))
      }

      onSubmit?.(noteData) 
      setData({ title: "", content: "" })
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save note:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    setData({ title: "", content: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {mode === "create" ? "Add New Note" : "Edit Note"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a new note with a title and content."
              : "Update your note with new information."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter note title..."
              value={data.title}
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              Content
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Enter note content..."
              value={data.content}
              onChange={handleChange}
              rows={5}
              className="w-full resize-none"
              required
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !data.title.trim() || !data.content.trim()}
            >
              {isSubmitting
                ? mode === "create"
                  ? "Adding..."
                  : "Updating..."
                : mode === "create"
                ? "Add Note"
                : "Update Note"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
