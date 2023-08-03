export function GameStatus({winner, currentPlayer}: { winner: number | null, currentPlayer: number }) {
    if (winner === null) {
        return `It is ${currentPlayer == 1 ? "your" : "your opponent's"} turn.`
    } else {
        return <div className="text-2xl font-bold">{winner === 1 ? "You" : "Your opponent"} won!</div>
    }
}