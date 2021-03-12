import { useReducer } from 'react';
const initialState = {
  address: '454 Ave, NYC',
  email: 'jakeP@gmail.com',
  name: 'jake peralter',
  password: 'diehard',
  phone: '34985943',
};

function reducer(state, action) {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.value };
    case 'name':
      return { ...state, name: action.value };
    case 'address':
      return { ...state, address: action.value };
    case 'phone':
      return { ...state, phone: action.value };
    case 'password':
      return { ...state, password: action.value };
    default:
      break;
  }
}

export function useFormState() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
}
