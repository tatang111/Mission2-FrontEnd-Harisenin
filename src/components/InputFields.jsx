import { InputField } from "./InputField";

export const InputFields = ({title, setTitle, duration, setDuration, year, setYear}) => {
  return (
    <div>
      <InputField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Enter movie title"
        name="Title"
      />
      <InputField
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        type="number"
        placeholder="Enter movie duration"
        name="Duration (m)"
      />
      <InputField
        value={year}
        onChange={(e) => setYear(e.target.value)}
        type="number"
        placeholder="Enter movie year release"
        name="Year Release"
      />
    </div>
  );
};
