import { cva } from "class-variance-authority";
import { classNameMerge } from "../../../lib/utils.js";

// ! One shared transition press-down feedback for every variant mirrors the old CSS
// ! where .primary-button/.secondary-button/.quiet-button all shared the same :active{ transform: scale(.97) } rule.

// ! "quiet" is only ever used on dark panels (e.g. the dark brief/hero card) white-based opacity values instead of a
// ! surface token since it's not meant to adapt to light/dark theme like the rest.

// ! original used #a62f31, a different red from --color-danger (#b91c1c) used by StatusPill's "overdue" state unified onto the token here
// ! only meaningful on variant="icon" — a third red (#aa292b) collapsed  onto the same danger token as the "danger" variant above

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[7px] transition duration-150 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "rounded-lg px-[13px] py-2.5 text-xs font-extrabold text-white bg-primary shadow-[0_6px_14px_rgba(36,87,214,0.2)] hover:bg-[#1e49b8] hover:shadow-[0_8px_18px_rgba(36,87,214,0.28)] hover:-translate-y-px",
        secondary:
          "rounded-lg px-[13px] py-2.5 text-xs font-bold text-[#5c4d3e] bg-[#fffdf9] border border-[#dfd5c7] hover:text-primary hover:bg-primary/10 hover:border-[#adc0ec]",
        quiet:
          "rounded-lg px-3 py-2.5 text-xs font-bold text-[#f2e9dc] bg-white/10 border border-white/10 hover:bg-white/15",
        text: "bg-transparent text-primary text-[11px] font-extrabold hover:text-warning",
        row: "rounded px-[7px] py-[5px] text-primary bg-primary/10 text-[10px] font-extrabold hover:text-white hover:bg-primary",
        danger:
          "min-w-[126px] rounded-lg px-[13px] py-2.5 text-xs font-extrabold text-white bg-danger hover:bg-[#8f2528] hover:shadow-[0_7px_15px_rgba(143,37,40,0.2)] hover:-translate-y-px",
        icon: "size-[29px] rounded-[5px] border border-[#e5ddd0] bg-[#f4efe7] text-[#645444] hover:text-primary hover:bg-primary/10 hover:border-primary/30",
      },
      compact: {
        true: "",
        false: "",
      },
      danger: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        compact: true,
        class: "px-2.5 py-2 text-[11px]",
      },
      {
        variant: "secondary",
        compact: true,
        class: "px-2.5 py-2 text-[11px]",
      },
      {
        variant: "icon",
        danger: true,
        class: "hover:text-danger hover:bg-danger-bg hover:border-danger/40",
      },
    ],
    defaultVariants: {
      variant: "primary",
      compact: false,
      danger: false,
    },
  }
);

export default function Button({
  variant,
  compact,
  danger,
  className,
  ...props
}) {
  return (
    <button
      className={classNameMerge(
        buttonVariants({ variant, compact, danger }),
        className
      )}
      {...props}
    />
  );
}
