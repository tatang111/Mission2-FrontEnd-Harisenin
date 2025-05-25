export const SelectSection = ({
  value,
  onChange,
  category1,
  category2,
  category3,
  category1value,
  category2value,
  category3value,
  title,
}) => {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-gray-300 mb-1">
        {title}
      </span>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 cursor-pointer bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        <option value={category1value}>
          {category1}
        </option>
        <option value={category2value}>
          {category2}
        </option>
        {category3 && (
          <option value={category3value}>
            {category3}
          </option>
        )}
      </select>
    </label>
  );
};