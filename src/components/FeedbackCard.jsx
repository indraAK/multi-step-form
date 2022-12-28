import iconThankYou from "../assets/images/icon-thank-you.svg";

export default function FeedbackCard() {
  return (
    <div className="bg-white shadow-xl shadow-slate-200/50 rounded-lg px-6 py-14 grid place-items-center md:shadow-none">
      <img src={iconThankYou} alt="Icon Thank You" />
      <h1 className="text-2xl text-marine-blue font-bold mt-5 mb-1">
        Thank you!
      </h1>
      <p className="text-gray-500 mt-2 text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}
