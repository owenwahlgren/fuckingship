import { type ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline"
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", children, ...props }, ref) => {
    const baseStyles =
      "h-11 px-6 font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"

    const variantStyles = {
      primary: "bg-black text-white hover:bg-black/90 active:scale-[0.98]",
      outline:
        "bg-transparent border-2 border-black/10 text-black hover:bg-black/5 hover:border-black/20 active:scale-[0.98]",
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
