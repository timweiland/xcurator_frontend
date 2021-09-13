import { CheckCircleIcon } from "@heroicons/react/solid";

const Checkmark = (): JSX.Element => (
  <CheckCircleIcon className="absolute top-0 -right-4 w-10 h-10 text-primary-800 z-20" />
);
const SelectableCard = ({
  title,
  description,
  selected,
  onClick,
  className,
}) => {
  return (
    <div className={"relative " + className}>
      {selected && <Checkmark />}
      <button
        onClick={onClick}
        className="w-full sm:max-w-xs rounded overflow-hidden shadow-lg hover:bg-gray-50 relative z-10"
      >
        <div className="p-6 border-b-2 border-gray-200">
          <h2 className="text-center font-bold text-xl">{title}</h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base font-light">{description}</p>
        </div>
      </button>
    </div>
  );
};

export default SelectableCard;
