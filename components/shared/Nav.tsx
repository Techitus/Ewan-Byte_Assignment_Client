/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useState } from "react"
import NoteDialog from "./Note-Dialog"

interface NavbarProps {
  onAddNote?: (note: any) => void
}

export default function Navbar({ onAddNote }: NavbarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900">NotesMania</h1>
      </div>

      <div className="flex items-center">
        <Button className="flex items-center gap-2 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Notes
        </Button>
      </div>
      <NoteDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        mode="create"
        onSubmit={(note) => {
          onAddNote?.(note)
          setIsDialogOpen(false)
        }}
      />
    </nav>
  )
}
