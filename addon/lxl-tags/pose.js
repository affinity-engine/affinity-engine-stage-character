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
    Called when a tag is opening, such as ((#pose))

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
        previousPose: get(character, 'attrs.currentPose')
      });
    }

    return this.execute(...args);
  },

  /**
    Called when a tag is neither opening nor closing, such as ((pose))

    @method execute
    @param {Object} lxlContainer
    @param {Array} params
    @return {Promise}
  */

  execute(lxlContainer, [pose, transition]) {
    const character = get(lxlContainer, 'linkedDirections.character');

    if (isPresent(character)) {
      character.pose(pose, transition);
    }

    return resolve();
  },

  /**
    Called when a tag is closing, such as ((/pose))

    @method close
    @param {Object} lxlContainer
    @param {Array} params
    @return {Promise}
  */

  close() {
    const { character, previousPose } = getProperties(this, 'character', 'previousPose');

    if (isPresent(character) && isPresent(previousPose)) {
      character.pose(previousPose);
    }

    return resolve();
  }
});
