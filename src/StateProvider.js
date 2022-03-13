//stateprovider and reducer i have copied direclty and they are wxactly like redux but their implementation is easy
//now we dont have to pass user as prop as we have the user as we have in redux
//we can use it without passing

//we have created a layer of this js file on our index.js

import React, {createContext, useContext, useReducer }  from 'react' ;

export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => (




<StateContext.Provider value={useReducer(reducer, initialState)}>
{children}

</StateContext.Provider>
);


//it helps to pull info from data-layer
export const useStateValue = () => useContext(StateContext);