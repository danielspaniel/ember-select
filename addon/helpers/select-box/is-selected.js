import { helper } from "@ember/component/helper";

export function isSelected([item, selected, valuePath]) {
  if (valuePath) {
    let value = item.get ? item.get(valuePath) : item[valuePath];
    return value === selected;
  }
  return item === selected;
}

export default helper(isSelected);
