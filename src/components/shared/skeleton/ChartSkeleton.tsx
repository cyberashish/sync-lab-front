export function ChartSkeleton(){
    return (
        <div className="w-full">
  <div className="flex items-center justify-center mb-4 animate-pulse">
    <div className="relative w-48 h-48">
      <div className="w-full h-full rounded-full border-[20px] border-t-gray-200 border-r-gray-200 border-b-gray-200 border-l-gray-200 border-solid opacity-50"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="bg-gray-100 w-20 h-3 rounded-full"></span>
      </div>
    </div>
  </div>

  <ul className="space-y-2 text-sm">
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-gray-100"></span>
        <h2 className="bg-gray-100 w-32 h-3 rounded-full"></h2>
      </span>
      <span className="size-5 rounded-full bg-gray-100"></span>
    </li>
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-gray-100"></span>
        <h2 className="bg-gray-100 w-32 h-3 rounded-full"></h2>
      </span>
      <span className="size-5 rounded-full bg-gray-100"></span>
    </li>
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-gray-100"></span>
        <h2 className="bg-gray-100 w-32 h-3 rounded-full"></h2>
      </span>
      <span className="size-5 rounded-full bg-gray-100"></span>
    </li>
    <li className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-gray-100"></span>
        <h2 className="bg-gray-100 w-32 h-3 rounded-full"></h2>
      </span>
      <span className="size-5 rounded-full bg-gray-100"></span>
    </li>
  </ul>
</div>
    )
}
