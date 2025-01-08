type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'flat' | 'solid' | 'outlined';
  fullWidth?: boolean;
  as?: React.ElementType;
  href?: string;
}

export default function Button({ as, children, className, variant = 'solid', ...props }: ButtonProps) {
  const variants = {
    flat: 'text-primary',
    solid: 'bg-primary text-white border border-primary',
    outlined: 'bg-white border border-gray-300'
  }

  const Component = as || 'button'

  return (
    <Component
      {...props}
      className={`flex flex-row justify-center items-center gap-x-2 rounded-lg h-12 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-600 ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  )
}
