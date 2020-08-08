echo Database: mytestdb
echo Table_Name: $1
echo Start_Time: $2
echo End_Time: $3

mysql -u root -p mytestdb -ss -e "select p1 from "$1" where timestamp between "$2" and "$3