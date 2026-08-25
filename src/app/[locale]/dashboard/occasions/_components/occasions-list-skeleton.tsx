"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OccasionsListSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Name</TableHead>
          <TableHead className="text-center">Products</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-200" />
            </TableCell>

            <TableCell className="text-center">
              <div className="h-4 w-10 mx-auto animate-pulse rounded bg-zinc-200" />
            </TableCell>

            <TableCell className="flex justify-end gap-2">
              <div className="h-7 w-14 animate-pulse rounded bg-zinc-200" />
              <div className="h-7 w-16 animate-pulse rounded bg-zinc-200" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
