import * as types from './types';

export const optinsFetchSuccess = optins => ({ type: types.OPTINS_FETCH_SUCCESS, optins });
export const optinsFetch = ({ start, end }) => async dispatch => {
  try {
    dispatch(fetchingData(true))

    const res = await fetch(`/api/reports/optins.json?from=${start}&to=${end}`);
    const optins = await res.json();

    dispatch(optinsFetchSuccess(optins));
  } catch(ex) {
    console.error(ex);
  } finally {
    dispatch(fetchingData(false));
  }
};

export const recipientsFetchSuccess = recipients => ({ type: types.RECIPIENTS_FETCH_SUCCESS, recipients })
export const recipientsFetch = ({ start, end }) => async dispatch => {
  try {
    dispatch(fetchingData(true))

    const res = await fetch(`/api/reports/recipients.json?from=${start}&to=${end}`);
    const recipients = await res.json();

    dispatch(recipientsFetchSuccess(recipients));
  } catch(ex) {
    console.error(ex);
  } finally {
    dispatch(fetchingData(false));
  }
};

export const optinsRecipientsEmpty = () => ({ type: types.OPTINS_RECIPIENTS_EMPTY });

export const fetchingData = value => ({ type: types.FETCHING_DATA, fetching: value });