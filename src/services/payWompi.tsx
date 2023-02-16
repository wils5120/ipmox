
const url = "https://sandbox.wompi.co/v1"


export const getMerchants = async () => {
    try{
        const res = await fetch(`${url}/merchants/${import.meta.env.VITE_APP_TOKEN_PUBLIC} `)
        const response = await res.json()
        return response
    }catch(err){
        console.log("Ups", err)
    }
}

export const postSaveProgress = async (body: any) => {
    try{
        const res = await fetch(`${url}/transactions/`,{
            method: 'POST',
            cache: 'no-cache',
            headers:{
                'Authorization':  `Bearer ${import.meta.env.VITE_APP_TOKEN_PUBLIC}` ,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        } )
        const response = await res.json()
        return response
    }catch(err){
        console.log("Ups", err)
    }
}

export const getTransactions = async (reference: string) => {
    try{
        const res = await fetch(`${url}/transactions?reference=${reference} `,{
            method: 'GET',
            headers:{
                'Authorization': `Bearer ${import.meta.env.VITE_APP_TOKEN_PRIVATE}` 
            }
        } )
        const response = await res.json()
        return response
    }catch(err){
        console.log("Ups", err)
    }
}