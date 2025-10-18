import { useState } from "react";
import { useNotes } from "../context/NotesContext";
import { v4 as uuidv4 } from "uuid";

const NoteManager = () => {
  const { notes, dispatch } = useNotes();
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"important" | "normal" | "delayed">("normal");

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch({ type: "ADD", payload: { id: uuidv4(), text: text.trim(), priority } });
    setText("");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <h2 className="font-bold mb-4 text-lg text-gray-800">Notes</h2>

      {/* Input Area */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New note"
          className="border border-gray-300 p-2 rounded flex-1 w-full"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="border border-gray-300 p-2 rounded w-full sm:w-auto"
        >
          <option value="important">Important</option>
          <option value="normal">Normal</option>
          <option value="delayed">Delayed</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      {/* Notes Columns (stacked full-width) */}
      <div className="space-y-4">
        {["important", "normal", "delayed"].map((p) => (
          <div key={p} className="bg-gray-50 p-3 rounded shadow overflow-hidden">
            <h3 className="font-semibold capitalize mb-2 text-gray-700">{p}</h3>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {notes
                .filter((n) => n.priority === p)
                .map((n) => (
                  <div
                    key={n.id}
                    className="flex justify-between items-center border-b border-gray-200 py-1"
                  >
                    <span className="break-words">{n.text}</span>
                    <div className="flex items-center gap-1">
                      <select
                        value={n.priority}
                        onChange={(e) =>
                          dispatch({
                            type: "UPDATE_PRIORITY",
                            payload: { id: n.id, priority: e.target.value as any },
                          })
                        }
                        className="border border-gray-300 p-1 rounded"
                      >
                        <option value="important">Important</option>
                        <option value="normal">Normal</option>
                        <option value="delayed">Delayed</option>
                      </select>
                      <button
                        onClick={() => dispatch({ type: "DELETE", payload: n.id })}
                        className="text-red-500 font-bold px-1"
                      >
                        x
                      </button>
                    </div>
                  </div>
                ))}
              {notes.filter((n) => n.priority === p).length === 0 && (
                <p className="text-gray-400 text-sm">No notes</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteManager;
