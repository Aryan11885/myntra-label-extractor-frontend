export default function FeatureCards() {
  const cards = [
    {
      title: "Description",
      text: "Upload Myntra invoice PDFs and automatically extract shipping labels."
    },
    {
      title: "Use",
      text: "Generate clean print-ready shipping labels from Myntra invoices."
    },
    {
      title: "Benefit",
      text: "Save manual effort and process shipping labels in seconds."
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-10">

      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-3xl p-8 shadow-sm border-t-4 border-green-500"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            {card.title}
          </h3>

          <p className="text-gray-700 leading-7">
            {card.text}
          </p>
        </div>
      ))}

    </div>
  );
}