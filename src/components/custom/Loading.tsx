import { Spinner } from "../ui/spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  );
};

export default Loading;