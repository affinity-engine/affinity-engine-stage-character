import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../../../tests/helpers/module-for-acceptance';
import { $hook, hook } from 'ember-hook';

moduleForAcceptance('Acceptance | affinity-engine/stage/directions/character', {
  beforeEach() {
    Ember.$.Velocity.mock = true;
  },

  afterEach() {
    Ember.$.Velocity.mock = false;
  }
});

test('Affinity Engine | Director | Directions | character', function(assert) {
  assert.expect(18);

  visit('/affinity-engine/test-scenarios/stage/directions/character').then(() => {
    assert.equal(parseFloat($hook('affinity_engine_stage_direction_character').css('opacity')).toFixed(1), '0.1', 'by default uses the config setting to `transition`');
    assert.equal(Ember.$(`${hook('affinity_engine_stage_direction_expression')} img`).attr('alt'), 'Bitsy', '`alt` is set by the fixture `caption`');
    assert.ok(Ember.$(`${hook('affinity_engine_stage_direction_expression')} img`).attr('src').match('engine/characters/bitsy/neutral.png'), 'it sets the `src` based on the associated fixture expression');

    return step(75);
  }).then(() => {
    assert.equal(parseFloat($hook('affinity_engine_stage_direction_character').css('opacity')).toFixed(1), 0.2, '`transition` sets character css');

    return step(75);
  }).then(() => {
    assert.equal(parseFloat($hook('affinity_engine_stage_direction_character').css('opacity')).toFixed(1), 0.5, '`transition`s can be chained');

    return step(75);
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_character').length, 2, 'multiple instances of the same character can be rendered by setting `instance`');

    return step(75);
  }).then(() => {
    assert.equal(parseFloat(Ember.$(`${hook('affinity_engine_stage_direction_character')}:nth(0)`).css('opacity')).toFixed(1), 0.5, 'instances respond independently to `transition`s: 1');
    assert.equal(parseFloat(Ember.$(`${hook('affinity_engine_stage_direction_character')}:nth(1)`).css('opacity')).toFixed(1), 0.6, 'instances respond independently to `transition`s: 2');

    return step(75);
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_character').length, 3, 'characters with different fixtures can co-exist on screen');

    return step(75);
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_character').length, 4, '`character` can be passed a fixture directly');
    assert.ok(Ember.$(`${hook('affinity_engine_stage_direction_expression')}:nth(3) img`).attr('src').match('engine/characters/emma/neutral.png'), 'the manually defined character defaultExpressionId is set properly');

    return step(75);
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_character').length, 5, 'characters are rendered with `position`');
    assert.equal(Ember.$(`${hook('affinity_engine_stage_direction_character')}:nth(4)`).css('left'), '640px', '`position` positions the character');

    return step(150);
  }).then(() => {
    const $bitsy4 = Ember.$(`${hook('affinity_engine_stage_direction_character')}:nth(4)`);

    assert.equal($bitsy4.css('left'), '256px', '`position` can accept multiple positions, Y');
    assert.equal($bitsy4.css('bottom'), '-38.375px', '`position` can accept multiple positions, X');

    return step(75);
  }).then(() => {
    assert.ok(Ember.$(`${hook('affinity_engine_stage_direction_expression')}:nth(5) img`).attr('src').match('engine/characters/bitsy/happy.png'), '`expression` can adjust the expression before rendering');

    return step(150);
  }).then(() => {
    assert.ok(Ember.$(`${hook('affinity_engine_stage_direction_expression')}:nth(5) img`).attr('src').match('engine/characters/bitsy/sad.png'), '`expression` can adjust the expression after rendering');
    assert.equal(Ember.$(`${hook('affinity_engine_stage_direction_character')}:nth(5)`).css('left'), '1024px', '`position` can be chained after expression');
  });
});
