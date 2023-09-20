"use client";

import { useRef, useState } from "react";
import type { IconType } from "react-icons";

import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface Props {
  Icon: IconType;
  label: string;
  placeholder: string;
  type?: "text" | "password" | "select";
  name: string;
  value: string;
  setValue:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  autoComplete?: string;
  disabled: boolean;
  options?: { value: string; text: string }[];
}

function AuthInputField({
  Icon,
  label,
  placeholder,
  type = "text",
  name,
  value,
  setValue,
  autoComplete = "off",
  disabled,
  options,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
    passwordInputRef?.current?.focus();
  };

  return (
    <div>
      <label htmlFor={name} className="mx-2 mb-1 text-base text-teal-950">
        {label}
      </label>
      <div className="group mb-10 flex items-center justify-start border-b px-2 py-1 transition focus-within:border-teal-800">
        <Icon className="translate-y-0.5 text-slate-400 transition group-focus-within:text-teal-800" />
        {type === "select" ? (
          <select
            name={name}
            id={name}
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            className={twMerge(
              "w-full rounded-md bg-transparent px-2 py-1 pl-1 text-base transition placeholder:text-base focus:outline-none",
              !value && "text-gray-400",
              disabled && "hover:cursor-not-allowed",
            )}
          >
            {options?.map((item, index) => (
              <option
                key={index}
                value={item.value}
                className={twMerge(
                  "cursor-pointer text-teal-950",
                  !item.value && "text-gray-400",
                )}
              >
                {item.text}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={showPassword ? "text" : type}
            name={name}
            id={name}
            ref={passwordInputRef}
            autoComplete={autoComplete}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            className={twMerge(
              "w-full max-w-xs bg-transparent px-2 py-1 text-base text-teal-950 transition placeholder:text-base focus:outline-none group-focus-within:placeholder:opacity-0 md:w-64",
              disabled && "hover:cursor-not-allowed",
            )}
          />
        )}
        {type === "password" &&
          (showPassword ? (
            <HiOutlineEyeSlash
              className="ml-auto cursor-pointer text-lg text-slate-400 transition hover:text-slate-700"
              onClick={handleShowPassword}
              onMouseUp={(e: React.MouseEvent) => e.preventDefault()}
              disabled={disabled}
            />
          ) : (
            <HiOutlineEye
              className="ml-auto cursor-pointer text-lg text-slate-400 transition hover:text-slate-700"
              onClick={handleShowPassword}
              onMouseUp={(e: React.MouseEvent) => e.preventDefault()}
              disabled={disabled}
            />
          ))}
      </div>
    </div>
  );
}

export default AuthInputField;
