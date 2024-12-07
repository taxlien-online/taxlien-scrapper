#!/bin/bash

#For payfltaxes.com through mygovonline.com

SERVER="lafayette-fl.mygovonline.com"
#polk-eps.mygovonline.com
#$1
CSV_FILE=list/fl_lafayette.csv
$2
RESDIR=res.lafayette
$3



# Чтение первого столбца и выполнение file.run для каждого значения
while IFS=, read -r column1 rest
do
  #./file.run "$column1"
  column1=$(echo "$column1" | sed 's/"//g')
  column1=${column1:1}
  echo $column1
   # polk bez -1 :  parcell=${column1:0:6}-${column1:6:6}-${column1:12}
  parcell=${column1:0:2}-${column1:2:2}-${column1:4:2}-${column1:6:4}-${column1:10:4}-${column1:14:5}

  #echo "01-03-10-0000-0000-00104"

  echo $parcell
  #exit 0
  
  # polk -H 'Authorization: Basic ypp45nfNNBfyXOf1ksZtSI0VJ' \
  
  curl -v "https://${SERVER}/api/v2/due/PPT/${parcell}?detail_level=public" \
  -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Referer: https://polk.payfltaxes.com/' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'Authorization: Basic VUaMOokTJWrWsqbaXoJgzpynj' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua-platform: "macOS"' > ${RESDIR}/${parcell}
done < <(tail -n +2 "$CSV_FILE")




##wget 'https://fl-columbia-taxcollector.governmax.com/collectmax/search_collect.asp?reset=True&body=search_collect.asp&account=R00051-000&go.x=1&l_nm=account&user=guest_FL-Columbia-TaxCollector&pass=manatron&sid=98BE53B5F44C42478FE1E4033FC76F30&agencyid=FL-Columbia-TaxCollector'
#wget 'https://fl-columbia-taxcollector.governmax.com/collectmax/search_collect.asp?reset=True&body=search_collect.asp&account=R00031-000&go.x=1&l_nm=account&user=guest_FL-Columbia-TaxCollector&pass=manatron&sid=98BE53B5F44C42478FE1E4033FC76F30&agencyid=FL-Columbia-TaxCollector'
##wget 'https://fl-columbia-taxcollector.governmax.com/collectmax/tab_collect_payhistV5.4.asp?t_nm=collect_mvppay&sid=98BE53B5F44C42478FE1E4033FC76F30'
#wget 'https://fl-columbia-taxcollector.governmax.com/collectmax/tab_collect_payhistV5.4.asp?wait=done&t_nm=collect%5Fmvppay&sid=98BE53B5F44C42478FE1E4033FC76F30'


#wget 'https://polk.payfltaxes.com/property-tax/bill/222602-000000-011040'
#wget 'https://polk-eps.mygovonline.com/api/v2/due/PPT/222602-000000-011040?detail_level=public'


curl 'https://polk-eps.mygovonline.com/api/v2/due/PPT/222602-000000-011040?detail_level=public' \
  -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Referer: https://polk.payfltaxes.com/' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'Authorization: Basic ypp45nfNNBfyXOf1ksZtSI0VJ' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua-platform: "macOS"' > res.html