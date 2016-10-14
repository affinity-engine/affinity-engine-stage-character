export default [{
  id: 'bitsy',
  name: 'Bitsy',
  height: 70,
  defaultIdentifiers: 'neutral',
  layerOrder: ['base'],
  layers: {
    base: [{
      id: 'neutral',
      keyframe: 'bitsy-neutral'
    }, {
      id: 'happy',
      keyframe: 'bitsy-happy'
    }, {
      id: 'sad',
      keyframe: 'bitsy-sad'
    }]
  }
}, {
  id: 'emma',
  name: 'Emma',
  height: 90,
  defaultIdentifiers: 'neutral',
  layerOrder: ['base'],
  layers: {
    base: [{
      id: 'neutral',
      keyframe: 'emma-neutral'
    }]
  }
}];
