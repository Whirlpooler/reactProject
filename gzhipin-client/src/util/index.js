export function getRedirectTo(type, header, action) {
    let path
    if (type === 'laoban') {
        path = '/dashen'
    } else {
        path = '/laoban'
    }
    if (!header) {
        path = '/' + type + 'info'
    }
    return path
}