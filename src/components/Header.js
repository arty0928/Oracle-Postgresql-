export default function Header() {
  return (
    <div>
      {/* <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
      <h2 className="mt-6 text-center text-4xl font-bold tracking-tight text-gray-900">
        Query Converter
      </h2>
      <div className="mt-2 text-center text-sm text-gray-600">
        <div className="text-lg font-medium text-indigo-500">
          please input oracle query to translate
        </div>
      </div>
    </div>
  );
}
