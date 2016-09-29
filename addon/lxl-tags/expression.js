import Ember from 'ember';
import { LXLTag } from 'ember-letter-by-letter';

const {
  get,
  isPresent
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
    const character = get(lxlContainer, 'links.character');

    return isPresent(character) ? character.expression(expression, transition) : resolve();
  },

  /**
    Called when a tag is closing, such as ((/expression))

    @method close
    @param {Object} lxlContainer
    @param {Array} params
    @return {Promise}
  */

  close() {
    return resolve();
  }
});
