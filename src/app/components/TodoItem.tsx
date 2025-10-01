"use client";

import { useState } from "react";
import { Todo } from "../types/todo";
import { IoTrash, IoSave, IoPencil } from "react-icons/io5";

type TodoItemsProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSave: (id: number, newText: string) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onSave,
}: TodoItemsProps) {
  const [editting, setEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const startEdit = () => {
    setEditing(true);
    setText(todo.text);
  };

  const save = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSave(todo.id, trimmed);
    setEditing(false);
  };

  return (
    <li className="flex items-center gap-2 border-b pb-3">
      {editting ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") {
              setEditing(false);
              setText(todo.text);
            }
          }}
          className="border border-gray-300 rounded"
        />
      ) : (
        <span
          onClick={() => onToggle(todo.id)}
          className={`cursor-pointer ${todo.completed ? "line-through" : ""}`}
        >
          {todo.text}
        </span>
      )}
      {editting ? (
        <button
          onClick={save}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          <IoSave />
        </button>
      ) : (
        <button
          onClick={startEdit}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          <IoPencil />
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        <IoTrash />
      </button>
    </li>
  );
}
