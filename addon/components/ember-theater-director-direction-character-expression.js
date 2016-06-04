import Ember from 'ember';
import multiton from 'ember-multiton-service';
import { configurable, deepConfigurable } from 'ember-theater';
import { DirectableComponentMixin, TransitionableComponentMixin } from 'ember-theater-director';

const {
  Component,
  computed,
  get,
  observer,
  on
} = Ember;

const { inject: { service } } = Ember;

const configurationTiers = [
  'directable.attrs',
  'expression.expression',
  'expression',
  'config.attrs.director.expression',
  'config.attrs.globals'
];

export default Component.extend(DirectableComponentMixin, TransitionableComponentMixin, {
  classNames: ['et-character-expression-container'],
  hook: 'expression_direction',

  translator: service('ember-theater/translator'),

  config: multiton('ember-theater/config', 'theaterId'),

  caption: configurable(configurationTiers, 'caption'),
  imageElement: configurable(configurationTiers, 'imageElement'),
  resolve: configurable(configurationTiers, 'resolve'),
  src: configurable(configurationTiers, 'src'),
  transitionIn: deepConfigurable(configurationTiers, 'transitionIn'),
  transitionOut: deepConfigurable(configurationTiers, 'transitionOut'),

  captionTranslation: computed('expression.id', 'caption', {
    get() {
      const translation = get(this, 'caption') || `expressions.${get(this, 'expression.id')}`;

      return get(this, 'translator').translate(translation);
    }
  }),

  transitionInExpression: on('didInsertElement', function() {
    this.executeTransitionIn().then(() => {
      get(this, 'resolve')();
    });
  }),

  image: computed('expression.$image', {
    get() {
      return get(this, 'expression.$image')[0];
    }
  }),

  insertImage: on('didInsertElement', function() {
    const captionTranslation = get(this, 'captionTranslation');
    const image = get(this, 'imageElement') || `<img src="${get(this, 'src')}">`;
    const $image = this.$(image).clone();

    $image.addClass('et-character-expression');
    $image.attr('alt', captionTranslation);

    this.$().append($image);
  }),

  changeCaption: observer('captionTranslation', function() {
    const caption = get(this, 'captionTranslation');

    this.$('img').attr('alt', caption);
  })
});
