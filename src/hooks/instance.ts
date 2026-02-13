import axios from "axios";
const URI=import.meta.env.VITE_API;
  const instance=()=>axios.create({baseURL:URI})
  export default instance()
