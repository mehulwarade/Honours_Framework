import telnetlib

tn = telnetlib.Telnet('192.168.50.150', 60000)
print(tn)
print('=========================')
tn.write('admin\n')
tn.write('password\n')
tn.write('?\n')


print(tn.read_some())
