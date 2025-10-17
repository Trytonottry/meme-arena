export default function Leaderboard({ players }) {
  return (
    <div className="leaderboard bg-gray-50 p-4 rounded-2xl shadow-inner mt-6">
      <h3 className="text-xl font-semibold mb-3 text-center">🏅 Таблица лидеров</h3>
      <ul className="divide-y divide-gray-200">
        {players
          .sort((a, b) => b.wins - a.wins)
          .slice(0, 5)
          .map((p, i) => (
            <li key={p.id} className="py-2 flex justify-between items-center">
              <span>{i + 1}. {p.name}</span>
              <span className="font-bold">{p.wins} побед</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
