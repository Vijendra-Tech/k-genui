export const fetchData = (endpoint: string,accessToken:string) => {
    const headers = new Headers()
    const bearer = `Bearer ${accessToken}`
    headers.append('Authorization', bearer)
    
    const options = {
        method: 'GET',
        headers: headers
    }

    return fetch(endpoint, options).then(res => res.json()).catch(err => console.error(err))
}