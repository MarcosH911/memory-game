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
    <div className="space-y-2">
      <label htmlFor={name} className="text-xl font-medium text-teal-950">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block w-72 rounded-[0.25rem] border border-teal-950 p-1.5 text-xl font-semibold text-teal-950 shadow-md"
      >
        <option value="todos">Todos</option>
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
