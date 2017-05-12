import fileinput
import os

with open("tmp.html","w") as f:
    for line in fileinput.input("other/1.txt"):
        f.write(line)

    for line in fileinput.input("data/1.txt"):
        f.write(line)

    for line in fileinput.input("other/2.txt"):
        f.write(line)

os.system("tmp.html")
