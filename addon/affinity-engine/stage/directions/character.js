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
    'config.attrs.global'
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

  init(...args) {
    this._super(...args);

    set(this, 'attrs.currentExpression', 'default');
  },

  name: cmd(function(name) {
    set(this, 'attrs.name', name);
  }),

  namePosition: cmd(function(namePosition) {
    set(this, 'attrs.namePosition', namePosition);
  }),

  pose: cmd(function(pose) {
    this.state({ pose });
  }),

  expression: cmd(function(expression) {
    this.state({ expression });
  }),

  outfit: cmd(function(outfit) {
    this.state({ outfit });
  })
});
