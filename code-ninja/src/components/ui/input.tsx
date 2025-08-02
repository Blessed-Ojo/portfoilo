import React from 'react'
import {cn} from "@/lib/utils"

export interface InputProps extends React. InputHTMLAttributes<HTMLInputElement>{}
const Input = React.forwardRef<HTMLInputElement,InputProps>(({className,type,...props},ref) => {
  return (
    <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-light-mini/20 dark:border-dark-mini/20 bg-light-bg dark:bg-dark-bg px-3 py-2 text-sm text-light-text dark:text-dark-text placeholder:text-light-mini dark:placeholder:text-dark-mini focus:outline-none focus:ring-2 focus:ring-light-heading/20 dark:focus:ring-dark-heading/20 focus:border-light-heading dark:focus:border-dark-heading disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300",
          className
        )}
        ref={ref}
        {...props}
      />
  )
}
)
Input.displayName ="Input"
export  {Input}