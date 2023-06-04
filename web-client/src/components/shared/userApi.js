/** @format */

function createContact(user, id) {
    return {
        id: id,
        user: user,
        lastMessage: null,
    };
}

function getDefaultContact() {
    return {
        id: null,
        user: null,
        lastMessage: null,
    };
}

function getContacts(user) {
    return user.contacts;
}

function addContact(user, contact) {
    user.contacts.push(contact);
}

function getReformattedDate(date) {
    if (date === null || date === undefined) return "";

    const day = date.split("T")[0].replaceAll("-", "/");
    const time = date.split("T")[1].split(".")[0].split(":");

    return `${day} ${time[0]}:${time[1]}`;
}

function defaultUser() {
    return {
        username: "",
        profilePic: "",
        displayName: "",
        token: "",
    };
}

function addMessage(chat, message) {
    chat.push(message);
}

export { createContact, getDefaultContact, getContacts, addContact, getReformattedDate, defaultUser, addMessage };
