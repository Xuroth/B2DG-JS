# B2DG-JS
Website for [Board2Death Games](https://board2deathgames.com/)

-----

Originally, I had begun developing this in CodeIgniter (PHP Framework) with MariaDB (see the project [here](https://github.com/Xuroth/B2DG)). It was prone to feature-creep and I got focused on ever-more abstract ways to complete simple tasks. I had worked on it for about 200-300 hours (mostly looking up concepts and debugging), and I had been _proud_ of my progress. One of my biggest issues was lack of knowledge of Javascript, and I was unable to do simple DOM manipulation without having at least mostly pre-written code. After Woz U, I learned how to build entire stacks in JS, and so revisited the project. Since I began working on it, this project has almost caught up to the previous one *in less than 20 hours*!

This site is built on NodeJS and uses Express for handling routing. The frontend is Handlebars-powered HTML (for templates, partials, and blocks support). The database layer is MongoDB using Mongoose. It is designed as a psuedo-CMS with built-in eCommerce functionality (coming soon).

The original specifications were to provide a more aesthetically-appealing experience for both customers and staff of B2D, along with some added functionality. The first website the group used was hosted and managed via a widely popular service and adding some basic functionality for business purposes was extremely difficult, despite the group paying a monthly subscription. This project attempts to address the issues by adding the capability to be expanded and customized without sacrificing scalability.

### Features
-----

#### Site Settings

The website admins can adjust core site settings, such as favicon, titlebar display, navigation menu and more without any knowledge of HTML. Building the basic functionality for this early allows me to code with that in mind, so additional settings will be available as I progress.

#### Role-based Permissions Implementation

I've leveraged PassportJS to build a authentication system (extremely basic at the time of writing) and I've built my own logic for authorization upon it. I use a hRBAC (hierarchical role-based access control) system. Each user is assigned a group, and the group has permission nodes. A resource can require a user to have either a specific group or a collection of permission nodes. A group can inherit from a lesser role (ex. a Moderator can inherit from User, therefore having all User permissions, plus special ones assigned only to Moderator).

Currently, the system will check if a role is required and whether the user is logged in and has the role, or inherits the role. If not, then the system proceeds to check if any permissions are required by the resource. If not, the user did not have the required role and is denied access. If there is an array of permission nodes that are required, the user's group, and all groups inherited from, are checked to see if they have the required nodes. If all nodes are accounted for, the user is granted access. This system requires a lot of refactoring to enhance the functionality and strip out some poorly-written code.

### To Do
---
- [ ] Authentication - adjust User schema (and frontend forms) to ask/store more specific information (instead of username/password only)
- [ ] Authentication - Adjust User schema to support OAuth tokens (login with Facebook, Google, etc)
- [ ] Communication - implement a method to send communications to customers/staff (email, possibly SMS)
  - [ ] Newsletter - Use styled templates and email to communicate news to customers
- [ ] Store - implement payment gateway(s). Currently, Stripe is being considered
- [ ] Store - implement paginated results for browsing and search
- [ ] Store - implement slug-style product lookup for seo-friendly URLs
- [ ] Admin - build admin panel to manage settings, products, users, newletters, etc.
- [ ] Deployment - Use a CI system along with cloud based hosting to live demo site
- [ ] Deployment - Use a reverse proxy/load balancer, and implement subdomain routing (for Admin panel)
- [ ] UI/UX - Improve aesthetics of site and focus on mobile display.
- [ ] Test all the things!!!

If you're reading this and want to suggest tips or feedback, 