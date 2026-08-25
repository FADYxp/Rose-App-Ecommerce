"use client";

/**
 * Updates the URL search params and returns a string for navigation.
 * @param searchParams - Current URLSearchParams object
 * @param updates - Key-value pairs, use null to remove a param
 * @returns string to push to router (e.g., "?category=123&sort=asc")
 */

export const updateSearchParams = (
  searchParams: URLSearchParams,
  updates: Record<string, string | null>
): string => {
  const params = new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null) params.delete(key);
    else params.set(key, value);
  });

  return `?${params.toString()}`;
};
