# @ckvv/mimi

A command line tool, you can use to encrypt and decrypt local files.

## Example

```sh
# encrypt current directory files
mimi encrypt
# encrypt current directory files and delete original files
mimi encrypt -d
# encrypt the current directory file with the key test and delete the original file
mimi encrypt -d -k test

# digest current directory files
mimi digest
# digest current directory files and delete original files
mimi digest -d
# digest the current directory file with the key test and delete the original file
mimi digest -d -k test

mimi server
mimi server -k test -p 9999
```

## Features

### encrypt files

```sh
Usage: mimi encrypt [options] [<input>:<output>]

encrypt files

Arguments:
  <input>:<output>    <input dir>:<output dir>

Options:
  -k, --key <string>  key
  -d, --del           delete original file after encrypt files
  -h, --help          display help for command
```

### digest files

```sh
Usage: mimi digest [options] [<input>:<output>]

digest files

Arguments:
  <input>:<output>    <input dir>:<output dir>

Options:
  -k, --key <string>  key
  -d, --del           delete original file after digest files
  -h, --help          display help for command
```

### digest files server

```sh
Usage: mimi server [options] [dir]

digest files server

Arguments:
  dir                  public dir

Options:
  -k, --key <type>     key
  -p, --port <number>  port number
  -h, --help           display help for command
chenkai@chenkaideMacBook-Pro mimi %
```