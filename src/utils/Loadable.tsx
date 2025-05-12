import React, { Suspense, ComponentType, LazyExoticComponent, ReactNode } from "react";
import BasicLoader from "@/components/shared/loader/BasicLoader";

const Loadable = <P extends object>(
  Component: LazyExoticComponent<ComponentType<P>>,
  fallback: ReactNode = <BasicLoader/>
): React.FC<P> => {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
