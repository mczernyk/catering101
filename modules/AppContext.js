const { createContext, useState, useContext, useReducer } = require("react");

// ContextAPI allows us to manage global state without passing props individually

// context data getter
const PermitStateContext = createContext();
const PermitsStateContext = createContext();

// context data setter
const PermitDispatchContext = createContext();
const PermitsDispatchContext = createContext();

const permitsReducer = (state, action) => {
  // get the permit object and the type of action by destructuring
  const { permit, type } = action;

   // if "replace"
  // replace the entire array with new value
  if (type === "replace") return permit;

  // if "add"
  // return an array of the previous state and the permit object
  if (type === "add") return [...state, permit];

  // if "remove"
  // remove the permit object in the previous state
  // that matches the id of the current permit object
  if (type === "remove") {
    const permitIndex = state.findIndex((x) => x.id === permit.id);

    console.log('delete', { state, permitIndex, permit });

    // if no match, return the previous state
    if (permitIndex < 0) return state;

    // avoid mutating the original state, create a copy
    const stateUpdate = [...state];

    // then splice it out from the array
    stateUpdate.splice(permitIndex, 1);
    return stateUpdate;
  }

  if (type === "edit") {
    let permitIndex = state.findIndex((x) => x.id === permit.id);

    console.log('edit', { state, permitIndex, permit });

    // if no match, return the previous state
    if (permitIndex < 0) return state;

    // update permit at the defined index
    state[permitIndex] = permit;
  }
  return state;
};

export const PermitProvider = ({ children }) => {
  const [permit, setPermit] = useState({});
  const [permits, setPermits] = useReducer(permitsReducer, []);

  return (
    <PermitDispatchContext.Provider value={setPermit}>
      <PermitStateContext.Provider value={permit}>
        <PermitsDispatchContext.Provider value={setPermits}>
          <PermitsStateContext.Provider value={permits}>{children}</PermitsStateContext.Provider>
        </PermitsDispatchContext.Provider>
      </PermitStateContext.Provider>
    </PermitDispatchContext.Provider>
  );
};

export const useDispatchPermit = () => useContext(PermitDispatchContext);
export const usePermit = () => useContext(PermitStateContext);
export const useDispatchPermits = () => useContext(PermitsDispatchContext);
export const usePermits = () => useContext(PermitsStateContext);
