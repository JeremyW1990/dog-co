function addPrefixZero(string) {
    string = string.toString();
    return string.length === 1 ? "0"+string : string;
}


exports.getDate = () => {
    return `${addPrefixZero(new Date().getFullYear())}-${addPrefixZero(new Date().getMonth())}-${addPrefixZero(new Date().getDate())}`
}

exports.getCurrentTime = () => {
    return `${addPrefixZero(new Date().getHours())}:${addPrefixZero(new Date().getMinutes())}`
}

exports.converStringToReadableFormat = (string) =>{
    const date = new Date(string);
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`

}