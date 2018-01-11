import { attribute, fillable, collection, create, text, value } from 'ember-cli-page-object';

export default create({
  scope: 'select',

  select: fillable(),
  pick: function(value) {
    return this.select(value + ''); // stringify the value
  },
  value: value(),
  values: attribute('value', 'option', {multiple: true}),
  labels: text('option', {multiple: true}),

  options: collection({
    itemScope: 'option',
    item: {
      value: attribute('value'),
      label: attribute('label'),
    }
  })
});
