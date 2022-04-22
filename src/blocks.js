import { powerbi } from './consts';

export default function (editor, opts = {}) {
  const bm = editor.BlockManager;
  const pfx = opts.countdownClsPfx;
  const style = opts.defaultStyle
    ? `<style>
    .${pfx} {
      text-align: center;
      font-family: Helvetica, serif;
    }
    .${pfx}-block {
      display: inline-block;
      margin: 0 10px;
      padding: 10px;
    }
    .${pfx}-digit {
      font-size: 5rem;
    }
    .${pfx}-endtext {
      font-size: 5rem;
    }
    .${pfx}-cont,
    .${pfx}-block {
      display: inline-block;
    }
  </style>`
    : '';

  if (opts.blocks.indexOf(powerbi.tagName) >= 0) {
    bm.add(powerbi.tagName, {
      label: opts.blockLabel || 'PowerBI',
      category: opts.blockCategory || 'Reporting',
      attributes: { class: 'fa fa-area-chart' },
      content: `
        <div class="${pfx}" data-gjs-type="${powerbi.tagName}"></div>
        ${style}
      `,
    });
  }
}
