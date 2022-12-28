import { useSubScriptionStepForm } from "../../stores/subscription";
import Card from "../Card";

const plans = [
  {
    id: 1,
    icon: "/src/assets/images/icon-arcade.svg",
    name: "Arcade",
    price: {
      monthly: 9,
      yearly: 90,
    },
  },
  {
    id: 2,
    icon: "/src/assets/images/icon-advanced.svg",
    name: "Advanced",
    price: {
      monthly: 12,
      yearly: 120,
    },
  },
  {
    id: 3,
    icon: "/src/assets/images/icon-pro.svg",
    name: "Pro",
    price: {
      monthly: 15,
      yearly: 150,
    },
  },
];

export default function SelectPlan() {
  const {
    isYearly,
    setIsYearly,
    setCurrentStep,
    selectedPlan,
    setSelectedPlan,
  } = useSubScriptionStepForm();

  function handleSubmit() {
    if (selectedPlan !== null) setCurrentStep("step-3");
  }

  return (
    <>
      <Card
        title="Select Plan"
        text=" You have the option of monthly or yearly billing."
      >
        <div className="mt-5 pb-3 md:mt-8">
          <ul className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.id}>
                <label
                  htmlFor={plan.name}
                  className={`flex items-start gap-3 lg:flex-col p-4 rounded-md border cursor-pointer ${
                    selectedPlan?.id === plan.id
                      ? "border-blue-500 bg-slate-50"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  <img src={plan.icon} alt={plan.name} />
                  <div className="leading-none lg:mt-7">
                    <h3 className="font-medium text-marine-blue text-base leading-none">
                      {plan.name}
                    </h3>
                    <p className="text-slate-400 text-sm my-1">
                      $
                      {isYearly
                        ? `${plan.price.yearly}/yr`
                        : `${plan.price.monthly}/mo`}
                    </p>
                    {isYearly && (
                      <p className="text-sm text-marine-blue">2 months free</p>
                    )}
                  </div>
                </label>
                <input
                  type="radio"
                  name="plan"
                  value={plan.name}
                  id={plan.name}
                  className="hidden"
                  hidden
                  onChange={() =>
                    setSelectedPlan({
                      id: plan.id,
                      name: plan.name,
                      price: plan.price,
                    })
                  }
                />
              </li>
            ))}
          </ul>

          <div className="bg-[hsl(231_100%_99%)] py-3 rounded flex justify-center items-center gap-6 mt-8">
            <span
              className={`text-sm font-medium ${
                !isYearly ? "text-marine-blue" : "text-slate-400"
              }`}
            >
              Monthly
            </span>
            <label className="block w-[42px] h-[20px] rounded-full bg-marine-blue relative cursor-pointer">
              <input
                type="checkbox"
                className="hidden peer"
                checked={isYearly}
                onChange={() => setIsYearly((isChecked) => !isChecked)}
              />
              <span className="block w-[12px] h-[12px] rounded-full bg-white absolute top-1/2 -translate-y-1/2 left-1 peer-checked:translate-x-[22px] duration-300"></span>
            </label>
            <span
              className={`text-sm font-medium ${
                isYearly ? "text-marine-blue" : "text-slate-400"
              }`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="bg-white py-4 shadow fixed left-0 bottom-0 w-full z-50 md:absolute md:shadow-none">
          <div className="max-w-screen-md md:w-full mx-auto px-4 flex items-center justify-end gap-2 md:px-14">
            <button
              onClick={() => setCurrentStep("step-1")}
              className="select-none text-slate-500 hover:text-marine-blue"
            >
              Go Back
            </button>
            <button
              onClick={handleSubmit}
              className="ml-auto bg-marine-blue text-white px-4 py-2 rounded text-base font-medium select-none hover:bg-blue-800 active:scale-[0.99]"
            >
              Next Step
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}
