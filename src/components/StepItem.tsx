type Step = {
  key: string;
  label: string;
  icon: string;
};

type StepItemProps = {
  step: Step;
  index: number;
  stepIndex: number;
  isntLast: boolean;
};

export function StepItem({ step, index, stepIndex, isntLast }: StepItemProps) {
  const isDone = index < stepIndex;
  const isCurrent = index === stepIndex;

  let className = "step";
  if (isDone) className += " step--done";
  else if (isCurrent) className += " step--current";

  const connectorClass =
    index === stepIndex
      ? "step-connector--progressing"
      : index < stepIndex
      ? "step-connector--done"
      : "";

  return (
    <>
      <div className={className}>
        <span className="material-icons step-icon">{step.icon}</span>
        <span className="step-label">{step.label}</span>
      </div>

      {isntLast && (
        <div className={`step-connector ${connectorClass}`} />
      )}
    </>
  );
}
