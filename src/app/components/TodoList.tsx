"use client";

import { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSave: (id: number, newText: string) => void;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onSave,
}: TodoListProps) {
  if (todos.length === 0) return <p className="text-blue-500">No tasks yet — add one!</p>;

  return (
    <ul className="flex flex-col">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onSave={onSave}
        />
      ))}
    </ul>
  );
}
