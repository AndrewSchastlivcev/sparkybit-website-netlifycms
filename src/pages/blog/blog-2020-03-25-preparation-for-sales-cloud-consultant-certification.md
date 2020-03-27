---
templateKey: blog-post
title: Preparation for Service Cloud Consultant certification
date: 2020-03-25T11:29:27.855Z
featuredpost: true
featuredimage: /img/salesforce.png
tags:
  - salesforce
---
Hello, reader!

If you ever thought about whether to get the status of a certified Consultant for Service Cloud, then this article is a short overview of those issues that you should pay attention to.

#### **What fantastic beast are you, Service Cloud?**

Salesforce Service Cloud is the cloud solution for managing and organizing work processes in service offices, places and centers. And a “bit” more. More - in the sense of managing and organizing any processes related to everything that belongs to scary words like Support, Call/Contact center.\
\
According to [the official document](https://trailhead.salesforce.com/help?article=Salesforce-Certified-Service-Cloud-Consultant-Exam-Guide) provided by Salesforce, all exam questions are divided into several thematic blocks:

* Industry Knowledge: 10%
* Implementation Strategies: 15%
* Service Cloud Solution Design: 16%
* Knowledge Management: 9%
* Interaction Channels: 10%
* Case Management: 15%
* Contact Center Analytics: 5%
* Integration and Data Management: 5%
* Service Console: 15%

You have 105 minutes for the whole exam. The price for the first attempt is 200 USD and respectively 100 USD for each next.

From my personal experience of preparation for obtaining this certificate, the official trailmix turned out to be very very[ useful](https://trailhead.salesforce.com/users/strailhead/trailmixes/prepare-for-your-salesforce-service-cloud-consultant-credential).

##### **What points you should especially pay attention to:**

**KPIs and metrics** (a series of questions, which solutions from the proposed list should be applied to increase one or another indicator of the Call Center performance in general or an individual agent in particular; such questions will most likely be present at your exam). In the official trail mix, part of these indicators is considered directly in the thematic modules, you will have to guess the part from the context. It is also very useful to get acquainted with the tools for enhancing these same KPIs & metrics.

**Omni-Channel, Entitlements, Milestones** (you need to know the features, the general bunch of tools, how and why it works exactly, in which business scenarios it is applicable)

**Knowledge, Knowledge Management**

**Service Console** (what can be added and what settings it allows)

**What Case is** (a bunch of Communities, Live Agent, Web-to-Case, Email-to-Case, Social Media Cases, Omni-Channels, customers SLA’s, Milestones etc.)

But don't be upset! Super badge is here to help us!

[Superbadge Service Cloud admin specialist](https://trailhead.salesforce.com/content/learn/superbadges/superbadge-service-cloud-admin-specialist)\
\
Passing is highly recommended, as this is one of those super-badges that really reveal all the subtleties of the knowledge gained in a practical aspect. This means the skills acquired with a super-badge have a very beneficial effect on the chances of completing the test successfully from the first time.

It would also be nice to get acquainted with [Field Service Lightning](https://trailhead.salesforce.com/en/content/learn/modules/field_service_basics). Yes, this is a completely different certification.But the questions related to this Field Service chapter from your Salesforce pathway occur very often at the Service Cloud exam (based on a practical experience of passing Service Cloud certification).Know the enemy (subject) better BEFORE the actual exam. After - it may turn out to be more expensive (not figuratively).

Examples of questions:

**1. Knowledge articles migration lifecycle:**

* **plan prepare test execute validate**
* prepare plan execute test validate
* plan prepare validate execute test
* prepare validate plan execute test

Any migration (and not only) at the very beginning should go through the planning stage, then, in accordance with an existing plan, preparations should be made (for example, standardization of existing articles), then test upload with checking results and fixing bugs, then production upload with validation.

**2. What method can be used to route cases from social channels?**

* Social Network Profile + workflow rules on contact
* Social Network Profile + assignment rules on case
* **Enable Social Customer Service + assignment rules on the case object.**
* Twitter-to-case + workflow rules on case

The broadest coverage of social channels is with Social Customer Service.

**3. Agents must not take ownership on new cases personally and cases must be assigned in order they come to Service-centre and not overflow agents, how to implement:**

* Omni-chanel + least active case distribution
* **Omni-chanel + most available case distribution**
* Queues + assignment rules
* Queues + workflow rules

Without custom starship-building, our beloved Queues do not allow us to evaluate the agent’s workload, not to disturb him over trifles like personal clicks on changing ownership, but in Omni-Chanel this hyperdrive was laid down initially + see [Omni-Chanel routing models.](https://help.salesforce.com/articleView?id=service_presence_routing_options.htm&type=5)

**4. After implementation and configuration of chat for customer community, employee users can’t see chat button in footer of Service console:**

* add permission set for visibility of chat accept button and assign it to employee users;
* add permission set for chat using and assign it to employee users;
* assign users to chat Public groups
* **assign chat feature licenses to users**\
  (Let's just leave [it](https://help.salesforce.com/articleView?id=live_agent_create_users.htm&type=0) here)