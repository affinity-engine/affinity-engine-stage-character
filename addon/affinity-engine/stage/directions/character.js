import Ember from 'ember';
import { configurable } from 'affinity-engine';
import { cmd } from 'affinity-engine-stage';
import { ImageDirection } from 'affinity-engine-stage-direction-image';

const {
  assign,
  computed,
  get,
  set
} = Ember;

export default ImageDirection.extend({
  componentPath: 'affinity-engine-stage-direction-image',
  keyframeParentCategory: 'characters',
  layer: 'engine.stage.foreground.character',

  _configurationTiers: [
    'attrs',
    'attrs.keyframe',
    'attrs.keyframeParent',
    'links.attrs',
    'links.fixtures.character',
    'links.fixtures.image',
    'config.attrs.component.stage.direction.character',
    'config.attrs.component.stage.direction.image',
    'config.attrs.component.stage',
    'config.attrs'
  ],

  _linkedAttrs: [
    'name',
    'namePosition'
  ],

  _directableDefinition: computed('_baseImageDirectableDefinition', '_configurationTiers', {
    get() {
      const configurationTiers = get(this, '_configurationTiers');

      return assign({
        name: configurable(configurationTiers, 'name'),
        namePosition: configurable(configurationTiers, 'namePosition')
      }, get(this, '_baseImageDirectableDefinition'));
    }
  }),

  name: cmd(function(name) {
    set(this, 'attrs.name', name);
  }),

  namePosition: cmd(function(namePosition) {
    set(this, 'attrs.namePosition', namePosition);
  }),

  position: cmd(function(positions, duration = 0, options = {}) {
    const effect = positions.split(' ').reduce((aggregator, position) => {
      const nextEffectTier = Ember.A(get(this, '_configurationTiers')).find((tier) => {
        return get(this, `${tier}.positions.${position}`);
      });
      const nextEffect = get(this, `${nextEffectTier}.positions.${position}`);

      return assign(aggregator, nextEffect);
    }, {});

    this.transition(effect, duration, options);
  }),

  pose: cmd(function(pose, transition) {
    this.keyframe({ pose }, transition);
  }),

  expression: cmd(function(expression, transition) {
    this.keyframe({ expression }, transition);
  })
});
