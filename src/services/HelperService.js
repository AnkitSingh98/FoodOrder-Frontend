export const BASE_URL = `http://localhost:8081`

export const formatDate = (timeInLongs) =>{
    
        if(timeInLongs == null)
        return null;

        const date = new Date(timeInLongs);
        return date.toLocaleString()

}
