import { TypedUseSelectorHook, useSelector } from "react-redux";

import GlobalState from "../types/GlobalState";

const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector;
export default useAppSelector;
