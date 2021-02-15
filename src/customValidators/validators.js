export function imageValidator(field) {
    return function(file) {
        return file.type ==='image/jpeg' || file.type ==='image/png' || this[field].imageUrl;
    }
}