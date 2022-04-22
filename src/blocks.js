import { powerbi } from './consts';

export default function (editor, opts = {}) {
  const bm = editor.BlockManager;
  const pfx = opts.classPfx;
  const style = opts.defaultStyle
    ? `<style>
    .${pfx} {
      text-align: center;
      font-family: Helvetica, serif;
    }
  </style>`
    : '';

  if (opts.blocks.indexOf(powerbi.tagName) >= 0) {
    bm.add(powerbi.tagName, {
      label: opts.blockLabel || 'PowerBI',
      category: opts.blockCategory || 'Reporting',
      attributes: { class: `fa ${opts.blockIcon || 'fa-area-chart'}` },
      content: `
        <div class="${pfx}" data-gjs-type="${powerbi.tagName}"></div>
        ${style}
      `,
    });
  }
}
