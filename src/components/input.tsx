type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full border border-gray-300 rounded-lg h-12 px-6 mb-4 mt-2 ${className}`}
    />
  )
}
