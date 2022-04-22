import { powerbi } from './consts';

export default function (editor, opts = {}) {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;
  const pfx = opts.classPfx;

  domc.addType(powerbi.tagName, {
    model: defaultModel.extend(
      {
        defaults: {
          ...defaultModel.prototype.defaults,
          reportKey: opts.reportKey,
          draggable: true,
          droppable: false,
          traits: [
            {
              label: 'Report Key',
              name: 'reportKey',
              changeProp: 1,
            },
          ],
          script: function () {
            var reportKey = '{[ reportKey ]}';

            var embedEl = this.querySelector('[data-js=powerbi-embed] iframe');
            console.log(embedEl);
            embedEl.src = `https://app.powerbi.com/view?r=${reportKey}`;
            embedEl.style.display = '';
          },
        },
      },
      {
        isComponent(el) {
          if (
            el.getAttribute &&
            el.getAttribute('data-gjs-type') == powerbi.tagName
          ) {
            return {
              type: powerbi.tagName,
            };
          }
        },
      }
    ),

    view: defaultView.extend({
      init() {
        this.listenTo(
          this.model,
          'change:startfrom change:reportKey',
          this.updateScript
        );
        const comps = this.model.get('components');

        // Add a basic countdown template if it's not yet initialized
        if (!comps.length) {
          var reportKey = '{[ reportKey ]}';

          comps.reset();
          comps.add(`
            <iframe data-js="powerbi-embed" src="https://app.powerbi.com/view?r=${reportKey}"></iframe>
          `);
        }
      },
    }),
  });
}
