import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function getInitials(username) {
  if (!username) return "..";
  return username.slice(0, 2).toUpperCase();
}

export const today = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function classNameMerge(...inputs) {
  return twMerge(clsx(inputs));
}

export function withNotice(onNotice, success) {
  return { onSuccess: result => onNotice(success(result)) };
}

export const parseDate = value =>
  new Date(
    /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : `${value}, 2026`
  ).getTime() || 0;

export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
