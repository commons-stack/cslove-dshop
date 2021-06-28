# How to push changes to production

This is the shortshort instruction on how to push changes to production for the
Commons Stack dShop instances. If you have more questions, please email
kristofer@fmckl.se or Telegram @kristoferkristofer.

## 1. Push code to github to build new Docker image

1. Push changes to `main` branch
2. Docker image is built on a
   [CD workflow Github](https://github.com/commons-stack/cslove-dshop/actions/workflows/dockerimage.yml)
3. Wait until build finishes, find published packages here:
   https://github.com/orgs/commons-stack/packages

## 2. Update Docker image on server

1. Go to devops folder `cd /apps/cs-dshop/devops`
2. Pull new docker image `docker pull ghcr.io/commons-stack/cslove-dshop:main`
3. Upgrade and restart containers `docker-compose up -d`

## 3. Publish shop changes in admin interface

1. Login to shop admin `https://ogn-rinkeby.commonsstack.org/#/admin``
2. Click `Publish Changes`
