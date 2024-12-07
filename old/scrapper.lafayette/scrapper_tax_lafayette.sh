#!/bin/bash

#For payfltaxes.com through mygovonline.com

SERVER="lafayette-fl.mygovonline.com"
#polk-eps.mygovonline.com
#$1
CSV_FILE=list/fl_lafayette.csv
$2
RES_DIR=res.lafayette
$3

./scrapper_tax_mygov.sh $SERVER $CSV_FILE $RESDIR

//01-03-10-0000-0000-00104
