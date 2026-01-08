import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96] transform-gpu relative overflow-hidden group before:absolute before:inset-0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white border-2 border-blue-500/30 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 hover:border-blue-400/50 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 active:from-blue-700 active:to-blue-800 before:bg-gradient-to-r before:from-white/0 before:via-white/30 before:to-white/0 before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000 before:ease-in-out',
        destructive: 'bg-gradient-to-br from-red-600 via-red-600 to-red-700 text-white border-2 border-red-500/30 hover:from-red-500 hover:via-red-600 hover:to-red-700 hover:border-red-400/50 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 active:from-red-700 active:to-red-800',
        outline: 'border-2 border-gray-300/80 dark:border-gray-600/80 bg-white/50 dark:bg-gray-900/30 backdrop-blur-md hover:bg-white/80 dark:hover:bg-gray-800/60 hover:border-gray-400 dark:hover:border-gray-500 text-foreground shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 hover:border-primary/30 dark:hover:border-primary/30 before:bg-gradient-to-r before:from-primary/5 before:via-primary/10 before:to-primary/5',
        secondary: 'bg-gradient-to-br from-gray-100 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300/50 dark:border-gray-600/50 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
        ghost: 'border-transparent bg-transparent hover:bg-gray-100/90 dark:hover:bg-gray-800/70 hover:text-foreground backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
        link: 'text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline border-transparent hover:text-blue-700 dark:hover:text-blue-300 transition-colors',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-14 rounded-xl px-12 text-base font-medium tracking-wide',
        icon: 'h-11 w-11 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const variantProps = { variant, size }
    return (
      <Comp
        className={cn(buttonVariants(variantProps), className)}
        ref={ref}
        suppressHydrationWarning
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

