const lists = [
  {
    name: "Alice Kapoor",
    text: "Smooth booking process and great deals! Saved a ton on my last Europe trip.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Mehta",
    text: "Found last-minute tickets to Dubai at amazing rates. Highly recommend!",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sara Johnson",
    text: "The UI is clean and easy to use. Will definitely book again!",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];
export const Cards = () =>
  lists.map(({ name, text, img }) => (
    <div
      key={name}
      className="bg-gray-50 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
    >
      <img src={img} alt={name} className="w-16 h-16 rounded-full mb-4" />
      <p className="italic">"{text}"</p>
      <p className="mt-4 font-semibold">- {name}</p>
    </div>
  ));
