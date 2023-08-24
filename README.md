## IMP-Shell

**This is an early prototype, not ready for production use!!**

To run this, you need an executable that exposes a CLI with two methods: `calculate` and `impl`.
`--calculate` takes no arguments, it is just a flag that triggers the model to run (rather than just printing config etc).
`--impl` takes a string argument defining the path to a yaml where the model config is stored.

To use the prototype setup from `ief-sandbox` you can clone https://github.com/jmcook1186/ief-sandbox and then create an executable using pyinstaller.

```sh
pyinstaller src/cli.py
```

Then copy the `data`, `models` and `impls` directories into `dist`.

Now you can call the binary in `ief-sandbox/dist/cli` as follows:

```sh
./dist/cli/cli --calculate --impl dow_msft.yaml
```

We can use IMP-Shell to do this inside the Typescript IEF framework. Calling the `shellCommand()` function spawns a child process. The child process then handles the CLI call via STDIN. The result is returned to the function over STDOUT and also saved locally as a yaml file.

To do this as a standalone, run:

```sh
node index.ts`
```

Or import the func into a larger TS project and call the func, passing the paths to the relevant impl and executable as args.