import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';
import { powerbi } from './consts';

export default grapesjs.plugins.add(powerbi.tagName, (editor, opts = {}) => {
  let defaults = {
    blocks: [powerbi.tagName],

    // Countdown class prefix
    classPfx: 'powerbi-embed',

    // Default style
    defaultStyle: true,

    // Label
    blockLabel: 'PowerBI',

    // Category label
    blockCategory: 'Reporting',
  };

  let config = { ...defaults, ...opts };

  // Add components
  loadComponents(editor, config);

  // Add components
  loadBlocks(editor, config);
});
