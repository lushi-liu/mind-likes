import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  // Calculate the time difference in different units
  const elapsed = {
    year: Math.floor(diffInMilliseconds / year),
    month: Math.floor(diffInMilliseconds / month),
    week: Math.floor(diffInMilliseconds / week),
    day: Math.floor(diffInMilliseconds / day),
    hour: Math.floor(diffInMilliseconds / hour),
    minute: Math.floor(diffInMilliseconds / minute),
  };

  // Determine the appropriate time unit
  if (elapsed.year > 0)
    return `${elapsed.year} year${elapsed.year > 1 ? "s" : ""} ago`;
  if (elapsed.month > 0)
    return `${elapsed.month} month${elapsed.month > 1 ? "s" : ""} ago`;
  if (elapsed.week > 0)
    return `${elapsed.week} week${elapsed.week > 1 ? "s" : ""} ago`;
  if (elapsed.day > 0)
    return `${elapsed.day} day${elapsed.day > 1 ? "s" : ""} ago`;
  if (elapsed.hour > 0)
    return `${elapsed.hour} hour${elapsed.hour > 1 ? "s" : ""} ago`;
  if (elapsed.minute > 0)
    return `${elapsed.minute} minute${elapsed.minute > 1 ? "s" : ""} ago`;

  return "just now";
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

export const getJoinedDate = (date: Date): string => {
  // Get the month and year components from the Date object
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Concatenate the month and year
  return `${month} ${year}`;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}
export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}
export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  );
};

interface BadgeParams {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParams) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level: any) => {
      if (count > +badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });
  return badgeCounts;
};
