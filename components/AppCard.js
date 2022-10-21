export default function Card(props) {
  if (props.loading)
    return (
      <div className="min-w-full p-5 bg-white rounded-md shadow-2xl">
        <div className="flex flex-col gap-5 animate-pulse">
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
          <div className="h-3 ml-2 bg-gray-500 rounded"></div>
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-col min-w-full gap-5 animate-pulse">
        <div className="h-3 ml-2 bg-gray-500 rounded"></div>
        <div className="h-3 ml-2 bg-gray-500 rounded"></div>
        <div className="h-3 ml-2 bg-gray-500 rounded"></div>
        <div className="h-3 ml-2 bg-gray-500 rounded"></div>
      </div>
    );
}
