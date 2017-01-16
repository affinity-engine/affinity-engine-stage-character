import Ember from 'ember';
import { LXLTag } from 'ember-letter-by-letter';

const {
  get,
  getProperties,
  isPresent,
  setProperties,
  typeOf
} = Ember;

const { RSVP: { resolve } } = Ember;

export default LXLTag.extend({
  /**
    Called when a tag is opening, such as ((#state))

    @method open
    @param {Object} lxlContainer
    @param {Array} params
    @return {Promise}
  */

  open(...args) {
    const character = get(args[0], 'links.character');

    if (isPresent(character)) {
      setProperties(this, {
        character,
        previousState: get(character, 'attrs.previousState')
      });
    }

    return this.execute(...args);
  },

  /**
    Called when a tag is neither opening nor closing, such as ((state))

    @method execute
    @param {Object} lxlContainer
    @param {Array} params
    @return {Promise}
  */

  execute(lxlContainer, [stateOrKey, value]) {
    const character = get(lxlContainer, 'links.character');
    const state = typeOf(stateOrKey) === 'string' ? { [stateOrKey]: value } : stateOrKey;

    if (isPresent(character)) {
      character.state(state);
    }

    return resolve();
  },

  /**
    Called when a tag is closing, such as ((/state))

    @method close
    @param {Object} lxlContainer
    @param {Array} params
    @return {Promise}
  */

  close() {
    const { character, previousState } = getProperties(this, 'character', 'previousState');

    if (isPresent(character) && isPresent(previousState)) {
      character.state(previousState);
    }

    return resolve();
  }
});
