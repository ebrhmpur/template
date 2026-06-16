import React from "react";

const UiContainerComp = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section className={`w-[min(1400px,85%)] mx-auto flex gap-4 ${className}`}>
      {children}
    </section>
  );
};

export default UiContainerComp;
