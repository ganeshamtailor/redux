const redux = require('redux')
const produce = require('immer').produce

const initialState = {
    name: 'Randomname',
    address: {
        street: '123 Randomstreet saa',
        city: 'Randomcity',
        state: 'MA',
    },
}

const STREET_UPDATED = 'STREET_UPDATED'

const streetUpdated = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload,
            //     }
            // }
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
        default: {
            return state
        }
    }
}

const store = redux.legacy_createStore(reducer)
console.log('Initial State', store.getState());

const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState());
})

store.dispatch(streetUpdated('123 New Street'))
unsubscribe()