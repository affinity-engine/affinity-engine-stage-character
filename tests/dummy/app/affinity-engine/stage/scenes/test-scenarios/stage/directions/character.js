import { Scene, step } from 'affinity-engine-stage';
import { task } from 'ember-concurrency';

export default Scene.extend({
  name: 'Character Direction Test',

  start: task(function * (script) {
    const bitsy = script.character('bitsy');

    yield step();
    bitsy.transition({ opacity: 0.2 });

    yield step();
    yield bitsy.transition({ opacity: 0.3 }).transition({ opacity: 0.4 }).transition({ opacity: 0.5 });

    yield step();
    const bitsy2 = yield script.character('bitsy');

    yield step();
    yield bitsy2.transition({ opacity: 0.6 });

    yield step();
    yield script.character('emma');

    yield step();
    yield script.character({
      id: 'bobo',
      name: 'Bobo',
      height: 90,
      keyframes: [{ id: 'emma-neutral' }]
    });

    yield step();
    const bitsy3 = yield script.character('bitsy').position('center');

    yield step();
    yield bitsy3.position('left nudgeDown');

    yield step();
    const bitsy4 = yield script.character('bitsy').expression('happy').position('center');

    yield step();
    yield bitsy4.expression('sad').position('right');
  })
});
