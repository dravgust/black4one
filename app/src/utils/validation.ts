
export function isURI(value: string) {
    let error
    if (!value) {
        error = 'URI is required'
    } else if (!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(value)) {
        error = 'URI is invalid'
    }
    return error
}