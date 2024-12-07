#!/bin/bash

SERVER=$1
CSV_FILE=$2
RESDIR=$3
CONVERT=$4
SID=$5

echo "SERVER: $SERVER"
echo "CSV file: $CSV_FILE"
echo "Result directory: $RESDIR"
echo "Convert template: $CONVERT"
echo "Session ID: $SID"

# Чтение первого столбца и выполнение file.run для каждого значения
while IFS=, read -r column1 rest
do
  #./file.run "$column1"
  column1=$(echo "$column1" | sed 's/"//g')
  column1=${column1:1}
  echo $column1
  
  #parcell=$(eval "echo ${$CONVERT}")
  parcell=$(eval "echo \"${CONVERT}\"")

  echo $parcell



proxychains wget -O $RESDIR/$parcell.1first "https://$SERVER/collectmax/search_collect.asp?reset=True&body=search_collect.asp&account=${parcell}&go.x=1&l_nm=account&user=guest_FL-Columbia-TaxCollector&pass=manatron&sid=${SID}&agencyid=FL-Columbia-TaxCollector"
proxychains wget -O $RESDIR/$parcell.1full "https://$SERVER/collectmax/tab_collect_payhistV5.4.asp?wait=done&t_nm=collect%5Fmvppay&sid=${SID}"
  
done < <(tail -n +2 "$CSV_FILE")
