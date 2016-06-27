// deps
import $ from 'jquery'; // ffs
import Brain from './components/brain';

// show them stats!
const BENCHMARK = true;

$(() => {
    const BRAIN = new Brain('#app', BENCHMARK);
    BRAIN.boot();
});
