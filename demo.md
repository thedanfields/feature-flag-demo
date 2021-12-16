## demo agenda
* why ?
* how ?
* how much ?

### why ?
* quickly adjust application behavior
  * by user in some cases
* intentionally seal off application code from being exercised until ready

### how ?
[eat at taco sack](http://ec2-54-173-137-190.compute-1.amazonaws.com/)

### overhead ?
* Yet Another System (say no to YAS?)
* additional PR's to remove stale feature flags

##### [aws app config](https://console.aws.amazon.com/systems-manager/appconfig/home?region=us-east-1#)
* 👍. new offering from our PAAS 
* 👎. beta level support & features
* depends on aws's cli

##### [unleash](https://github.com/Unleash/unleash)
* open source w/paid pro & enterprise tiers
* 👍. good smattering of features
* self hosted & hosted options

##### [launch darkly](https://app.launchdarkly.com/default/production/features)
* hosted only
* 👍. feature rich
* 👎. expensive


### how much ?
|option|price info|
|---|---|
|[aws](https://aws.amazon.com/config/pricing/)| based on the number of configuration items recorded, the number of active AWS Config rule evaluations and the number of conformance pack evaluations in your account|
|[unleash](https://www.getunleash.io/plans) | open source : free but self hosted |
| | pro : $80 / month with 5 seats|
| | enterprise : $$$ / not listed | 
|[launch darkly](https://launchdarkly.com/pricing/?) | starter = 8.33 seat / month|
| | pro : 16.67 seat / month |
| | enterprise : $$$ seat / month |
