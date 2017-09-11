import Ember from 'ember';
import { LXLTag } from 'ember-letter-by-letter';

const {
  get,
  getProperties,
  isPresent,
  setProperties
} = Ember;

const { RSVP: { resolve } } = Ember;

export default LXLTag.extend({
  /**
    Called when a tag is opening, such as ((#expression))

    @method open
    @param {Object} lxlContainer
    @param {Array} params
    @return {Promise}
  */

  open(...args) {
    const character = get(args[0], 'linkedDirections.character');

    if (isPresent(character)) {
      setProperties(this, {
        character,
        previousExpression: get(character, 'attrs.currentExpression')
      });
    }

    return this.execute(...args);
  },

  /**
    Called when a tag is neither opening nor closing, such as ((expression))

    @method execute
    @param {Object} lxlContainer
    @param {Array} params
    @return {Promise}
  */

  execute(lxlContainer, [expression, transition]) {
    const character = get(lxlContainer, 'linkedDirections.character');

    if (isPresent(character)) {
      character.expression(expression, transition);
    }

    return resolve();
  },

  /**
    Called when a tag is closing, such as ((/expression))

    @method close
    @param {Object} lxlContainer
    @param {Array} params
    @return {Promise}
  */

  close() {
    const { character, previousExpression } = getProperties(this, 'character', 'previousExpression');

    if (isPresent(character) && isPresent(previousExpression)) {
      character.expression(previousExpression);
    }

    return resolve();
  }
});
