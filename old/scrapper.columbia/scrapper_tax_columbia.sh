#!/bin/bash

CSV_FILE="columbia.csv"

# Чтение первого столбца и выполнение file.run для каждого значения
while IFS=, read -r column1 rest
do
  #./file.run "$column1"
  #column1=$(echo "$column1" | sed 's/"//g')
  echo $column1
  #parcell=${column1:0:6}-${column1:6:6}-${column1:12}
  parcell=${column1:1:6}-${column1:7}
  echo $parcell
#R00051-000
  
#wget -O "https://columbia.floridapa.com/GIS/TaxLink_wait.asp?R00051-000"

SID=3FECE4EA16DD4386B6C632626C4B743F



proxychains wget -O res.columbia/$parcell.first "https://fl-columbia-taxcollector.governmax.com/collectmax/search_collect.asp?reset=True&body=search_collect.asp&account=${parcell}&go.x=1&l_nm=account&user=guest_FL-Columbia-TaxCollector&pass=manatron&sid=${SID}&agencyid=FL-Columbia-TaxCollector"
proxychains wget -O res.columbia/$parcell.full "https://fl-columbia-taxcollector.governmax.com/collectmax/tab_collect_payhistV5.4.asp?wait=done&t_nm=collect%5Fmvppay&sid=${SID}"
  
done < <(tail -n +2 "$CSV_FILE")

exit 




#curl 'https://fl-columbia-taxcollector.governmax.com/collectmax/site_authlink.asp?a=R00051-000&r=Columbia.FloridaPA.com' \
#  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
#  -H 'Accept-Language: en-US,en;q=0.9,th-TH;q=0.8,th;q=0.7,ru-RU;q=0.6,ru;q=0.5' \
#  -H 'Cache-Control: no-cache' \
#  -H 'Connection: keep-alive' \
#  -H 'Pragma: no-cache' \
#  -H 'Referer: https://columbia.floridapa.com/' \
#  -H 'Sec-Fetch-Dest: document' \
#  -H 'Sec-Fetch-Mode: navigate' \
#  -H 'Sec-Fetch-Site: cross-site' \
#  -H 'Upgrade-Insecure-Requests: 1' \
#  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
#  -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
#  -H 'sec-ch-ua-mobile: ?0' \
#  -H 'sec-ch-ua-platform: "macOS"'

#  curl -v "https://polk-eps.mygovonline.com/api/v2/due/PPT/${parcell}?detail_level=public" \
#  -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
#  -H 'Content-Type: application/x-www-form-urlencoded' \
#  -H 'Referer: https://polk.payfltaxes.com/' \
#  -H 'sec-ch-ua-mobile: ?0' \
#  -H 'Authorization: Basic ypp45nfNNBfyXOf1ksZtSI0VJ' \
#  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
#  -H 'sec-ch-ua-platform: "macOS"' > res/${parcell}




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
  
curl "https://fl-columbia-taxcollector.governmax.com/collectmax/search_collect.asp?reset=True&body=search_collect.asp&account=${parcell}&go.x=1&l_nm=account&user=guest_FL-Columbia-TaxCollector&pass=manatron&sid={SID}&agencyid=FL-Columbia-TaxCollector" \
  -L --socks5-hostname [::1]:10808 \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'Accept-Language: en-US,en;q=0.9,th-TH;q=0.8,th;q=0.7,ru-RU;q=0.6,ru;q=0.5' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H "Referer: https://fl-columbia-taxcollector.governmax.com/collectmax/collect30.asp?sid=${SID}" \
  -H 'Sec-Fetch-Dest: frame' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' > res.columbia/$parcell.first
  
  
curl "https://fl-columbia-taxcollector.governmax.com/collectmax/tab_collect_payhistV5.4.asp?wait=done&t_nm=collect%5Fmvppay&sid=${SID}" \
  -L --socks5-hostname [::1]:10808 \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
  -H 'Accept-Language: en-US,en;q=0.9,th-TH;q=0.8,th;q=0.7,ru-RU;q=0.6,ru;q=0.5' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Pragma: no-cache' \
  -H "Referer: https://fl-columbia-taxcollector.governmax.com/collectmax/tab_collect_payhistV5.4.asp?t_nm=collect_mvppay&sid=${SID}" \
  -H 'Sec-Fetch-Dest: document' \
  -H 'Sec-Fetch-Mode: navigate' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Upgrade-Insecure-Requests: 1' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' > res.columbia/$parcell.full
