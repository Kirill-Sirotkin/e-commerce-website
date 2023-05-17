import store from "../stores/store";

type GlobalState = ReturnType<typeof store.getState>;
export default GlobalState;
