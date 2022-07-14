import React from "react"
import { Subject } from "rxjs"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { subject$: Subject<void> }

export function Button({ subject$, ...rest }: Props){

    const handleClick = () => subject$.next();

    return <button onClick={handleClick} {...rest} />
}