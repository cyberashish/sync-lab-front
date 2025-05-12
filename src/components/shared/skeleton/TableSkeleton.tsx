export default function TableSkeleton(){
    return (
        <>
<div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </th>
      </tr>
    </thead>

    <tbody className="bg-transaprent divide-y divide-gray-200 animate-pulse">
     {
      [...Array(6)].map((index) => (
        <tr key={index} >
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </td>
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </td>
      </tr>
      ))
     }
    </tbody>
  </table>
</div>

        </>
    )
}