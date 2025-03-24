const list = [
  "⚡ Instant Booking",
  "💳 Secure Payments",
  "📞 24/7 Support",
  "🌐 Global Destinations",
];
export const Cards = () =>
  list.map((feature) => (
    <div
      key={feature}
      className="bg-white text-blue-800 px-8 py-5 rounded-xl shadow-md text-lg font-medium"
    >
      {feature}
    </div>
  ));
