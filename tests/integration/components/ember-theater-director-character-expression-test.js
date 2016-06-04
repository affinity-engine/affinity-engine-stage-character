import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { initialize as initializeHook } from 'ember-hook';
import { initialize as initializeMultitons } from 'ember-multiton-service';
import { initializeQUnitAssertions } from 'ember-message-bus';
import { initialize as initializeDirector } from 'ember-theater-director';
import { deepStub } from 'ember-theater';

const {
  get,
  getOwner,
  getProperties,
  set,
  setProperties
} = Ember;

moduleForComponent('ember-theater-director-character-expression', 'Integration | Component | ember theater director character expression', {
  integration: true,

  beforeEach() {
    const appInstance = getOwner(this);

    initializeHook();
    initializeMultitons(appInstance);
    initializeQUnitAssertions(appInstance);
    initializeDirector(appInstance);
  }
});

const configurationTiers = [
  'directable.attrs',
  'expression.expression',
  'expression',
  'config.attrs.director.expression',
  'config.attrs.globals'
];

configurationTiers.forEach((priority) => {
  test(`imageElement is assigned by priority ${priority}`, function(assert) {
    assert.expect(1);

    const stub = deepStub(priority, 'imageElement', '<img id="success">');

    setProperties(this, getProperties(stub, 'config', 'directable', 'expression'));

    this.render(hbs`{{ember-theater-director-direction-character-expression directable=directable config=config expression=expression}}`);

    assert.ok(this.$('#success').length > 0, 'img is present');
  });

  test(`src is assigned by priority ${priority}`, function(assert) {
    assert.expect(1);

    const stub = deepStub(priority, 'src', 'foo');

    setProperties(this, getProperties(stub, 'config', 'directable', 'expression'));

    this.render(hbs`{{ember-theater-director-direction-character-expression directable=directable config=config expression=expression}}`);

    assert.equal(this.$('img').attr('src'), 'foo', 'src is correct');
  });

  test(`caption is assigned by priority ${priority}`, function(assert) {
    assert.expect(1);

    const translator = {
      keyMap: {
        foo: 'bar'
      },
      translate(key) {
        return get(this.keyMap, key);
      }
    };

    const stub = deepStub(priority, 'caption', 'foo');

    setProperties(this, getProperties(stub, 'config', 'directable', 'expression'));
    set(this, 'translator', translator);

    this.render(hbs`{{ember-theater-director-direction-character-expression directable=directable config=config expression=expression translator=translator}}`);

    assert.equal(this.$('img').attr('alt'), 'bar', 'alt is correct');
  });
});

test('alt is set by the fixture id if no caption is present', function(assert) {
  assert.expect(1);

  const translator = {
    keyMap: {
      expressions: {
        foo: 'bar'
      }
    },
    translate(key) {
      return get(this.keyMap, key);
    }
  };

  set(this, 'translator', translator);
  set(this, 'expression', { id: 'foo' });

  this.render(hbs`{{ember-theater-director-direction-character-expression expression=expression translator=translator}}`);

  assert.equal(this.$('img').attr('alt'), 'bar', 'alt is correct');
});
