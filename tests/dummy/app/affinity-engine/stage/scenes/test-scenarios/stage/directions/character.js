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
    const bitsy3 = yield script.character('bitsy').position('dummy1');

    yield step();
    yield bitsy3.position('dummy2 dummy3');

    yield step();
    const bitsy4 = yield script.character('bitsy').state('happy').position('dummy1');

    yield step();
    yield bitsy4.state('sad').position('dummy2');
  })
});
