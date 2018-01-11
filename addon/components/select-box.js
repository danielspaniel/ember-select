import Component from '@ember/component';
import {getOwner} from '@ember/application';
import { A } from '@ember/array';
import layout from '../templates/components/select-box';

/**
 * Had to do my own select box because ember-power-select does not respond to ipad pencil
 * and emberx-select just plain does not work with ember 2.13 and was junk anyway
 */
export default Component.extend({
  layout,
  tagName: 'select',
  labelPath: null,
  valuePath: null,

  // If the labelPath happens to be found as a helper, then setup that helper
  // function in the actions hash to he used in creating the option labels
  init() {
    this._super(...arguments);
    let owner = getOwner(this);
    let helper = owner.lookup(['helper', this.get('labelPath')].join(':'));
    if (helper) {
      this.set('labelHelper', helper.compute);
    }
  },

  // In order to be able to return an actual model as the value, which
  // you can't normally do in option value, be more over the top about
  // getting the value, since you could otherwise do e.target.value and be done
  change() {
    let selectedIndex = this.$()[0].selectedIndex,
        // ensure DS.HasManyArray is converted to array of models
        options       = A(this.get('options') || []).toArray(),
        hasPrompt     = !!this.get('prompt'),
        valuePath     = this.get('valuePath'),
        actualIndex   = hasPrompt ? selectedIndex - 1 : selectedIndex,
        selection     = options[actualIndex],
        value         = selection;

    if (valuePath) {
      value = selection.get ? selection.get(valuePath) : selection[valuePath];
    }

    this.get('onChange')(value);
  }
});
