import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { manualSetup, makeList } from 'ember-data-factory-guy';
import page from '../../pages/components/select-box';
import hbs from 'htmlbars-inline-precompile';

let options, selectedModel;
module('Integration | Component | select box', function(hooks) {
  setupRenderingTest(hooks);

  let setProperty = () => ({}),
      prompt      = "Select something",
      valuePath   = null,
      labelPath   = "nickname";

  hooks.beforeEach(function() {
    manualSetup(this.owner);
    options = makeList('user', 1);
    [selectedModel] = options;

    this.setProperties({prompt, options, setProperty, valuePath, labelPath});
    page.setContext(this);
  });

  let render = async function(scope, extraProps) {
    scope.setProperties(extraProps);

    await page.render(
      hbs`{{select-box prompt=prompt
                  labelPath=labelPath
                  valuePath=valuePath
                  options=options
                  selected=selected
                  onChange=(action setProperty)
      }}`
    );
  };

  module('labelPath', function() {

    test('as string', async function(assert) {
      labelPath = 'nickname';
      await render(this, {labelPath});

      let expectedLabels = ['Select something', selectedModel.get(labelPath)];
      assert.deepEqual(page.labels, expectedLabels);
    });

    test('as helper function', async function(assert) {
      labelPath = 'users/display-name';
      await render(this, {labelPath});

      let expectedLabels = ['Select something', `Display ${selectedModel.get('name')}`];
      assert.deepEqual(page.labels, expectedLabels);
    });

  });

  module('change', function() {

    async function setupProperties(assert, extraProps = {}) {
      setProperty = (value) => {
        let expectedValue = valuePath ? selectedModel.get(valuePath) : selectedModel;
        assert.deepEqual(value, expectedValue, 'value passed to setProperty');
      };
      extraProps.setProperty = setProperty;

      await render(this, extraProps);
    }

    test('with models and no valuePath', async function(assert) {
      assert.expect(2);
      await setupProperties.call(this, assert);

      let expectedValues = [undefined, selectedModel + ''];
      assert.deepEqual(page.values, expectedValues, 'option values');

      page.pick(selectedModel);
    });

    test('with models and valuePath', async function(assert) {
      assert.expect(2);

      valuePath = 'id';
      await setupProperties.call(this, assert, {valuePath});

      let expectedValues = [undefined, selectedModel.get(valuePath)];
      assert.deepEqual(page.values, expectedValues, 'option values');

      page.pick(selectedModel.get(valuePath));
    });
  });
});
