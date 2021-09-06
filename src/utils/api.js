export const API_END_POINT = 'https://kdt.roto.codes'

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, {
            ...options,
            headers: {
                'x-username': 'hyosung'
            }
        })

        if (res.ok) {
            return res.json()
        }
        throw new Error('API ERROR')
    } catch (error) {
        alert(error.message)
    }
}

export const getDocIdByCurUrl = () => {
    try {
        const { pathname } = window.location;
        const [, , docId] = pathname.split('/');
        return docId;
    } catch (error) {
        console.log(error);
        return 'new';
    }
}