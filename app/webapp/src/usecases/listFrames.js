

const frameMap = {
    blue: '/blue.png',
    pink: '/pink.png',
    //red: '/ok_logo.png',
}

export const frames = () => Object.keys(frameMap);
export const toUrl = (frameId) => {
   if(!frameMap[frameId]) {
       console.error("Error: Image not found", frameMap, frameMap[frameId])
   }
   return frameMap[frameId]
};
