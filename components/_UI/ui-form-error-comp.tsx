const UiFormErrorComp = ({
  className,
  message,
}: {
  className?: string;
  message: string;
}) => {
  return (
    <div className={`${className} bg-red-300 flex gap-3 p-3 rounded-lg`}>
      <span>C</span>
      <span className={"text-red-500"}>{message}</span>
    </div>
  );
};

export default UiFormErrorComp;
