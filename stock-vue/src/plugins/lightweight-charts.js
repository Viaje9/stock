import { createChart } from "lightweight-charts";
const install = (Vue) => {
  Object.defineProperty(Vue.prototype, "$createChart", { value: createChart });
};
export default install;
