# cursor number README

## Features

Right click -> Cursor number<br />
Insert the relative line number in your text file.<br />
Works with multi cursor , highlighting multi line text, or on a single empty line.<br />

Multi cursor:
    - inserts relative line number to each cursor position

Highliting multi line text:
    - inserts relative line number to the start of each highlited line

Single empty line:
    - An input prompt will appear, where you can insert three different values separated by comma:<br />
        1. Number of lines to create<br />
        2. [t|f] true or false if you want to insert relative line numbers on that lines<br />
        3. \<text> text which you want to insert on those lines<br />

    example input: 3,t,test 
    will insert:
        1 test
        2 test
        3 test

    example input: 3
    will insert:
        1
        2
        3

    example input: 3,f,test
    will insert:
        test
        test
        test


## Release Notes


### 1.0.0

Initial release of cursornumber

**Enjoy!**
