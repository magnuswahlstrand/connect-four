import cx from "classnames";

export function BoardHole({player}: { player: number }) {
    return <div className="h-32 w-32 flex items-center justify-center">
        <div className={cx(
            "h-24 w-24 rounded-full border-2 border-t-4 border-black",
            {"bg-white": player === 0},
            {"bg-red-500": player === 1},
            {"bg-yellow-400": player === 2}
        )}/>
    </div>;
}