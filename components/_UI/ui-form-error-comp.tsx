const UiFormErrorComp = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div className={`${className} bg-red-200 flex gap-3 p-3 rounded-lg`}>
      <span>C</span>
      <span className={"text-red-700"}>{message}</span>
    </div>
  );
};

export default UiFormErrorComp;
