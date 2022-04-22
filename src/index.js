import grapesjs from 'grapesjs';
import loadComponents from './components';
import loadBlocks from './blocks';
import { powerbi } from './consts';

export default grapesjs.plugins.add(powerbi.tagName, (editor, opts = {}) => {
  let defaults = {
    blocks: [powerbi.tagName],

    // Default style
    defaultStyle: true,

    // Default start time, eg. '2018-01-25 00:00'
    startTime: '',

    // Text to show when the countdown is ended
    endText: 'EXPIRED',

    // Date input type, eg, 'date', 'datetime-local'
    dateInputType: 'date',

    // Countdown class prefix
    countdownClsPfx: 'countdown',

    // Countdown label
    labelCountdown: 'Countdown',

    // Countdown category label
    labelCountdownCategory: 'Extra',

    // Days label text used in component
    labelDays: 'days',

    // Hours label text used in component
    labelHours: 'hours',

    // Minutes label text used in component
    labelMinutes: 'minutes',

    // Seconds label text used in component
    labelSeconds: 'seconds',
  };

  let config = { ...defaults, ...opts };

  // Add components
  loadComponents(editor, config);

  // Add components
  loadBlocks(editor, config);
});
