echo Database: mytestdb
echo Table_Name: $1
echo Column_Name:$2
echo Start_Time: $3
echo End_Time: $4
echo Threads_on_each: $5

mysql -u root -p mytestdb -ss -e "select $2 from "$1" where timestamp between "$3" and "$4 >> db_files/$2.$5.$1.log