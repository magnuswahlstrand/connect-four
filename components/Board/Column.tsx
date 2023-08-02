import {useRef, useState} from "react";
import cx from "classnames";
import {ChevronDown} from "lucide-react";
import {BoardHole} from "@/components/Board/Hole";
import {placeMarker2} from "@/app/game/[id]/actions";

type ColumnProps = {
    index: number,
    // TODO: Rename? this is after (before?) server-action
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
        // onSubmit={onColumnClick}
    >
        <input type={"hidden"} name={"columnIndex"} value={index}/>
        <button type="submit" disabled={!hasEmptyHole || disabled}>
            <div
                className={hovered && !disabled ? "bg-blue-600" : "bg-blue-700"}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <div className="bg-white">
                    <ChevronDown size={72} className={cx(
                        "mx-auto text-blue-800", {
                            "opacity-0": !(hovered && hasEmptyHole && !disabled)
                        })}/>
                </div>
                {holes.map((cell, y) =>
                    <BoardHole key={y} player={cell}/>
                )}</div>
        </button>
    </form>
}