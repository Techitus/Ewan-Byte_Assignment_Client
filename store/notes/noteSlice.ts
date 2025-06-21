import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialNotesState, INotesState, Note, Status } from "./types";
import { AppDispatch } from "../store";
import { API } from "@/http";

const noteSlice = createSlice({
  name: "note",
  initialState: initialNotesState,
  reducers: {
    setNotes(state: INotesState, action: PayloadAction<Note[]>) {
      state.notes = action.payload;
    },
    setStatus(state: INotesState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setNoteAction(state: INotesState, action: PayloadAction<string | null>) {
      state.noteAction = action.payload;
    },
  },
});

export const { setNotes, setStatus, setNoteAction } = noteSlice.actions;
export default noteSlice.reducer;


// CREATE
export function createNote(note: Note) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("notes", note);
      if (response.status === 201) {
        dispatch(fetchNotes()); 
        dispatch(setStatus(Status.COMPLETED));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Fetch ALL
export function fetchNotes() {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.get("notes");
      if (response.status === 200) {
        dispatch(setNotes(response.data.data)); 
        dispatch(setStatus(Status.COMPLETED));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// UPDATE
export function updateNote(noteId: string, updatedNote: Partial<Note>) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.patch(`notes/${noteId}`, updatedNote);
      if (response.status === 200) {
        dispatch(fetchNotes()); 
        dispatch(setStatus(Status.COMPLETED));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// DELETE
export function deleteNote(noteId: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.delete(`notes/${noteId}`);
      if (response.status === 200 ) {
        dispatch(fetchNotes()); 
        dispatch(setStatus(Status.COMPLETED));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
