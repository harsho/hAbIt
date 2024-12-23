"use client";

import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { deleteHabit } from "@/actions/habits/actions";

export default function DeleteHabit({ id }: { id: number }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-4 h-4"
      onClick={async () => {
        await deleteHabit(id);
      }}
    >
      <IoClose />
    </Button>
  );
}