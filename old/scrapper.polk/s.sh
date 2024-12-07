#!/bin/bash

CSV_FILE="ftp_site.txt"

# Чтение первого столбца и выполнение file.run для каждого значения
while IFS=, read -r column1 rest
do
  #./file.run "$column1"
  column1=$(echo "$column1" | sed 's/"//g')
  echo $column1
  parcell=${column1:0:6}-${column1:6:6}-${column1:12}
  echo $parcell
  
  curl -v "https://polk-eps.mygovonline.com/api/v2/due/PPT/${parcell}?detail_level=public" \
  -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Referer: https://polk.payfltaxes.com/' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'Authorization: Basic ypp45nfNNBfyXOf1ksZtSI0VJ' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua-platform: "macOS"' > res/${parcell}
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