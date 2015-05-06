# grunt-cipher

> Encrypt/Decrypt files using private key.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cipher --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cipher');
```

## The "cipher" task

### Overview
In your project's Gruntfile, add a section named `cipher` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cipher: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.pk
Type: `String`

A private key that is used to encrypt/decrypt files.

#### options.method
Type: `String`
Default value: `'encrypt'`

The value can be `'encrypt'` or `'decrypt'`, which used to decide encrypt or decrypt files.

#### options.force
Type: `Boolean`
Default value: `'false'`

The value that is used to overwrite the `'dest'` file or not when encrypting or decrypting files.
The default value `'false'` is not to overwrite the `'dest'` file, when its content is the same with the encrypted or decrypted result.

### Usage Examples

#### Encrypt Options
In this example, the options are used to encrypt files from `src` to `dest` directory using private key, which is from command option `--pk` or `.pk` file. So files on `tmp/encrypted/` would be encrypted.

```js
grunt.initConfig({
  cipher: {
    options: {
      pk:grunt.cli.options.pk||grunt.file.read('.pk')
    },
    files: [{
      expand:true,
      cwd:'test/',
      src:['fixtures/*'],
      dest:'tmp/encrypted/'
    }]
  },
});
```

#### Decrypt Options
In this example, the options are used to decrypt files from `src` to `dest` directory using private key, which is from command option `--pk` or `.pk` file. So files on `tmp/decrypted/` would be decrypted.

```js
grunt.initConfig({
  cipher: {
    options: {
      pk:grunt.cli.options.pk||grunt.file.read('.pk'),
      method:'decrypt'
    },
    files: [{
      expand:true,
      cwd:'tmp/encrypted/',
      src:['fixtures/*'],
      dest:'tmp/decrypted/'
    }]
  },
});
```