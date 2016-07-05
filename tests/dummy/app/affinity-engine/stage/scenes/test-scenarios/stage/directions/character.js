import { Scene, step } from 'affinity-engine-stage';

export default Scene.extend({
  name: 'Character Direction Test',

  start: async function(script) {
    const bitsy = script.character('bitsy');

    await step();
    bitsy.transition({ opacity: 0.2 });

    await step();
    await bitsy.transition({ opacity: 0.3 }).transition({ opacity: 0.4 }).transition({ opacity: 0.5 });

    await step();
    const bitsy2 = await script.character('bitsy');

    await step();
    await bitsy2.transition({ opacity: 0.6 });

    await step();
    await script.character('emma');

    await step();
    await script.character({
      id: 'bobo',
      name: 'Bobo',
      height: 90,
      defaultExpression: 'emma-neutral'
    });

    await step();
    const bitsy3 = await script.character('bitsy').position('center');

    await step();
    await bitsy3.position('left nudgeDown');

    await step();
    const bitsy4 = await script.character('bitsy').expression('happy').position('center');

    await step();
    await bitsy4.expression('sad').position('right');
  }
});
