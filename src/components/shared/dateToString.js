const dateToString = function (date) {
    if (date === null) {
        return "";
    }

    const day = date.toLocaleDateString("en-US");
    const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `${day}${"\u00A0"}${time}`;
};

export { dateToString };