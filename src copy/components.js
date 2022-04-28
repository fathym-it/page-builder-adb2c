import { powerbi } from './consts';

export default function (editor, opts = {}) {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

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

            let embedEl = this.querySelector('powerbi-embed');

            let embedIframeEl = window.document.createElement('iframe');
            embedIframeEl.src = `https://app.powerbi.com/view?r=${reportKey}`;
            embedIframeEl.style.display = '';

            console.log(embedEl);

            embedEl.appendChild(embedIframeEl);

            console.log(embedIframeEl);
          },
        },
      },
      {
        isComponent(el) {
          if (
            el.tagName == powerbi.tagName ||
            (el.getAttribute &&
              el.getAttribute('data-gjs-type') == powerbi.tagName)
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
        this.listenTo(this.model, 'change:reportKey', this.updateScript);

        const comps = this.model.get('components');

        // Add a basic countdown template if it's not yet initialized
        if (!comps.length) {
          var reportKey = 'turkey'; // this.model.reportKey;

          comps.reset();
          comps.add(`
            <powerbi-embed src="https://app.powerbi.com/view?r=${reportKey}"></powerbi-embed>
          `);
        }
      },
    }),
  });
}
