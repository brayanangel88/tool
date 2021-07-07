import { Action, createReducer, on } from '@ngrx/store';
import { comprado, pendiente } from './carrito.actions';
 
export const initialState = false;
 
const _carritoReducer = createReducer(
  initialState,
  on(comprado, (state) => true),
  on(pendiente, (state) => false)
);
 
export function carritoReducer(state: boolean | undefined, action: Action) {
  return _carritoReducer(state, action);
}