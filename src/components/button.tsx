interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`w-full bg-primary font-medium text-white rounded-full h-14 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
