
export function isURI(value: string) {
    let error
    if (!value) {
        error = '* this field is required'
    } else if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value)) {
        error = '* URI is invalid'
    }
    return error
}

export function isNotEmpty(value: string) {
    let error
    if (!value) {
        error = '* this field is required'
    } 
    return error
}