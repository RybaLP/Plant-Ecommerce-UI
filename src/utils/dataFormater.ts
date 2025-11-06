export const dataFormater = (dateString : string) => {
    const date = new Date(dateString);

    return {
        day: date.getDay(),
        month : date.getMonth(),
        year : date.getFullYear()
    }
}