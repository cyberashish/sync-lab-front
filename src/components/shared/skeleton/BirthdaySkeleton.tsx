export default function BirthdaySkeleton(){
    return (
        <>
                {
          [0,1,2,3].map((_employee,index) => (
            <div key={index} className="flex items-start justify-between bg-gray-100 dark:bg-white/10 rounded-md p-3">
                <div className="flex items-center gap-2">
                    <span className="size-10 rounded-full bg-gray-200" > </span>
                    <div className="flex flex-col gap-1">
                      <h2 className="bg-gray-100 w-32 h-3 rounded-full"></h2>
                      <h2 className="bg-gray-100 w-38 h-2.5 rounded-full"></h2>
                    </div>
                </div>
                <h2 className="bg-gray-100 w-38 h-2.5 rounded-full"></h2>
            </div>
          ))
        }
        </>
    )
}