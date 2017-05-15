'''
input a user's mac
get all mac he passed,and the UTC time
transfer the mac he passed to GPS
calculate the UTC, get how much time he spend
insert it into "data.txt"
over!
'''
from crate import client
import xlrd

connection=client.connect("http://59.77.7.45:4200")
cursor=connection.cursor()
output=open('data/data.txt','w')
wb = xlrd.open_workbook('other/macAndAddress.xlsx','r')
macAndAddress=wb.sheet_by_index(0)

users=[]
count=input("how many user:")
for i in range(0,int(count)):
    user_mac=input("please input user_mac:")
    users.append(user_mac)
limit=10
for i in range(0,int(count)):
    cursor.execute("select ap_mac,coll_time from cleaned_fz_3000_v3 where user_mac='"+users[i]+"' limit "+str(limit))

    for record in cursor.fetchall():
        for i in range(1,macAndAddress.nrows):
            mac=macAndAddress.cell(i,0).value
            if(mac==str(record[0])):
                gps=macAndAddress.cell(i,2).value
                gps=gps.replace(" ",",")
                gps=gps.replace("[","")
                gps=gps.replace("]","")
                output.write(gps+" "+str(record[1]))
                output.write("\n")
                break;
    output.write("@\n")
output.close()

print("ok")
