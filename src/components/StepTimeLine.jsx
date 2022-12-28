import { useSubScriptionStepForm } from "../stores/subscription";

export default function StepTimeLine() {
  const { currentStep } = useSubScriptionStepForm();

  const steps = [
    { number: 1, name: "Your Info" },
    { number: 2, name: "Select Plan" },
    { number: 3, name: "Add-Ons" },
    { number: 4, name: "Summary" },
  ];

  let activeClasses = "bg-light-blue text-marine-blue border-light-blue";

  return (
    <>
      <div className="min-h-[180px] bg-sidebar-mobile md:bg-sidebar-desktop bg-no-repeat bg-cover bg-bottom py-8 md:px-8 md:bg-center md:rounded overflow-hidden">
        <ul className="flex items-center justify-center gap-4 md:flex-col md:items-start md:gap-8">
          {steps.map((step) => (
            <li key={step.number} className="flex items-center md:gap-x-5">
              <span
                className={`flex items-center justify-center w-10 h-10 rounded-full font-medium  border-2 ${
                  currentStep === `step-${step.number}`
                    ? activeClasses
                    : "border-white text-white"
                }`}
              >
                {step.number}
              </span>
              <div className="hidden md:block">
                <p className="text-sm text-[hsl(231_100%_99%)] opacity-80">
                  STEP {step.number}
                </p>
                <p className="text-white font-medium uppercase tracking-wider">
                  {step.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
