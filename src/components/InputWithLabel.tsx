import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

const InputWithLabel = ({
  label,
  placeholder = "Enter",
  value,
  onChange,
  className,
}: {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) => {
  return (
    <div className="relative flex flex-col gap-2">
      <label className="font-normal text-base leading-6" htmlFor={label}>
        {label}
      </label>
      <Input
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "bg-white  border-0! border-b-primary/50 border-b! placeholder:text-[#949494] rounded-t-sm!  h-14!",
          className
        )}
      />
    </div>
  );
};

export default InputWithLabel;
