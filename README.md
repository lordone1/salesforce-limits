# What is Salesforce Limits? 
![Salesforce Limits](./img/logo.png)

Salesforce is a [multitenant cloud solution](https://trailhead.salesforce.com/content/learn/modules/starting_force_com/starting_understanding_arch). This means that special attention must be paid to the different limits to avoid surprises.

You can find many of those limits spread out in the setup or leveraging the standard Salesforce API (tooling api, rest api or limit api). Wouldn't it be great to have a dashboard where you could check all these limits at a glance, without having to collect all this information on your own each time you need them? Well, that is exactly what Salesforce Limits does.

Salesforce Limits is a Chrome extension, which means you don't need to install anything in your org, just a chrome extension! With this extension you can build your own dashboards with a few clicks. Sounds good? Keep reading!

![](./img/app.png)

# Quick Start

Log into the org you want to analyze.

Click on the Salesforce Limits extension icon and introduce the Salesforce My Domain without specifying ``https://``. Example ``my-own-domain.my.salesforce.com``.

![](./img/salesforceextension2.png)

The extension comes with a default fantastic dashboard for you to use as a template. We encourage you to adapt the dashboard as each org is unique. Keep special attention to the limits you may have, as those could be different depending on the purchased Salesforce licenses.

# Things to know

- This extension has nothing to do with Salesforce, it is an external tool to help you on leverage the api to administer your limits.

- This extension is making usage of api calls. Salesforce has a governor limit that limits the number of api calls you can make against an org.

- The request is made under the context of the user logged in Salesforce. As this extension uses the api for collecting information, the user must have api permissions for this extension to work.

- This extension does not collect any information or send it to any third party. If you don't trust my word, take a look to the code, which is open source. 

# Sounds good! I want to customize the dashboard, how can I do it?

You are few minutes away of becoming a master using this extension! In the following sections you will understand the different reports you can build.

You can start by checking the ones created by default or directly create the ones you need from scratch. 

## Entering in edit mode
To edit the dashboard, click on the pencil icon at top right corner.

![Edit mode](./img/pencil.png)

Once in this mode, you can edit, delete or add components to the dashboard. After editing a dashboard, click on save or revert changes to exit the edit mode.

## Single Api Limit Report

This report type allows you to use the different metrics that the standard [Salesforce api limit](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_limits.htm) returns.

For example, you can build a report that shows the Data Storage  consumption:

![Salesforce Limits](./img/dataStorage.png)

For building this component you should create the report using this information:

![Salesforce Limits](./img/apilimitsusage.png)

The limit represents the Limit Label retrieved from the [Salesforce api limit](https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/resources_limits.htm).

See [Span](#Span)

See [Thresholds](#Span)

## Select Count Report

This report type is used when the metric can be extracted from a basic ``select count()``. This report admits just one query and one fixed limit. 

For example, you can create a report with the usage of permission sets:

![Permission Sets](./img/permset.png)

For building this report you should create it using this information:

![Permission Sets](./img/selectcountsingleusage.png)

The limit represents the total number of permission sets that can be created at any time in the org.

See [Span](#Span)

See [Thresholds](#Span)

See [Soql](#Soql)


## Multiple Select Count Report

This report type is similar to the last one, but allows you to use more than one SOQL. Use this report whenever you need to extract information from different objects and it makes sense to report them together. This report type shows a pie chart showing the distribution of each Select count.

For example, with this report type you may report how many rules you have in your org. As each rule must be extracted from different objects, you need to have different ``Select count`` for each rule:

![](./img/rules.png)

For building this component you should create the report using this information:

![](./img/multiple-select-count.png)

Each of these queries may need to be executed against the tooling api or Rest. You would need also to specify a label for the pie chart. All this is defined in the SOQL Series in a simple json format, where:
- label: is the label that will be shown in the pie chart.
- tooling option: if present, indicates that the SOQL query needs to be executed against the tooling api.
- soql: the SOQL to execute. This query needs to be a select count(), otherwise this report won't work.

See [Span](#Span)

See [Thresholds](#Span)

## Single Aggregated Report

This report type can be used when your metric is based on the number of records retrieved from a query. This report aggregates the number of records of each value.

For example, this query provides the fields that are having field history tracking active:

``SELECT EntityDefinitionId FROM FieldDefinition WHERE EntityDefinitionId in ('Account','Case','Contact','Lead','Opportunity') AND IsFieldHistoryTracked = true ``

With this report type you can create the following report:

![](./img/agg.png)

For building this report you should create it using this information:

![](./img/aggusage.png)

The limit is fixed for all records aggregated.

The Aggregate values by field name, specify the field over which the aggregation will be made.

See [Span](#Span)

See [Thresholds](#Span)

See [Soql](#Soql)

## Single Flexible Select Report

This report type can be used when your metric can be extracted with a single query, but you cannot use a select count. 

This report is very flexible and allows you to create a single report that summarizes other sub-reports.

For example, you can generate a report that shows the limits related to the object Account.

![](./img/account.png)

This report provides you several options to extract and transform the information:

### Limit - Fix Limit
This limit will set a fixed limit to all the records retrieved from DDBB. Use this limit when the limit is fixed and cannot be extracted from the SOQL.

### Limit - From SOQL
This limit lets you specify a field that will provide you the limit value. Use this limit when you can extract the value directly from the DDBB.

Example:

``SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Contact'``

In this query, the label Max provides you the limit. In this case, you can select from SOQL and set the limit with the value "Max", which makes reference to the field name.

![](./img/fromsoql.png)

### Limit - Map Limit
This limit lets you specify different limits related to values retrieved from DDBB. Use this limit whenever you have the label in the query, but cannot extract the limit.

Example:

``SELECT count(id),LicenseType from SandboxInfo group by LicenseType``

This provides you the number of sandboxes per license type. To assign a different limit per Sandbox info, you may define the following configuration for this limit:

![](./img/maplimit.png)

The values FULL, PARTIAL, etc., will match the label selected. The label must be from SOQL in this case.

### Label - Fix Label

Use this label type whenever you want to use the same label for all the metrics retrieved in the query.

### Label - From Soql

Use this label type whenever you want to use the label from a field in the query.

For example, in the following query:

``SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Contact'``

If you want to use the Label field retrieved in the query as the label, you should configure the limit as follows:

![](./img/labelfromsoql.png)



See [Span](#Span)

See [Thresholds](#Span)

See [Soql](#Soql)

See [Transformation](#Transformation)

## Transformation 

Use this section whenever the value is the result of the operation of several fields in the query.

For example, with the following query you may extract the different metrics related to the contact object:

``SELECT Label, Remaining, Max from EntityLimit where EntityDefinitionId ='Contact'``

The usage is the result of substract Max and Remaining. For making this transformation, use the following configuration:

![](./img/transformation.png)

## SOQL

The SOQL Section includes two fields:

- tooling Api: indicates whether or not the query should be executed against the tooling api.

- soql: the SOQL to execute.

![Thresholds](./img/soql.png)

## Span

Span indicates the width of the report. Each row is divided in 12 blocks. Creating a report with a span of 12 means that the whole row will be used by this report. Specifying a span of 6 will use the half, and so on.

## Thresholds

Thresholds indicate to the application how it should consider the information retrieved on each report. Each report is splitted in three segments: success, warning and danger. You should define as a percentage what value should be considered in each segment.

![Thresholds](./img/thresholds.png)



