
export type Action =
    { type: 'SET_JS', value: String }
  | { type: 'SET_HTML_SOURCE', value: String }
  | { type: 'SET_HTML_OUTPUT', value: String }
  | { type: 'SET_AUTO_RUN', value: Boolean }
  | { type: 'RUN', value: Boolean }
  | { type: 'ADD_LOG', value: Boolean }
;

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
