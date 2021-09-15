export default function Spinner(): JSX.Element {
  return (
    <div className=" flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-800"></div>
    </div>
  );
}
