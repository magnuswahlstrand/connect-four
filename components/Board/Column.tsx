import {useState} from "react";
import cx from "classnames";
import {ChevronDown} from "lucide-react";
import {BoardHole} from "@/components/Board/Hole";

export function BoardColumn({onClick, holes}: { currentPlayer: number, onClick: () => void, holes: number[] }) {
    const [hovered, setHovered] = useState(false)

    const hasEmptyHole = holes.some((cell) => cell === 0)
    const handleClick = hasEmptyHole ? onClick : () => {
    }


    return <div
        className={cx(
            {"bg-blue-600": hovered},
            {"bg-blue-700": !hovered}
        )}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}>
        <div className="bg-white">
            <ChevronDown size={72} className={cx(
                "mx-auto text-blue-800", {
                    "opacity-0": !(hovered && hasEmptyHole),
                })}/>
        </div>
        {holes.map((cell, y) =>
            <BoardHole key={y} player={cell}/>
        )}</div>
}