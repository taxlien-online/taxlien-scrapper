sudo docker run -d -p 3000:3000 \
-e PORT=3000 \
-e browserLimit=20 \
-e timeOut=30000 \
zfcsoftware/cf-clearance-scraper:latest