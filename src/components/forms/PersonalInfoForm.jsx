import { useRef, useState } from "react";
import { useSubScriptionStepForm } from "../../stores/subscription";
import Card from "../Card";

export default function PersonalInfoForm() {
  const { setCurrentStep, subScriptionData, setSubScriptionData } =
    useSubScriptionStepForm();
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const errors = useRef({});

  function handleSubmit() {
    validateInput("name", subScriptionData.name);
    validateInput("email", subScriptionData.email);
    validateInput("phone", subScriptionData.phone);

    if (Object.keys(errors.current).length === 0) {
      setCurrentStep("step-2");
    }
  }

  function handleInputChange(e) {
    validateInput(e.target.name, e.target.value);
    setSubScriptionData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function validateInput(inputName, inputValue) {
    if (inputName === "name") {
      if (inputValue.length === 0) {
        setNameError("This field is required");
        errors.current[inputName] = "This field is required";
        return;
      }
      setNameError(null);
      delete errors.current[inputName];
      return;
    }

    if (inputName === "email") {
      if (inputValue.length === 0) {
        setEmailError("This field is required");
        errors.current[inputName] = "This field is required";
        return;
      }
      if (!isValidEmail(inputValue)) {
        setEmailError("Email is not valid");
        errors.current[inputName] = "Email is not valid";
        return;
      }
      setEmailError(null);
      delete errors.current[inputName];
      return;
    }

    if (inputName === "phone") {
      if (inputValue.length === 0) {
        setPhoneError("This field is required");
        errors.current[inputName] = "This field is required";
        return;
      }
      if (!isValidPhoneNumber(inputValue)) {
        setPhoneError("Phone number is not valid");
        errors.current[inputName] = "Phone number is not valid";
        return;
      }
      setPhoneError(null);
      delete errors.current[inputName];
      return;
    }
  }

  function isValidEmail(email) {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return emailRegex.test(email);
  }

  function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]{8,14}$/g;
    return phoneRegex.test(phoneNumber);
  }

  return (
    <>
      <Card
        title="Personal Info"
        text="Please provide your name, email address, and phone number."
      >
        <form className="mt-5 pb-3 md:mt-8">
          <div className="mb-3">
            <label
              htmlFor="name"
              className="text-purplish-blue text-[15px] inline-block mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Stephen King"
              className={`input-field ${nameError ? "invalid" : ""}`}
              value={subScriptionData.name}
              onChange={handleInputChange}
            />
            {nameError !== null && (
              <p className="text-[12px] text-red-500 mt-1">{nameError}</p>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="text-purplish-blue text-[15px] inline-block mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. stephenking@example.com"
              className={`input-field ${emailError ? "invalid" : ""}`}
              value={subScriptionData.email}
              onChange={handleInputChange}
            />
            {emailError !== null && (
              <p className="text-[12px] text-red-500 mt-1">{emailError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-purplish-blue text-[15px] inline-block mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g. +1234567890"
              className={`input-field ${phoneError ? "invalid" : ""}`}
              value={subScriptionData.phone}
              onChange={handleInputChange}
            />
            {phoneError !== null && (
              <p className="text-[12px] text-red-500 mt-1">{phoneError}</p>
            )}
          </div>
        </form>

        <div className="bg-white py-4 shadow fixed left-0 bottom-0 w-full z-50 md:absolute md:shadow-none">
          <div className="max-w-screen-md md:w-full mx-auto px-4 flex items-center justify-end gap-2 md:px-14">
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
