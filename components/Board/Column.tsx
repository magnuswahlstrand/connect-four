import {useRef, useState} from "react";
import cx from "classnames";
import {ChevronDown} from "lucide-react";
import {BoardHole} from "@/components/Board/Hole";

type ColumnProps = {
    index: number,
    onColumnClick: () => Promise<void>,
    holes: number[]
    disabled: boolean
};

export function BoardColumn({onColumnClick, holes, disabled, index}: ColumnProps) {
    const [hovered, setHovered] = useState(false)
    const formRef = useRef(null)

    const hasEmptyHole = holes.some((cell) => cell === 0)

    return <form
        ref={formRef}
        action={onColumnClick}
    >
        <input type={"hidden"} name={"columnIndex"} value={index}/>
        <button type="submit" disabled={!hasEmptyHole || disabled}>
            <div

                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <div className="-my-2">
                    <ChevronDown className={cx(
                        "md:h-16 md:w-16 h-8 w-8 mx-auto text-blue-800", {
                            "opacity-0": !(hovered && hasEmptyHole && !disabled)
                        })}/>
                </div>
                <div className={hovered && !disabled ? "bg-blue-600" : "bg-blue-700"}>
                    {holes.map((cell, y) =>
                        <BoardHole key={y} player={cell}/>
                    )}</div>
            </div>
        </button>
    </form>
}