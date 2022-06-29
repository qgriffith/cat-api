# cat-api

Cloud Assest Tool Backend API

## How to run local Dev

### CloudQuery

- [Install Cloudquery and AWS Plugin](https://docs.cloudquery.io/docs/getting-started/getting-started-with-aws/)
- Login to at least one AWS Account on the CLI
- Update your `~/config.hcl` to include the names of the AWS profiles used on your local laptop. For example I am using appdev and cicd:

        // All Provider Configurations

        provider "aws" {
        configuration {
            // Optional, Repeated. Add an 'accounts' block for every account you want to assume-role into and fetch data from.
            // accounts "<UNIQUE ACCOUNT IDENTIFIER>" {
            // Optional. Role ARN we want to assume when accessing this account
            // role_arn = < YOUR_ROLE_ARN >
            // Optional. Named profile in config or credential file from where CQ should grab credentials
            // local_profile = < PROFILE_NAME >
            // }
            // Optional. by default assumes all regions
            // regions = ["us-east-1", "us-west-2"]
            // Optional. Enable AWS SDK debug logging.
            aws_debug = false
            // The maximum number of times that a request will be retried for failures. Defaults to 10 retry attempts.
            // max_retries = 10
            // The maximum back off delay between attempts. The backoff delays exponentially with a jitter based on the number of attempts. Defaults to 30 seconds.
            // max_backoff = 30
            accounts "appdev" {
            local_profile = "appdev"
            }
            accounts "cicd" {
            local_profile = "cicd"
            }
        }

### Install packages

```
npm install
```

### Create Database
This only needs to be done the first time using this project. It creates a docker container called cloud_postgress

```
npm run db:create
```

### Run Database

This will run the db in a docker container in the foreground

```
npm run db:start
```

### Run Application

```
npm run dev
```

### Seed Database

This only has to be done once

```
npm run seed
```

### Helpful Tools

- [Rest Client](https://insomnia.rest/)
- [Postgres GUI](https://www.pgadmin.org/)
