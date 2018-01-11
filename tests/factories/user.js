import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user', {

  default: {
    name: (f) => `name-${f.id}`,
    email: (f) => `email-${f.id}@test.com`
  }
});
