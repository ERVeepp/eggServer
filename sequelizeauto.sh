#!/bin/bash
str="sequelize-auto"
echo $str
sequelize-auto -o "./app/model" -d test -h localhost -u root -p 3306 -x 123456 -e mysql
