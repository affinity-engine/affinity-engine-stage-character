import Ember from 'ember';
import characters from 'dummy/affinity-engine/fixtures/characters';
import keyframes from 'dummy/affinity-engine/fixtures/keyframes';

const { Controller } = Ember;

export default Controller.extend({
  config: {
    transition: {
      effect: { opacity: 0.1 },
      duration: 100
    },
    component: {
      stage: {
        direction: {
          character: {
            transition: {
              duration: 1000
            }
          }
        }
      }
    }
  },
  fixtures: {
    characters,
    keyframes
  }
});
