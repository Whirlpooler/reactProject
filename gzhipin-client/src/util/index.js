export function getRedirectTo(type, header, action) {
    let path
    if (type === 'laoban') {
        path = '/laoban'
    } else {
        path = '/dashen'
    }
    if (!header) {
        path += 'info'
    }
    return path
}