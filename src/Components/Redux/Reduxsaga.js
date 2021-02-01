import { put, takeEvery, call, all } from "redux-saga/effects";
import axios from "axios";
import emailjs from "emailjs-com";

function fetchProductsApi() {
  return axios("https://gitconnected.com/v1/portfolio/gowtham369")
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
}
function contactApi(Data) {
   console.log(Data);
  return emailjs
    .sendForm(
      "service_49ov9z",
      "template_i2n1a7i",
      Data,
      "user_2xg7Ijvj5d4DbEOLiqS9Z"
    )
 /*  return true; */
  .then((response)=> 
    ({ response })
 ).catch( (error) =>
  ({ error })
 );
}
function* fetchDetails() {
  const { response, error } = yield call(fetchProductsApi);
  if (response)
    yield put({ type: "DETAILS_FETCH_SUCCESS", payload: response.data });
  else yield put({ type: "DETAILS_FETCH_FAILED", error });
}
function* contactRequest(actions) {
  const  { response }  = yield (contactApi(actions.formData));
  
  /* var cast = Promise.resolve(result);
var num="{}";
cast.then(function(value) {
  num= JSON.stringify(value)
  num=JSON.parse(num)
  console.log(num)
}) */
console.log(response)

if (response) yield put({ type: "CONTACT_REQUEST_SUCCESS" }) 
  else yield put({ type: "CONTACT_REQUEST_FAILED" });

}
function* detailsSaga() {
  yield takeEvery("DETAILS_FETCH_REQUESTED", fetchDetails);
}
function* contactSaga() {
  yield takeEvery("CONTACT_REQUESTED", contactRequest);
}
export default function* rootSaga() {
  yield all([detailsSaga(), contactSaga()]);
}
