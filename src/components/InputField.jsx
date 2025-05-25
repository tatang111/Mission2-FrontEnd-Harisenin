export const InputField = ({value, onChange, type, placeholder, name}) => {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-medium text-gray-300 mb-1">
        {name}
      </span>
      <input
      required
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder={placeholder}
      />
    </label>
  );
};
