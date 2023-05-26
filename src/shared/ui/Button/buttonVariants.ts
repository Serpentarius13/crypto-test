import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "w-fit transition-all outline-none border-none focus:ring-2 focus:ring-gray-600",
  {
    variants: {
      variant: {
        blue: "bg-light-blue text-white hover:bg-blue active:bg-blue disabled:!bg-light-blue ",
      },
      size: {
        medium: "text-small font-bold py-[1.5rem] px-[5.9rem]",
      },
    },
  }
);
