# @ckvv/mimi

A command line tool, you can use to encrypt and decrypt local files.

## features

### encrypt files

```
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

```
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

```
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