import cx from "classnames";

export function BoardHole({player}: { player: number }) {
    return <div className="md:h-24 md:w-24 h-16 w-16 flex items-center justify-center">
        <div className={cx(
            "md:h-16 md:w-16 h-12 w-12 rounded-full border-2 md:border-t-4 border-black",
            {"bg-white": player === 0},
            {"bg-red-500": player === 1},
            {"bg-yellow-400": player === 2}
        )}/>
    </div>;
}