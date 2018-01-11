import { helper } from "@ember/component/helper";

export function sendToHelper([helper, item]) {
  return helper([item]);
}

export default helper(sendToHelper);
