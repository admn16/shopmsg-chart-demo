import * as types from '../actions/types'

interface IAction {
  type: string,
  [key: string]: any
}

interface IOptinReceipt {
  date: string,
  count: number
}

interface IState {
  optins: IOptinReceipt[],
  recipients: IOptinReceipt[],
  isFetchingData: boolean
}

const defaultState: IState = {
  optins: [],
  recipients: [],
  isFetchingData: false
}

export default function(state = defaultState, action: IAction) {
  switch(action.type) {
    case types.OPTINS_FETCH_SUCCESS:
      return {
        ...state,
        optins: action.optins
      }

    case types.RECIPIENTS_FETCH_SUCCESS:
      return {
        ...state,
        recipients: action.recipients
      }

    default:
      return state
  }
}