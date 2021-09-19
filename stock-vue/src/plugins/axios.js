import axios from "axios";
const install = (Vue) => {
  Object.defineProperty(Vue.prototype, "$axios", { value: axios });
};
export default install;
