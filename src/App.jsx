import { useSubScriptionStepForm } from "./stores/subscription";
import StepTimeLine from "./components/StepTimeLine";
import PersonalInfoForm from "./components/forms/PersonalInfoForm";
import SelectPlan from "./components/forms/SelectPlan";
import SelectAddOns from "./components/forms/SelectAddOns";
import SummaryOrder from "./components/forms/SummaryOrder";

export default function App() {
  const { currentStep } = useSubScriptionStepForm();

  function renderStepContent(stepName) {
    switch (stepName) {
      case "step-1":
        return <PersonalInfoForm />;
      case "step-2":
        return <SelectPlan />;
      case "step-3":
        return <SelectAddOns />;
      case "step-4":
        return <SummaryOrder />;
      default:
        return null;
    }
  }

  return (
    <div className="w-full md:grid md:grid-cols-[300px_minmax(0px,_1fr)] md:gap-x-5 md:max-w-screen-lg md:mx-auto md:bg-white md:rounded-md overflow-hidden md:p-4 md:shadow-lg md:min-h-[600px]">
      <StepTimeLine />
      <div className="max-w-screen-md md:w-full mx-auto px-4 pb-28 md:pb-0 lg:px-8 md:relative">
        <div className="-mt-20 md:mt-0">{renderStepContent(currentStep)}</div>
      </div>
    </div>
  );
}
