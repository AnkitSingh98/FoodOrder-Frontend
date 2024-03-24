//export const BASE_URL = `http://localhost:8081`
export const BASE_URL = `https://efoodorder-backend-production.up.railway.app`

export const formatDate = (timeInLongs) =>{
    
        if(timeInLongs == null)
        return null;

        const date = new Date(timeInLongs);
        return date.toLocaleString()

}
