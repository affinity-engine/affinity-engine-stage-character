import Ember from 'ember';
import characters from 'dummy/affinity-engine/fixtures/characters';
import keyframes from 'dummy/affinity-engine/fixtures/keyframes';

const { Controller } = Ember;

export default Controller.extend({
  config: {
    animationLibrary: 'velocity'
  },
  fixtures: {
    characters,
    keyframes
  }
});
