import { StoreEvents, State } from "@/framework/Store";
import { Block, Props } from "@/framework/Block";
import store from "@/framework/Store";
import { isEqual } from "./isEqual";
import { cloneDeep } from "./cloneDeep";

export const connect =
  (mapStateToProps: (state: State) => Partial<State>) =>
  <P extends Props>(Component: typeof Block) =>
    class extends Component {
      constructor(props: P) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (
            !isEqual(
              state as Record<string, unknown>,
              newState as Record<string, unknown>,
            )
          ) {
            this.setProps({ ...newState });
          }

          state = cloneDeep(newState);
        });
      }
    };
