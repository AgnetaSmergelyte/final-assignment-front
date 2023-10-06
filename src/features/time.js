const formatDate = (timeStamp) => {
    const dateFormat = new Date(timeStamp);
    return dateFormat.getDate() +
        "/" + (dateFormat.getMonth() + 1) +
        "/" + dateFormat.getFullYear() +
        " " + dateFormat.getHours() +
        ":" + dateFormat.getMinutes() +
        ":" + dateFormat.getSeconds();
}

export default formatDate;