import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { add, remove, reset } from './cart.action';

export const initialState = {
  items: [],
};

const _cartReducer = createReducer(
  initialState,
  on(add, (state, action: any) => {
    const temp = [...state.items, action.value];
    const newSate = { ...state, items: temp };
    return newSate;
  }),
  on(remove, (state, action: any) => {
    {
      const temp = state.items.filter((item) => item.id !== action.value);
      const newSate = { ...state, items: temp };
      return newSate;
    }
  }),
  on(reset, (state) => {
    return { ...state, item: [] };
  })
);

export function cartReducer(state, action) {
  return _cartReducer(state, action);
}
