import Ember from 'ember';
import { cmd } from 'affinity-engine-stage';
import { ImageDirection } from 'affinity-engine-stage-direction-image';

const {
  get
} = Ember;

export default ImageDirection.extend({
  componentPath: 'affinity-engine-stage-direction-image',
  keyframeParentCategory: 'characters',
  layer: 'engine.stage.foreground.image',

  _configurationTiers: [
    'global',
    'component.stage',
    'image',
    'component.stage.direction.image',
    'character',
    'component.stage.direction.character'
  ],

  init(...args) {
    this._super(...args);

    this.configure('currentExpression', 'default');
  },

  pose: cmd(function(pose, durationOrTransition, twoWayFade = true) {
    get(this, '_state') ? this.state({ pose }, durationOrTransition, twoWayFade) : this.keyframe(pose);
  }),

  expression: cmd(function(expression, durationOrTransition, twoWayFade) {
    get(this, '_state') ? this.state({ expression }, durationOrTransition, twoWayFade) : this.keyframe(expression);
  }),

  outfit: cmd(function(outfit, durationOrTransition, twoWayFade) {
    get(this, '_state') ? this.state({ outfit }, durationOrTransition, twoWayFade) : this.keyframe(outfit);
  })
});
