import ChildProcess from 'child_process';
import CLC from 'cli-color';

const babelCompilation = './node_modules/.bin/babel src/server/ -d build/server';

ChildProcess.exec(babelCompilation, (error/*, stdout, stderr*/) => {
    if (error) {
        console.log(CLC.red(error));
    } else {
        console.log(CLC.blue('\nServer build success\n'));
    }
});
