import { Block, Typography } from "@Components/ui";

export const HeroSection = () => (
  <Block
    className="relative text-white py-28 px-6 text-center w-full"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <Block className="bg-black bg-opacity-60 p-10 rounded-xl max-w-4xl mx-auto">
      <Typography asElement="h1" className="text-5xl font-bold mb-4 text-white">
        Fly Anywhere, Anytime
      </Typography>
      <Typography asElement="p" className="text-xl mb-8 text-white">
        Book flights to your dream destinations
      </Typography>

      {/* Flight Search Widget */}
      <Block
        asElement="div"
        className="bg-white rounded-xl p-6 shadow-lg text-gray-800"
      >
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Origin (e.g. Delhi)"
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Destination (e.g. London)"
          />
          <input className="border p-2 rounded" type="date" />
          <input className="border p-2 rounded" type="date" />
          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Passengers"
          />
          <select className="border p-2 rounded">
            <option>Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded py-2 md:col-span-3">
            🔍 Search Flights
          </button>
        </form>
      </Block>
    </Block>
  </Block>
);
