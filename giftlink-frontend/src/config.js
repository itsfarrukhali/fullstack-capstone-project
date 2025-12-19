/*jshint esversion: 8 */
const config = {
  backendUrl: process.env.REACT_APP_BACKEND_URL || "https://afarrukh302-3060.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai",
};

console.log(`backendUrl in config.js: ${config.backendUrl}`)
export {config as urlConfig}
