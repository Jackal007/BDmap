import fileinput
import os

os.system("getData.py")

with open("tmp.html","w") as f:
    for line in fileinput.input("other/1.txt"):
        f.write(line)

    for line in fileinput.input("data/data.txt"):
        f.write(line)

    for line in fileinput.input("other/2.txt"):
        f.write(line)

os.system("tmp.html")
