import Ember from 'ember';
import { configurable } from 'affinity-engine';
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
    'config.attrs.component.stage.direction.character',
    'config.attrs.component.stage.direction.image',
    'config.attrs.component.stage',
    'config.attrs'
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

  name(name) {
    this._entryPoint();

    set(this, 'attrs.name', name);

    return this;
  },

  namePosition(namePosition) {
    this._entryPoint();

    set(this, 'attrs.namePosition', namePosition);

    return this;
  },

  position(positions, duration = 0, options = {}) {
    const effect = positions.split(' ').reduce((aggregator, position) => {
      const nextEffect = get(this, `attrs.character.positions.${position}`) ||
        get(this, `config.attrs.component.stage.direction.character.positions.${position}`) ||
        get(this, `config.attrs.component.stage.positions.${position}`);

      return assign(aggregator, nextEffect);
    }, {});

    this.transition(effect, duration, options);

    return this;
  },

  pose(pose, transition) {
    this.keyframe({ pose }, transition);

    return this;
  },

  expression(expression, transition) {
    this.keyframe({ expression }, transition);

    return this;
  }

  // _setup(fixtureOrId) {
  //   this._entryPoint();
  //
  //   const fixtureStore = get(this, 'fixtureStore');
  //   const fixture = typeOf(fixtureOrId) === 'object' ? fixtureOrId : fixtureStore.find('characters', fixtureOrId);
  //   const id = get(fixture, 'id');
  //   const expressionFixtureOrId = get(fixture, 'defaultExpression');
  //
  //   set(this, 'attrs.fixture', fixture);
  //   set(this, 'id', id);
  //
  //   this.initialExpression(expressionFixtureOrId);
  //
  //   if (isEmpty(get(this, '_$instance'))) {
  //     const transition = { type: 'transition', queue: 'main' };
  //
  //     get(this, 'attrs.transitions').pushObject(transition);
  //     set(this, 'hasDefaultTransition', true);
  //   }
  //
  //   return this;
  // },

  // expression(fixtureOrId, options = {}) {
  //   if (get(this, 'hasDefaultTransition')) {
  //     return this.initialExpression(fixtureOrId);
  //   } else {
  //     return this._changeExpression(fixtureOrId, options);
  //   }
  // },
  //
  // _changeExpression(fixtureOrId, options) {
  //   this._removeDefaultTransition();
  //   this._entryPoint();
  //
  //   const transitions = get(this, 'attrs.transitions');
  //   const expression = this._findExpression(fixtureOrId);
  //
  //   transitions.pushObject(merge({ expression, type: 'crossFade', queue: 'expression' }, options));
  //
  //   return this;
  // },
  //
  // initialExpression(expressionFixtureOrId) {
  //   const fixture = this._findExpression(expressionFixtureOrId);
  //
  //   set(this, 'attrs.expression', fixture);
  //
  //   return this;
  // },

  // _handleChain: on('willChainDirection', function(name) {
  //   if (name === 'text') {
  //     this._removeFromQueueIfDefault();
  //   }
  // }),

  // _removeDefaultTransition() {
  //   if (get(this, 'hasDefaultTransition')) {
  //     set(this, 'hasDefaultTransition', false);
  //     set(this, 'attrs.transitions', Ember.A());
  //   }
  // },
  //
  // _removeFromQueueIfDefault() {
  //   if (get(this, 'hasDefaultTransition')) {
  //     get(this, 'queue').removeObject(this);
  //   }
  // }
});
