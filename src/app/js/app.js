// deps
import $ from 'jquery'; // ffs
import Brain from './components/brain';

// show them stats!
const BENCHMARK = true;

// export default () => {
$(() => {
    console.log('DOM ready bro');
    const BRAIN = new Brain('#app', BENCHMARK);
});
// };
