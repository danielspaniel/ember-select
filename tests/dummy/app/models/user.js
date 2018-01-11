import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed } from '@ember/object';

export default Model.extend({
  name: attr('string'),
  email: attr('string'),

  nickname: computed('name', function() {
    return ['nick', this.get('name')].join(' ');
  })
});
