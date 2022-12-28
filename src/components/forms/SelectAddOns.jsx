import { useSubScriptionStepForm } from "../../stores/subscription";
import Card from "../Card";
import iconCheckmark from "../../assets/images/icon-checkmark.svg";

const addOnsList = [
  {
    id: 1,
    name: "Online service",
    description: "Access to multiplayer games",
    price: {
      monthly: 1,
      yearly: 10,
    },
  },
  {
    id: 2,
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
  {
    id: 3,
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
];

export default function SelectAddOns() {
  const { isYearly, setCurrentStep, selectedAddOns, setSelectedAddOns } =
    useSubScriptionStepForm();

  function isAddOnExist(id) {
    return selectedAddOns.some((addOn) => addOn.id === id);
  }

  function selectAddOnHanlder(addOn) {
    if (isAddOnExist(addOn.id)) {
      setSelectedAddOns((currentAddOns) =>
        currentAddOns.filter((item) => item.id !== addOn.id)
      );
    } else {
      setSelectedAddOns((currentAddOns) => [...currentAddOns, addOn]);
    }
  }

  function handleSubmit() {
    if (selectedAddOns.length > 0) setCurrentStep("step-4");
  }

  return (
    <>
      <Card
        title="Pick add-ons"
        text="Add-ons help enhance your gaming experience."
      >
        <ul className="space-y-4 mt-5 pb-3 md:mt-8">
          {addOnsList.map((addOn) => (
            <li
              key={addOn.id}
              className={`flex items-center leading-none justify-between gap-4 p-4 border rounded-md ${
                isAddOnExist(addOn.id)
                  ? "bg-slate-50 border-blue-500"
                  : "bg-white border-slate-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="custom-checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={isAddOnExist(addOn.id)}
                    onChange={() => selectAddOnHanlder(addOn)}
                    className="hidden"
                    hidden
                    id={addOn.name}
                  />
                  <label htmlFor={addOn.name} className="label-checkbox">
                    <img
                      src={iconCheckmark}
                      alt="Icon Checkmark"
                      className="icon"
                    />
                  </label>
                </div>
                <div>
                  <h3 className="text-purplish-blue font-medium">
                    {addOn.name}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-normal">
                    {addOn.description}
                  </p>
                </div>
              </div>
              <span className="text-sm text-blue-700">
                +$
                {isYearly
                  ? `${addOn.price.yearly}/yr`
                  : `${addOn.price.monthly}/mo`}
              </span>
            </li>
          ))}
        </ul>

        <div className="bg-white py-4 shadow fixed left-0 bottom-0 w-full z-50 md:absolute md:shadow-none">
          <div className="max-w-screen-md md:w-full mx-auto px-4 flex items-center justify-end gap-2 md:px-14">
            <button
              onClick={() => setCurrentStep("step-2")}
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
