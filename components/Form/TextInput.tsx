import classNames from "classnames";

const TextInput = ({ type, name, id, placeholder, errors, ...rest }) => {
  const hasError = errors[id];
  const baseClassNames =
    "appearance-none rounded-none w-full px-3 py-2 border placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 ";
  const conditionalClassNames = {
    "border-gray-300": !hasError,
    "border-red-500": hasError,
    "focus:ring-indigo-500": !hasError,
    "focus:ring-red-600": hasError,
    "focus:border-indigo-500": !hasError,
    "focus:border-red-600": hasError,
  };
  return (
    <div class="flex flex-col">
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={classNames(baseClassNames, conditionalClassNames)}
        {...rest}
      />
      {errors[id] && <span className="text-red-500">{errors[id].message}</span>}
    </div>
  );
};

export default TextInput;
