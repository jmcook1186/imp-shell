// require these libraries
const fs = require('fs');
const yaml = require('js-yaml');
const cp = require('child_process');


function shellCommand(impl, execPath, omplName) {
    /* 
    description:
        spawns a child process to run an external IMP
        expects execPath to be a path to an executable with a CLI exposing two methods: --calculate and --impl
        The shell command then calls the --command method passing var impl as the path to the desired impl file

    params:
    - impl: path to impl file
    - execPath: path to executable
    - omplName: savename for ompl file

    returns:
    - ompl data to stdout
    - ompl data to disk as omplName.yaml
    */

    // create a child process to run the CLI
    const exe = execPath; // assign the path to an executable
    try {
        const child = cp.spawn(exe, ['--calculate', '--impl=' + impl]); // pass the CLI argument in the array

        // handle the return data
        child.stdout.on('data', function (data) {
            // print to console
            var o = '' + data
            const yamlStr = yaml.safeDump(o);
            console.log(o)
            fs.writeFileSync(omplName, yamlStr, 'utf8');

        });
        // close the process
        child.stdin.end();
    }
    catch (e) {
        Error("Error calling external IMP: please check input arguments")
    }


}

//example invocation
shellCommand('dow_msft.yaml', '/home/joe/Code/ief-sandbox/dist/cli/cli', 'ompl.yaml')
