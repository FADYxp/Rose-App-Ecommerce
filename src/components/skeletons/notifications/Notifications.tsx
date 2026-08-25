"use client";

// dynamic version with dummy data + scrollable

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  BrushCleaning,
  CheckCheck,
  Check,
  Trash2,
  EllipsisVertical,
  BellOff,
} from "lucide-react";

import { useInfiniteQuery } from "@tanstack/react-query";

export default function Notifications() {
  // Mock API
  // simulate fetching notifications from an APIc with delay

  const PAGE_SIZE = 5;

  const fetchNotifications = async ({ pageParam = 0 }) => {
    await new Promise((res) => setTimeout(res, 500));

    const allNotifications = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      title: "Your Order Has Been Shipped",
      description:
        "Your order #12345 has been shipped and will arrive in 2-3 business days. We’ll send you another update once it’s out for delivery...",
    }));

    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return {
      data: allNotifications.slice(start, end),
      nextPage: end < allNotifications.length ? pageParam + 1 : undefined,
    };
  };

  // start infinite query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["notifications"],
      queryFn: fetchNotifications,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const reachedBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

    if (reachedBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // TODO: handle clear all notification function

  function clearAllNotifications() {
    console.log("clear all notifications");
  }

  // TODO: handle mark all as read function

  function markAllAsRead() {
    console.log("mark all as read");
  }

  // Todo: Mark single notification as read function

  function markAsRead(id: number) {
    console.log(`mark notification ${id} as read`);
  }

  // Todo: delete single notification

  function deleteSingleNotifcation(id: number) {
    console.log(`delete notification ${id}`);
  }

  return (
    // dropdown menu
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/*  icon button */}
        <Button
          variant="ghost"
          className="relative rounded-full border-none outline-none px-0"
        >
          <Bell size={24} />
          <p className="absolute w-5 h-5 rounded-full bg-red-600 text-center text-white -top-1 -right-1">
            5
          </p>
        </Button>
      </DropdownMenuTrigger>

      {/* start menu content */}
      <DropdownMenuContent
        align="start"
        onScroll={handleScroll}
        className="w-80 p-0 max-h-[26.25rem] hide-scrollbar"
      >
        {/* Header */}
        <DropdownMenuLabel className="bg-maroon-700 p-4 text-white dark:bg-soft-pink-200 dark:text-zinc-800">
          Notifications ({notifications.length})
        </DropdownMenuLabel>

        {/* menu items */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2 dark:bg-zinc-700">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-1">
                <BrushCleaning size={18} className="dark:text-zinc-500" />
                <span className="dark:text-zinc-50">
                  {/* clear all notifications */}
                  <button onClick={clearAllNotifications}>
                    Clear all notifications
                  </button>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCheck size={18} className="dark:text-zinc-500" />
                <span className="dark:text-zinc-50">
                  {/* mark all as read */}
                  <button onClick={markAllAsRead}>Mark all as read</button>
                </span>
              </div>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-300 dark:bg-zinc-600" />
        </DropdownMenuGroup>

        {/* display Notifications data dynamic */}
        {notifications.map((item, index) => (
          <div key={item.id}>
            <DropdownMenuGroup
              className={`p-4 gap-2 ${
                index === 2 ||
                index === 4 ||
                index === 7 ||
                index === 10 ||
                index === 13
                  ? "bg-zinc-200 dark:bg-zinc-800"
                  : "dark:bg-zinc-900"
              }`}
            >
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <div className="flex justify-between items-center w-full">
                    <h5 className="text-zinc-800 font-semibold text-base capitalize dark:text-zinc-50">
                      {item.title}
                    </h5>
                    <EllipsisVertical
                      size={18}
                      className="dark:text-zinc-400"
                    />
                  </div>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="gap-2 ml-2">
                    <DropdownMenuItem
                      onClick={() => markAsRead(index)}
                      className={`flex items-center gap-2 rounded-md  ${
                        index === 2 ||
                        index === 4 ||
                        index === 7 ||
                        index === 10 ||
                        index === 13
                          ? "text-zinc-400 dark:text-zinc-700"
                          : "text-zinc-800 dark:text-zinc-500"
                      }`}
                    >
                      <Check
                        size={18}
                        className="text-zinc-200 dark:text-zinc-300 "
                      />
                      <span className="text-sm font-medium cursor-pointer">
                        Mark as read
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Trash2 size={18} className="text-red-500" />
                      <span className="text-sm font-medium dark:text-zinc-50">
                        {/* delete single notification */}
                        <button onClick={() => deleteSingleNotifcation(index)}>
                          Delete notification
                        </button>
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuItem>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {item.description}
                </p>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-zinc-300 dark:bg-zinc-600" />
          </div>
        ))}

        {/* Loading */}
        {isFetchingNextPage && (
          <div className="p-4 text-center text-sm text-zinc-500 capitalize dark:text-zinc-400">
            Loading more...
          </div>
        )}

        {/* No more data */}
        {!hasNextPage && notifications.length > 0 && (
          <div className="p-4 mx-auto flex flex-col items-center justify-center gap-2 text-sm text-zinc-400 dark:bg-zinc-700">
            <BellOff size={50} className="dark:text-zinc-400" />
            <span className="text-zinc-500 text-sm font-medium dark:text-zinc-400">
              No notifications to display.
            </span>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
