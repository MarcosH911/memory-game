interface Props {
  options: { value: string; text: string }[];
  name: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function RankingFiltersAdvancedInput({
  options,
  name,
  label,
  value,
  setValue,
}: Props) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="text-base font-medium text-teal-950 xs:text-lg sm:text-xl"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-[8.5rem] rounded-[0.25rem] border border-teal-950 p-1 text-base font-semibold text-teal-950 shadow-md xs:w-[9.5rem] xs:text-lg sm:w-52 sm:p-1.5 sm:text-xl xl:w-[12.5rem]"
      >
        <option value="">Todos</option>
        {options.map((option, index) => (
          <option key={index} value={option.value} className="text-teal-950">
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RankingFiltersAdvancedInput;
