## AUTHORIZATION CODE:

## GET:

accounts.google.com/o/oauth2/v2/auth?client_id=194208116299-gv3k0uldqhlpe6uq5o0n609gsqr85i2l.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fweeb-wear.vercel.app&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics.readonly&access_type=offline

## RESULT:

https://weeb-wear.vercel.app/?code=4%2F0AVG7fiS0yxjmY6HFqXv7EhDeyOsbrzUJpPpPf8kO6lFeoznLIFNRhhrhBDh5ozX3Xn5Ohg&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fanalytics.readonly

## CODE: 4/0AVG7fiTJc9EDiKa4JoKEry6-WlrC_qI9w9-uWz-AAWxbb-6T0AAuC_VSplXF4GLxreL_Wg

# REFRESH TOKEN: 1//03Ed1QCh2SrQNCgYIARAAGAMSNwF-L9Irs_1NIcwP2BO0UmEP-DZMvibdi9o0wL08cqj4mvmu5qb7n-4oqKgzPDpUVMn9349HU5k

## GENERATE ACCESS_TOKEN:

curl --location 'https://oauth2.googleapis.com/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=194208116299-gv3k0uldqhlpe6uq5o0n609gsqr85i2l.apps.googleusercontent.com' \
--data-urlencode 'client_secret=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' \
--data-urlencode 'refresh_token=1//03Ed1QCh2SrQNCgYIARAAGAMSNwF-L9Irs_1NIcwP2BO0UmEP-DZMvibdi9o0wL08cqj4mvmu5qb7n-4oqKgzPDpUVMn9349HU5k' \
--data-urlencode 'grant_type=refresh_token'
