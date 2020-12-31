export const shiftRequest = function shiftRequest(request,newdata,target,requestUrl) {
    return {
      type: request,
      target:target,
      url:requestUrl,
      newdata
    }
  }