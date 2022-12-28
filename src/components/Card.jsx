export default function Card({ title, text, children }) {
  return (
    <div className="bg-white shadow-xl shadow-slate-200/50 rounded-lg p-6 md:shadow-none">
      <h1 className="text-2xl text-marine-blue font-bold lg:text-3xl">
        {title}
      </h1>
      <p className="text-gray-500 mt-2">{text}</p>
      {children}
    </div>
  );
}
