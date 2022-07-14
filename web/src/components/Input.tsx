import React from "react"
import { BehaviorSubject } from "rxjs"
import { useBehaviorSubjectState } from "./useBehaviorSubjectState"

type Props = React.HTMLProps<HTMLInputElement> & { subject$: BehaviorSubject<string> }

export function Input({ subject$, ...rest }: Props){

    const value = useBehaviorSubjectState(subject$);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        subject$.next(e.target.value);
    }

    return <input onChange={handleChange} value={value} {...rest} />
}