/** @format */

async function fetchToken({ username, password }) {
    let res = await fetch("http://localhost:5000/api/Tokens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!res.ok) return null;

    const reader = res.body.getReader();
    let encodedResult = await reader.read();
    let token = new TextDecoder("utf-8").decode(encodedResult.value);
    return token;
}

async function fetchUser(token, username) {
    const res = await fetch("http://localhost:5000/api/Users/" + username, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    return JSON.parse(await res.text());
}

async function fetchContacts(token) {
    const res = await fetch("http://localhost:5000/api/Chats", {
        method: "GET",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    let data = await res.text();
    return JSON.parse(data);
}

async function postContact(token, username) {
    const res = await fetch("http://localhost:5000/api/Chats", {
        method: "POST",
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    });

    return res.ok ? JSON.parse(await res.text()) : "User not found";
}

async function fetchMessages(token, id) {
    const res = await fetch("http://localhost:5000/api/Chats/" + id, {
        method: "GET",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;
    return JSON.parse(await res.text());
}

async function postMessage(token, id, message) {
    const res = await fetch(`http://localhost:5000/api/Chats/${id}/Messages`, {
        method: "POST",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: message }),
    });

    if (!res.ok) return null;
    return JSON.parse(await res.text());
}

export { fetchToken, fetchUser, fetchContacts, postContact, fetchMessages, postMessage };
