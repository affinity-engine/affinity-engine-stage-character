import Ember from 'ember';
import characters from 'dummy/affinity-engine/fixtures/characters';
import keyframes from 'dummy/affinity-engine/fixtures/keyframes';

const { Controller } = Ember;

export default Controller.extend({
  config: {
    animationLibrary: 'velocity',
    component: {
      stage: {
        direction: {
          character: {
            classNames: {
              base: 'ae-figure',
              decorative: null,
              structural: null
            },
            positions: {
              dummy1: {
                margin: '10px'
              },
              dummy2: {
                padding: '15px'
              },
              dummy3: {
                opacity: 0.7
              }
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
