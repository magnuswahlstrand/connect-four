import {useState} from "react";
import cx from "classnames";
import {ChevronDown} from "lucide-react";
import {BoardHole} from "@/components/Board/Hole";

type ColumnProps = {
    onClick: () => void,
    holes: number[]
    disabled: boolean
};

export function BoardColumn({onClick, holes, disabled}: ColumnProps) {
    const [hovered, setHovered] = useState(false)

    const hasEmptyHole = holes.some((cell) => cell === 0)
    const handleClick = (hasEmptyHole && !disabled) ? onClick : () => null


    return <div
        className={hovered && !disabled ? "bg-blue-600" : "bg-blue-700"}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}>
        <div className="bg-white">
            <ChevronDown size={72} className={cx(
                "mx-auto text-blue-800", {
                    "opacity-0": !(hovered && hasEmptyHole && !disabled)
                })}/>
        </div>
        {holes.map((cell, y) =>
            <BoardHole key={y} player={cell}/>
        )}</div>
}