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
  assert.expect(12);

  const done = assert.async();

  visit('/affinity-engine/test-scenarios/stage/directions/character').then(() => {

    return step(75);
  }).then(() => {
    assert.equal(parseFloat($hook('affinity_engine_stage_direction_image').children(hook('ember_animation_box')).css('opacity')).toFixed(1), 0.2, '`transition` sets character css');

    return step(75);
  }).then(() => {
    assert.equal(parseFloat($hook('affinity_engine_stage_direction_image').children(hook('ember_animation_box')).css('opacity')).toFixed(1), 0.5, '`transition`s can be chained');

    return step(75);
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_image').length, 2, 'multiple instances of the same character can be rendered by setting `instance`');

    return step(75);
  }).then(() => {
    assert.equal(parseFloat(Ember.$(`${hook('affinity_engine_stage_direction_image')}:nth(0)`).children(hook('ember_animation_box')).css('opacity')).toFixed(1), 0.5, 'instances respond independently to `transition`s: 1');
    assert.equal(parseFloat(Ember.$(`${hook('affinity_engine_stage_direction_image')}:nth(1)`).children(hook('ember_animation_box')).css('opacity')).toFixed(1), 0.6, 'instances respond independently to `transition`s: 2');

    return step(75);
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_image').length, 3, 'characters with different fixtures can co-exist on screen');

    return step(75);
  }).then(() => {
    assert.equal($hook('affinity_engine_stage_direction_image').length, 4, 'characters are rendered with `position`');
    assert.equal(Ember.$(`${hook('affinity_engine_stage_direction_image')}:nth(3)`).children(hook('ember_animation_box')).css('margin'), '10px', '`position` positions the character');

    return step(150);
  }).then(() => {
    const $bitsy4 = Ember.$(`${hook('affinity_engine_stage_direction_image')}:nth(3)`).children(hook('ember_animation_box'));

    assert.equal($bitsy4.css('margin'), '10px', '`position` can accept multiple positions, margin');
    assert.equal($bitsy4.css('padding'), '15px', '`position` can accept multiple positions, padding');
    assert.equal(parseFloat($bitsy4.css('opacity')).toFixed(1), 0.7, '`position` can accept multiple positions, opacity');

    return step(75);
  }).then(() => {
    return step(150);
  }).then(() => {
    assert.equal(Ember.$(`${hook('affinity_engine_stage_direction_image')}:nth(4)`).children(hook('ember_animation_box')).css('margin'), '10px', '`position` can be chained after expression');

    done();
  });
});
