const PlayerBoard = ({ players = [], currentId }) => {

  return (
    <div className="flex flex-col gap-1 w-52 overflow-y-auto max-h-full">
      {players.map((player, i) => {
        const isYou = player.id === currentId;
        return (
          <div
            key={player.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
              isYou
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-800 shadow-sm"
            }`}
          >
            {/* Rank */}
            <span
              className={`text-xs font-bold w-5 shrink-0 ${
                isYou ? "text-blue-100" : "text-gray-400"
              }`}
            >
              #{i + 1}
            </span>

            {/* Avatar — no circle, raw SVG */}
            {player.avatar ? (
              <img
                src={player.avatar}
                alt={player.username}
                style={{ width: 52, height: 52, objectFit: "contain" }}
                className="shrink-0"
                draggable={false}
              />
            ) : (
              <span className="text-sm font-bold text-gray-500 shrink-0">
                {player.username?.[0]?.toUpperCase()}
              </span>
            )}

            {/* Name + Score */}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold truncate leading-tight">
                {player.username}
                {isYou && (
                  <span className="ml-1 text-xs font-normal text-blue-100">
                    (You)
                  </span>
                )}
              </span>
              <span
                className={`text-xs ${
                  isYou ? "text-blue-200" : "text-gray-400"
                }`}
              >
                {player.score ?? 0} pts
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayerBoard;