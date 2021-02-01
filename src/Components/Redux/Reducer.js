const initialState = {
  validemail: true,
  validemailres: "",
  validname: true,
  validnameres: "",
  validmessage: true,
  details: "",
  contactRequestSuccessStatus: false,
  contactRequestFailedStatus: false,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case "INVALID_EMAIL":
      return { ...state, validemail: false, validemailres: action.payload };
    case "VALID_EMAIL":
      return { ...state, validemail: true };
    case "VALID_NAME":
      return { ...state, validname: true };
    case "INVALID_NAME":
      return { ...state, validname: false, validnameres: action.payload };
    case "INVALID_MESSAGE":
      return { ...state, validmessage: false };
    case "VALID_MESSAGE":
      return { ...state, validmessage: true };
    case "DETAILS_FETCH_SUCCESS":
      return { ...state, details: action.payload };
    case "DETAILS_FETCH_FAILED":
      return { ...state, details: action.error.name };
    case "CONTACT_REQUEST_SUCCESS":
      return { ...state, contactRequestSuccessStatus: true };
    case "CONTACT_REQUEST_FAILED":
      return { ...state, contactRequestFailedStatus: true };

    default:
      return state;
  }
}
