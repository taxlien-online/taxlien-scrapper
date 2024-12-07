#!/bin/bash


SERVER="fl-dixie-taxcollector.governmax.com"
CSV_FILE=list/fl_dixie.csv
RESDIR=res.dixie
CONVERT='${column1:0:6}-${column1:6:8}-${column1:14:4}'
SID="455050A819BA45ED9AA5158CCD82C252"

echo "ex"
echo "251311-00001287-0000"
echo "run"

./engine/scrapper_tax_taxcollector.sh $SERVER $CSV_FILE $RESDIR "$CONVERT" $SID

