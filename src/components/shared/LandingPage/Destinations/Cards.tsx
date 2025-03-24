const List = [
  {
    city: "Paris",
    img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "Tokyo",
    img: "https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "New York",
    img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
  },
  {
    city: "Dubai",
    img: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=600&q=80",
  },
];
export const Cards = () =>
  List.map(({ city, img }) => (
    <div key={city} className="rounded-xl overflow-hidden shadow-md bg-white">
      <img src={img} alt={city} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{city}</h3>
        <p className="text-sm text-gray-500">
          From ₹25,999 - Limited Time Deal
        </p>
      </div>
    </div>
  ));
