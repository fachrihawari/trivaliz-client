type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-white text-black border'
  }

  return (
    <button
      className={`flex flex-row justify-center items-center gap-x-2 w-full font-medium ${variants[variant]} rounded-full h-12 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
