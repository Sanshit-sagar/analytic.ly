

 
export const destinationInputAtom = atom('')
export const isTypingDestinationAtom = atom(false)
export const isDestinationInputValidAtom = atom((get) => isValidUrl(get(destinationInputAtom)))
export const destinatioParamsAtom = atom((get) => {
    try {
        const isValid = get(isDestinationInputValidAtom)
        const urlStr = get(destinationInputAtom)

        if(urlStr && isValid) {
            let urlObj = new URL(urlStr);
            return {
                hostname: urlObj.host,
                hash: urlObj.hash,
                origin: urlObj.origin,
                password: urlObj.password,
                protocol: urlObj.protocol,
                port: urlObj.port,
                search: urlObj.search,
                username: urlObj.username,
                pathname: urlObj.pathname
            };
        }
        return null
    } catch(error) {
        return null; 
    }
});
