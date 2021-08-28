import classNames from "classnames";

const Checkbox = ({ label, name, id, error, errors, ...rest }) => {
  const hasError = errors[id];
  const baseClassNames = "form-checkbox mr-2";
  const conditionalClassNames = {
    "border-gray-500": !hasError,
    "border-red-500": hasError,
  };
  console.log(error);
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <input
          type="checkbox"
          name={name}
          id={id}
          className={classNames(baseClassNames, conditionalClassNames)}
          {...rest}
        />
        <label htmlFor={name}>{label}</label>
      </div>
      {errors[id] && (
        <span className="text-error-500">{errors[id].message}</span>
      )}
    </div>
  );
};

export default Checkbox;
