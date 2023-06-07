/** @format */

async function fetchToken({ username, password }) {
    let res = await fetch("http://127.0.0.1:5000/api/Tokens", {
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
    const res = await fetch("http://127.0.0.1:5000/api/Users/" + username, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    return JSON.parse(await res.text());
}

async function fetchContacts(token) {
    const res = await fetch("http://127.0.0.1:5000/api/Chats", {
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
    const res = await fetch("http://127.0.0.1:5000/api/Chats", {
        method: "POST",
        headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    });

    if (!res.ok) {
        return {
            content: await res.text(),
            ok: res.ok,
        };
    }

    return {
        content: JSON.parse(await res.text()),
        ok: res.ok,
    };
}

async function fetchMessages(token, id) {
    const res = await fetch("http://127.0.0.1:5000/api/Chats/" + id, {
        method: "GET",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;
    return JSON.parse(await res.text());
}

async function postMessage(token, id, message, socket, sender, reciverUserName) {
    const res = await fetch(`http://127.0.0.1:5000/api/Chats/${id}/Messages`, {
        method: "POST",
        headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: message }),
    });

    let msg = null
    if (res.ok) {
        msg = JSON.parse(await res.text());
    }

    socket.emit("msg", { sender: sender, msg: msg, reciverUserName: reciverUserName });

    console.log("שלחתי", msg)
    return msg;
}

export { fetchToken, fetchUser, fetchContacts, postContact, fetchMessages, postMessage };
