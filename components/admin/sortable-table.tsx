"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  type Modifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { DotsSixVerticalIcon } from "@phosphor-icons/react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

const restrictToVerticalAxis: Modifier = ({ transform }) => ({
  ...transform,
  x: 0,
});

interface SortableItem {
  id: string;
  order: number;
}

// ── Wrapper DnD — va EN DEHORS de <Table> ──────────────────────────────

interface SortableTableProps<T extends SortableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  children: React.ReactNode;
}

export function SortableTable<T extends SortableItem>({
  items,
  onReorder,
  children,
}: SortableTableProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    const reordered = arrayMove(items, oldIndex, newIndex).map((item, i) => ({
      ...item,
      order: i,
    }));

    onReorder(reordered);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
}

// ── Body triable — va EN DEDANS de <Table> ─────────────────────────────

interface SortableTableBodyProps<T extends SortableItem> {
  items: T[];
  children: (item: T, index: number) => React.ReactNode;
}

export function SortableTableBody<T extends SortableItem>({
  items,
  children,
}: SortableTableBodyProps<T>) {
  return (
    <SortableContext
      items={items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <TableBody>
        {items.map((item, index) => (
          <SortableRow key={item.id} id={item.id}>
            {children(item, index)}
          </SortableRow>
        ))}
      </TableBody>
    </SortableContext>
  );
}

// ── Ligne triable ──────────────────────────────────────────────────────

interface SortableRowProps {
  id: string;
  children: React.ReactNode;
}

function SortableRow({ id, children }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(0, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="w-10">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing touch-none p-1 text-muted-foreground hover:text-foreground transition-colors"
          {...attributes}
          {...listeners}
        >
          <DotsSixVerticalIcon className="w-4 h-4" />
        </button>
      </TableCell>
      {children}
    </TableRow>
  );
}
