import { Dispatch, SetStateAction, useMemo, useState } from "react";

export type Togglers = [boolean, () => void, () => void, () => void, Dispatch<SetStateAction<boolean>>];

export function useBooleanState(initial = false): Togglers {
    const [state, setState] = useState(initial);
    const makeTrue = useMemo(() => () => setState(true), [setState]);
    const makeFalse = useMemo(() => () => setState(false), [setState]);
    const toggleState = useMemo(() => () => setState((prev) => (prev === true ? false : true)), [setState]);
    return [state, makeTrue, makeFalse, toggleState, setState];
}
