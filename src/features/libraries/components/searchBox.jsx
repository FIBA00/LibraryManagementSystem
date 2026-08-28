
export default function SearchBox({
    value,
    onChange,
    placeholder = "Search records…",
  }) {
    return (
      <label className="search-box">
        <SearchBox size={16} />
        <input
          value={value}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
        />
      </label>
    );
  }