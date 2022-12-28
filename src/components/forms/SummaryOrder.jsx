import { useState } from "react";
import { useSubScriptionStepForm } from "../../stores/subscription";
import Card from "../Card";
import FeedbackCard from "../FeedbackCard";

export default function SummaryOrder() {
  const {
    setCurrentStep,
    selectedAddOns,
    isYearly,
    setIsYearly,
    selectedPlan,
  } = useSubScriptionStepForm();
  const [successSubscribe, setSuccessSubscribe] = useState(false);

  function handleConfirm() {
    setSuccessSubscribe(true);
  }

  function getTotalPrice() {
    const totalAddOnPrice = selectedAddOns.reduce((total, addOn) => {
      return isYearly
        ? total + addOn.price.yearly
        : total + addOn.price.monthly;
    }, 0);

    const planPrice = isYearly
      ? selectedPlan?.price.yearly
      : selectedPlan?.price.monthly;

    return planPrice + totalAddOnPrice;
  }

  return (
    <>
      {successSubscribe ? (
        <FeedbackCard />
      ) : (
        <Card
          title="Finishing up"
          text="Double-check everything looks OK before confirming."
        >
          <div className="mt-5 pb-3 md:mt-8">
            <div className="bg-slate-100 rounded-md p-4 space-y-4">
              <div className="flex items-center justify-between gap-2 leading-none pb-4 border-b border-b-slate-300">
                <div>
                  <h3 className="text-marine-blue font-medium">
                    {selectedPlan?.name} ({isYearly ? "Yearly" : "Monthly"})
                  </h3>
                  <button
                    onClick={() => setIsYearly((yearly) => !yearly)}
                    className="text-sm text-gray-500 underline mt-1 hover:text-purplish-blue"
                  >
                    Change
                  </button>
                </div>
                <span className="text-marine-blue font-medium">
                  $
                  {isYearly
                    ? `${selectedPlan.price.yearly}/yr`
                    : `${selectedPlan.price.monthly}/mo`}
                </span>
              </div>
              {selectedAddOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between gap-2"
                >
                  <p className="text-gray-500">{addOn.name}</p>
                  <span className="text-marine-blue">
                    +$
                    {isYearly
                      ? `${addOn.price.yearly}/yr`
                      : `${addOn.price.monthly}/mo`}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-4 flex items-center justify-between gap-2 mt-7">
              <p className="text-gray-500">
                Total (per {isYearly ? "yearly" : "month"})
              </p>
              <span className="text-purplish-blue text-lg font-bold leading-none">
                +${getTotalPrice()}/{isYearly ? "yr" : "mo"}
              </span>
            </div>
          </div>

          {!successSubscribe && (
            <div className="bg-white py-4 shadow fixed left-0 bottom-0 w-full z-50 md:absolute md:shadow-none">
              <div className="max-w-screen-md md:w-full mx-auto px-4 flex items-center justify-end gap-2 md:px-14">
                <button
                  onClick={() => setCurrentStep("step-3")}
                  className="select-none text-slate-500 hover:text-marine-blue"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="ml-auto bg-marine-blue text-white px-4 py-2 rounded text-base font-medium select-none hover:bg-blue-800 active:scale-[0.99]"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Card>
      )}
    </>
  );
}
