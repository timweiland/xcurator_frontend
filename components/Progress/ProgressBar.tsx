const ProgressBar = ({ progress, className }) => {
  return (
    <div className={`shadow w-full bg-grey-light ${className}`}>
      <div
        className="bg-green-500 text-xs leading-none py-2 text-center text-white transition-all duration-200 ease-in-out"
        style={{ width: `${progress}%` }}
      >
        {`${progress}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
