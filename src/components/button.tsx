type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'flat' | 'solid' | 'outlined';
  fullWidth?: boolean;
}

export default function Button({ children, className, variant = 'solid', ...props }: ButtonProps) {
  const variants = {
    flat: 'text-primary',
    solid: 'bg-primary text-white',
    outlined: 'bg-white text-black border border-gray-200'
  }

  return (
    <button
      className={`flex flex-row justify-center items-center gap-x-2 font-medium ${variants[variant]} rounded-full h-12 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
