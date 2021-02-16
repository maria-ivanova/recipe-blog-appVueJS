export function imageValidator(field) {
    return function(file) {
        if(field) {
            return file.type ==='image/jpeg' || file.type ==='image/png' || this[field].imageUrl;
        }else {
            return file.type ==='image/jpeg' || file.type ==='image/png';
        }
        
    }
}