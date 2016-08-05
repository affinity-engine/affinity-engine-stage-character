import Ember from 'ember';
import multiton from 'ember-multiton-service';
import { configurable, deepConfigurable, registrant } from 'affinity-engine';
import { DirectableComponentMixin, TransitionableComponentMixin } from 'affinity-engine-stage';

const {
  Component,
  computed,
  get,
  isPresent,
  observer,
  run
} = Ember;

const configurationTiers = [
  'directable.attrs',
  'expression.expression',
  'expression',
  'config.attrs.component.stage.direction.expression',
  'config.attrs'
];

export default Component.extend(DirectableComponentMixin, TransitionableComponentMixin, {
  classNames: ['ae-stage-direction-character-expression-container'],
  hook: 'affinity_engine_stage_direction_expression',

  config: multiton('affinity-engine/config', 'engineId'),
  translator: registrant('affinity-engine/translator'),

  caption: configurable(configurationTiers, 'caption'),
  imageElement: configurable(configurationTiers, 'imageElement'),
  resolve: configurable(configurationTiers, 'resolve'),
  src: configurable(configurationTiers, 'src'),
  transitionIn: deepConfigurable(configurationTiers, 'transitionIn'),
  transitionOut: deepConfigurable(configurationTiers, 'transitionOut'),

  didInsertElement(...args) {
    this._super(...args);

    this._transitionInExpression();
    this._insertImage();
  },

  _transitionInExpression() {
    this.executeTransitionIn().then(() => {
      run(() => {
        const resolve = get(this, 'resolve');

        if (isPresent(resolve)) { resolve(); }
      });
    });
  },

  _insertImage() {
    const captionTranslation = get(this, 'captionTranslation');
    const image = get(this, 'imageElement') || `<img src="${get(this, 'src')}">`;
    const $image = this.$(image).clone();

    $image.addClass('ae-stage-direction-character-expression');
    $image.attr('alt', captionTranslation);

    this.$().append($image);
  },

  captionTranslation: computed('expression.id', 'caption', {
    get() {
      const translation = get(this, 'caption') || `expressions.${get(this, 'expression.id')}`;

      return get(this, 'translator').translate(translation);
    }
  }),

  image: computed('expression.$image', {
    get() {
      return get(this, 'expression.$image')[0];
    }
  }),

  changeCaption: observer('captionTranslation', function() {
    const caption = get(this, 'captionTranslation');

    this.$('img').attr('alt', caption);
  })
});
