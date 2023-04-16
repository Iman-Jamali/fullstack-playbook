### How to use bash command as argument:
Put the 
```bash
echo $(pwd)
```

### Base64

Base64 is a group of binary-to-text encoding schemes that represent binary data (more specifically, a sequence of 8-bit bytes) in sequences of 24 bits that can be represented by four 6-bit Base64 digits.

Common to all binary-to-text encoding schemes, Base64 is designed to carry data stored in binary formats across channels that only reliably support text content. Base64 is particularly prevalent on the World Wide Web[1] where one of its uses is the ability to embed image files or other binary assets inside textual assets such as HTML and CSS files.[2]

Base64 is also widely used for sending e-mail attachments. This is required because SMTP – in its original form – was designed to transport 7-bit ASCII characters only. This encoding causes an overhead of 33–37% (33% by the encoding itself; up to 4% more by the inserted line breaks).

How to encode/decode values to/from base64 in bash

```bash
echo -n 'iman' | base64
# output: aW1hbgo=

echo aW1hbgo= | base64 --decode
# output: iman
```


### linux echo command


### How to add a binary file to your `PATH` in zsh:

You can have a `bin` directory in your home that is in your `PATH` and then add all the binary files to that directory to have them all accessible throughout the terminal.

1. `mkdir ~/bin`
2. Open your `~/.zshrc` file and add this line at the end. `export PATH=$PATH:$HOME/bin`
3. Move your binary files to this directory (`~/bin`) to have them accessible throughout your terminal.
