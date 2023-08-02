import {experimental_useOptimistic as useOptimistic, useRef, useState} from "react";
import cx from "classnames";
import {ChevronDown} from "lucide-react";
import {BoardHole} from "@/components/Board/Hole";
import {send} from "@/app/game/[id]/actions";

type ColumnProps = {
    index: number,
    // TODO: Rename? this is after (before?) server-action
    onClick: () => void,
    holes: number[]
    disabled: boolean
};

export function BoardColumn({onClick, holes, disabled, index}: ColumnProps) {
    // useOptimistic
    const [foo, sendFoo] = useOptimistic(
        0,
        (state, newMessage: string) => (
            state + 1),
    )

    // async function action(formData: FormData) {
    //     await myAction('yeah!')
    // }


    const [hovered, setHovered] = useState(false)
    const formRef = useRef(null)

    const hasEmptyHole = holes.some((cell) => cell === 0)

    console.log('foo', foo)


    return <form
        ref={formRef}
        action={async (formData) => {
            const index = parseInt(formData.get("columnIndex") as string)

            // formRef.current.reset()
            // addOptimisticMessage(message)
            sendFoo('foo')
            await send(index)
        }} onSubmit={() => onClick()}>
        <div>{foo}</div>
        <input type={"hidden"} name={"columnIndex"} value={index}/>
        <button type="submit" disabled={!hasEmptyHole || disabled}>
            hej
            <div
                className={hovered && !disabled ? "bg-blue-600" : "bg-blue-700"}
                // onPointerEnter={() => setHovered(true)}
                // onPointerLeave={() => setHovered(false)}
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