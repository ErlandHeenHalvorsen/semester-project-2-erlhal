## Alle endpoints jeg her brukt

- export const API_BASE = "https://v2.api.noroff.dev";
- export const API_AUTH = `${API_BASE}/auth`;
- export const API_AUTH_REGISTER = `${API_AUTH}/register`;
- export const API_AUTH_LOGIN = `${API_AUTH}/login`;
- export const API_AUCTION_BASE = `${API_BASE}/auction/listings`;
- export const API_GET_PROFILE = `${API_BASE}/auction/profiles`;

## request for å by

```js
export async function bidOnListing(id, amount) {
  try {
    let response = await fetch(`${API_AUCTION_BASE}/${id}/bids`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        amount: amount,
      }),
    });

```

### Sånn kjører jeg bidsene:

```js
document.querySelector("#bid-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  let bidAmount = formData.get("bid-amount");
  let credits = getCredits();
  if (!bidAmount) {
    alert("Please enter a bid amount");
    return;
  }
  if (bidAmount > credits) {
    alert("You do not have enough credits to place this bid");
    return;
  }
  await bidOnListing(id, Number(bidAmount));
});
```

## Her er request for å lage bids:

```js
export async function newPost(createBody) {
  try {
    const response = await fetch(`${API_AUCTION_BASE}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(createBody),
    });
```

## Request for å hente ned listings til forside:

```js
export async function getListings(limit = 22, page = 1) {
  try {
    let response = await fetch(
      `${API_AUCTION_BASE}?sort=created&sortOrder=desc&limit=${limit}&page=${page}&_seller=true&_bids=true&_active=true`
    );
    if (!response.ok) {
      throw new Error(response.message);
    }
```

## Her for å hente Listing etter id.

Her har jeg brukt url search params.

### Listing by id:

```js
export async function getListingFromId(id) {
  try {
    let response = await fetch(
      `${API_AUCTION_BASE}/${id}?_seller=true&_bids=true`
    );
    if (!response.ok) {
      throw new Error(response.message);
    }
```

### Url Search Params:

```js
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
```

### Html a ref ser slik ut:

Altså den som sendes fra index.html til singleListing.html

```js
`<a class="shadow-sm hover:shadow-md transition-all ease-in-out duration-150" href="/html/listings/singleListing.html?id=${listing.id}">
    `;
```

## Her henter jeg pålogget brukers Credits:

```js
export async function getCredits() {
  const username = getUsername();
  try {
    let response = await fetch(`${API_GET_PROFILE}/${username}/credits`, {
      method: "GET",
      headers: getHeaders(),
    });
```

## Her Henter jeg Profil til bruker:

```js
const username = getUsername();

export async function getProfile() {
  try {
    const response = await fetch(`${API_GET_PROFILE}/${username}`, {
      method: "GET",
      headers: getHeaders(),
    });
```

### Set og Get Username:

```js
export function setUsername(username) {
  localStorage.setItem("username", username);
  setTimeout(() => {
    localStorage.removeItem("username");
    console.log("Username has been cleared after expiration time.");
  }, 720000); // after 2 hours local storage is cleared.
}

export function getUsername() {
  return localStorage.getItem("username");
}
```

## Neste er hente listings av pålogget bruker:

Her har jeg igjen brukt getUsername()

```js
export async function getProfileListings(limit = 22, page = 1) {
  try {
    let response = await fetch(
      `${API_GET_PROFILE}/${username}/listings?sort=created&sortOrder=desc&limit=${limit}&page=${page}&_bids=true`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
```

## Her er login requestet

```js
export async function getLogin(email, password) {
  const body = {
    email: email,
    password: password,
  };
  try {
    let response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
```

## Registrer request:

```js
export async function getRegisterUser({ name, email, password }) {
  const data = {
    name: name,
    email: email,
    password: password,
  };
  try {
    let response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
```

### Legger med getHeaders():

```js
export function getHeaders() {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (API_KEY) {
    headers.append("X-Noroff-Api-Key", API_KEY);
  }
  const token = localStorage.getItem("token");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return headers;
}
```
