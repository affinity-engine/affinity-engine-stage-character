import Ember from 'ember';
import layout from '../templates/components/ember-theater-director-direction-character';
import multiton from 'ember-multiton-service';
import { WindowResizeMixin, configurable, deepArrayConfigurable } from 'ember-theater';
import { Directable, DirectableComponentMixin, TransitionableComponentMixin, TransitionableComponentAutoMixin } from 'ember-theater-director';

const {
  Component,
  K,
  computed,
  get,
  isBlank,
  on,
  set
} = Ember;

const {
  run: {
    later,
    next
  }
} = Ember;

const { RSVP: { Promise } } = Ember;

const configurationTiers = [
  'directable.attrs',
  'directable.attrs.fixture',
  'config.attrs.director.character',
  'config.attrs.globals'
];

export default Component.extend(DirectableComponentMixin, TransitionableComponentMixin, TransitionableComponentAutoMixin, WindowResizeMixin, {
  layout,

  classNames: ['et-character'],
  hook: 'character_direction',

  config: multiton('ember-theater/config', 'theaterId'),

  expressionContainers: computed(() => Ember.A([])),

  expression: configurable(configurationTiers, 'expression'),
  height: configurable(configurationTiers, 'height'),
  transitions: deepArrayConfigurable(configurationTiers, 'directable.attrs.transitions', 'transition'),

  crossFade({ expression, transitionIn, transitionOut }) {
    return new Promise((resolve) => {
      next(() => {
        this._transitionOutExpressions(transitionOut);
        this._transitionInExpression(resolve, expression, transitionIn);
      });
    });
  },

  styles: computed('height', {
    get() {
      const height = get(this, 'height');

      return [`height: ${height}%;`];
    }
  }).readOnly(),

  // during a window resize, the img dimensions get out of proportion. by forcing the browser
  // to redraw the element, we force it to also recalculate the ratios.
  handleWindowResize: on('windowResize', function() {
    const waitDuration = 50;

    this.$().css('display', 'none');

    later(() => {
      this.$().css('display', 'block');
    }, waitDuration);
  }),

  addInitialExpression: on('init', function() {
    const expression = get(this, 'expression');
    const transitionIn = {
      effect: { opacity: 1 },
      duration: 0
    };

    this._transitionInExpression(K, expression, transitionIn);
  }),

  _transitionOutExpressions(transitionOut = { }) {
    const expressionContainer = get(this, 'expressionContainers.firstObject');
    const directable = get(expressionContainer, 'directable');

    set(directable, 'attrs.transitionOut', transitionOut);
    get(directable, 'component').executeTransitionOut().then(() => {
      get(this, 'expressionContainers').removeObject(expressionContainer);
    });
  },

  _transitionInExpression(resolve, expression, transitionIn = { }) {
    if (isBlank(get(transitionIn, 'effect'))) {
      set(transitionIn, 'effect', { opacity: [1, 1] });
    }

    const directable = Directable.create({
      attrs: {
        resolve,
        transitionIn
      }
    });

    const expressionContainer = Ember.Object.create({
      expression,
      directable
    });

    get(this, 'expressionContainers').unshiftObject(expressionContainer);
  }
});
