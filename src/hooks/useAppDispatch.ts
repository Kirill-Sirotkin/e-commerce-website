import { useDispatch } from "react-redux";

import AppDispatch from "../types/AppDispatch";

const useAppDispatch: () => AppDispatch = useDispatch;
export default useAppDispatch;
