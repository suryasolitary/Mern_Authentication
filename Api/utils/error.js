export const errorMessage = (statusCode,message)=>{
    const errordata = new Error();
    errordata.statusCode = statusCode;
    errordata.message = message
    return errordata
}