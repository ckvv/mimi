# @ckvv/mimi

一个命令行工具， 你可以使用它加密、解密本地文件。

```
Usage: @ckvv/mimi [options] [command]

一个命令行工具， 你可以使用它加密、解密本地文件。

Options:
  -V, --version                         output the version number
  -h, --help                            display help for command

Commands:
  encrypt [options] [<input>:<output>]  加密
  digest [options] [<input>:<output>]   解密
  server [options] [dir]                解密文件服务
  help [command]                        display help for command
```

## 功能

### 加密本地文件

```
mimi encrypt
```

### 解密本地文件

```
mimi digest
```

### 静态文件服务

```
mimi server
```
