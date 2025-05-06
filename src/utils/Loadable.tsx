import React, { Suspense, ComponentType, LazyExoticComponent, ReactNode } from "react";
import { Loader2 } from "lucide-react"

const Loadable = <P extends object>(
  Component: LazyExoticComponent<ComponentType<P>>,
  fallback: ReactNode = <div className="flex h-screen w-full items-center justify-center" >
     <Loader2 className="animate-spin text-primary" size={36} />
  </div>
): React.FC<P> => {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
