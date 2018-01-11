import { helper } from "@ember/component/helper";

export function displayName([user]) {
  return ['Display', user.get('name'),].join(' ');
}

export default helper(displayName);
