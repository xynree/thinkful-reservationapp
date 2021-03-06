/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from './format-reservation-date';
import formatReservationTime from './format-reservation-date';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);
    if (response.status === 204) {
      return null;
    }
    const payload = await response.json();
    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */
export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { method: 'GET', headers, signal}, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function listByNum(number, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  url.searchParams.append('mobile_number', number.toString())
  return await fetchJson(url, { method: 'GET', headers, signal}, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function listReservationById(id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${id}`);
  return await fetchJson(url, { method: 'GET', headers, signal}, [])
}

export async function cancelReservation(id,signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${id}/status`);
  const data = JSON.stringify({data: { status: "cancelled" }})
  return await fetchJson(url, { method: 'PUT', body: data,  headers, signal}, [])
}

export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { method: 'GET', headers, signal}, [])
}

export async function saveReservation(body, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  const data = JSON.stringify({data: body})
  return await fetchJson(url, { method: "POST", body: data , headers, signal},[])
}

export async function updateReservation(body, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${body.reservation_id}`);
  const data = JSON.stringify({data: body})
  return await fetchJson(url, { method: "PUT", body: data , headers, signal},[])
}

/** Saves new table */
 export async function saveTable(body, signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const data = JSON.stringify({data: body})
  return await fetchJson(url, { method: "POST", body: data , headers, signal},[])
}

export async function seatReservation(body, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${body.table_id}/seat`);
  const data = JSON.stringify({data: {reservation_id: body.reservation_id}})
  return await fetchJson(url, { method: "PUT", body: data , headers, signal},[])
}

export async function deleteSeatReservation (table_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  return await fetchJson(url, { method: "DELETE", headers, signal },[]);
}

