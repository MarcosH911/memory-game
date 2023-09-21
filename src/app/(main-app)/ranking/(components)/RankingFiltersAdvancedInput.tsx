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
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="todos">Todos</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RankingFiltersAdvancedInput;
