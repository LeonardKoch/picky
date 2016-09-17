import babel from 'rollup-plugin-babel';

export default (() => {
    switch (process.env.NODE_ENV) {
        case 'browser':
            return {
                entry: 'src/picky.js',
                format: 'iife',
                moduleName: 'picky',
                plugins: [babel()],
                dest: 'dist/picky.js'
            };
        case 'main':
            return {
                entry: 'src/picky.js',
                format: 'cjs',
                plugins: [babel()],
                dest: 'lib/picky.js'
            };

    }
})();
