import { useState, createContext, useContext } from "react";

const SubScriptionContext = createContext();

export default function SubScriptionProvider({ children }) {
  const [currentStep, setCurrentStep] = useState("step-1");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isYearly, setIsYearly] = useState(false);
  const [subScriptionData, setSubScriptionData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const value = {
    currentStep,
    setCurrentStep,
    isYearly,
    setIsYearly,
    selectedAddOns,
    setSelectedAddOns,
    selectedPlan,
    setSelectedPlan,
    subScriptionData,
    setSubScriptionData,
  };

  return (
    <SubScriptionContext.Provider value={value}>
      {children}
    </SubScriptionContext.Provider>
  );
}

export function useSubScriptionStepForm() {
  const context = useContext(SubScriptionContext);

  if (context === undefined) {
    throw new Error(
      "useSubScriptionStepForm must be used within a SubScriptionProvider"
    );
  }

  return context;
}
