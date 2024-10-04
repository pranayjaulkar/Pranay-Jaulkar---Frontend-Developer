export default function FoodItemsSkeleton() {
  const rows = [];
  for (let i = 0; i < 12; i++) {
    rows.push(
      <div key={i} className="flex flex-col">
        <div className="w-72 h-48 rounded-lg bg-gray-300 animate-pulse"></div>
        <div className="w-72 h-10 mt-4 rounded-full bg-gray-300 animate-pulse"></div>
      </div>
    );
  }
  return rows;
}
