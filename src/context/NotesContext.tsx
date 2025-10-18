import { createContext, useContext, useReducer, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Note {
  id: string;
  text: string;
  priority: "important" | "normal" | "delayed";
}

type Action =
  | { type: "ADD"; payload: Note }
  | { type: "DELETE"; payload: string }
  | { type: "UPDATE_PRIORITY"; payload: { id: string; priority: Note["priority"] } };

const NotesContext = createContext<{
  notes: Note[];
  dispatch: React.Dispatch<Action>;
} | null>(null);

const reducer = (state: Note[], action: Action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((n) => n.id !== action.payload);
    case "UPDATE_PRIORITY":
      return state.map((n) =>
        n.id === action.payload.id ? { ...n, priority: action.payload.priority } : n
      );
    default:
      return state;
  }
};

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, dispatch] = useReducer(reducer, []);

  return <NotesContext.Provider value={{ notes, dispatch }}>{children}</NotesContext.Provider>;
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};
