angular.module('templates', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('authorization/templates/header.tpl.html',
    "<h3 class=\"pull-left\">Unauthorized Access</h3>"
  );


  $templateCache.put('authorization/templates/not-authorized.tpl.html',
    "<p>You are not allowed access to the page you requested.</p>"
  );


  $templateCache.put('dashboard/templates/dashboard.tpl.html',
    "<div>This is a Dashboard.</div>"
  );


  $templateCache.put('layouts/templates/single-column.tpl.html',
    "<div class=\"col-xs-12 content-wrap\" ui-view=\"main\"></div>"
  );


  $templateCache.put('layouts/templates/three-column.tpl.html',
    "<sidebar></sidebar><div class=\"col-xs-12 col-sm-9 col-lg-10 content-wrap\"><div class=\"row header-wrap\"><div class=\"col-xs-12 col-sm-6 title-wrap\"><div ui-view=\"header\"></div></div><div class=\"col-sm-6 hidden-xs search-wrap\"><search-widget></search-widget></div></div><div class=\"row content\"><div class=\"col-xs-12\" ui-view=\"main\"></div></div></div>"
  );


  $templateCache.put('layouts/templates/two-column.tpl.html',
    "<sidebar></sidebar><div class=\"col-xs-12 col-sm-9 col-md-10 content-wrap\"><div class=\"row header-wrap\"><div class=\"col-xs-12 col-sm-5 col-md-4 title-wrap\"><div ui-view=\"header\"></div><button class=\"btn btn-default pull-right visible-xs btn-search\"><span class=\"glyphicon glyphicon-search\"></span></button></div><div class=\"col-sm-5 col-sm-offset-2 col-md-offset-3 hidden-xs search-wrap\"><search-widget></search-widget></div></div><div class=\"row content\"><div class=\"col-xs-12\" ui-view=\"main\"></div></div></div>"
  );


  $templateCache.put('sign-in/templates/sign-in.tpl.html',
    "<form class=\"form-signin\" role=\"form\" novalidate><h2 class=\"form-signin-heading\">Please sign in</h2><input type=\"username\" class=\"form-control\" placeholder=\"Username\" data-ng-model=\"login.username\" required autofocus> <input type=\"password\" class=\"form-control\" placeholder=\"Password\" data-ng-model=\"login.password\" required><div class=\"checkbox\"><label><input type=\"checkbox\" value=\"remember-me\"> Remember me</label></div><div class=\"alert alert-danger\" data-ng-show=\"error\"><p>{{error}}</p></div><notification-widget filter-by=\"notificationFilter\"></notification-widget><button class=\"btn btn-lg btn-primary btn-block\" data-ng-click=\"signin()\">Sign in</button></form>"
  );


  $templateCache.put('user/templates/context-add.tpl.html',
    "<a class=\"btn btn-primary\" ui-sref=\"three-column.user.list.create\" tooltip=\"Create User\" tooltip-append-to-body=\"true\"><i class=\"fa fa-plus\"></i></a>"
  );


  $templateCache.put('user/templates/create.tpl.html',
    "<notification-widget filter-by=\"notificationFilter\" design=\"'bar'\"></notification-widget><div class=\"detail\"><form role=\"form\"><div class=\"form-group\"><label for=\"inputFirstName\">First Name</label><input type=\"text\" class=\"form-control\" id=\"inputFirstName\" placeholder=\"First Name\" data-ng-model=\"user.name.first\"></div><div class=\"form-group\"><label for=\"inputLastName\">Last Name</label><input type=\"text\" class=\"form-control\" id=\"inputLastName\" placeholder=\"Last Name\" data-ng-model=\"user.name.last\"></div><div class=\"form-group\"><label for=\"inputEmail\">Email</label><input type=\"text\" class=\"form-control\" id=\"inputEmail\" placeholder=\"Email\" data-ng-model=\"user.email\"></div><div class=\"form-group\"><label for=\"inputUsername\">Username</label><input type=\"text\" class=\"form-control\" id=\"inputUsername\" placeholder=\"Username\" data-ng-model=\"user.username\"></div><div class=\"form-group\"><label for=\"inputPassword\">Password</label><input type=\"password\" class=\"form-control\" id=\"inputPassword\" placeholder=\"Password\" data-ng-model=\"user.password\"></div><div class=\"row\"><div class=\"col-xs-12\"><h5 class=\"pull-left\">Role <span data-ng-if=\"role.name\">- {{role.name|inflector:humanize}}</span></h5><div class=\"btn-group pull-right\" dropdown><button class=\"btn btn-default btn-sm dropdown-toggle\">Predefined Roles <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" role=\"menu\"><li data-ng-repeat=\"role in roles\"><a data-ng-click=\"selectRole(role)\">{{role.name|inflector:humanize}}</a></li></ul></div></div></div><div class=\"row\"><div class=\"col-xs-12\">Permissions</div></div><div class=\"row permission-row\" data-ng-repeat=\"resource in resources\"><div class=\"col-xs-4\"><p>{{resource.split('-').join(' ')|inflector:humanize}}</p></div><div class=\"col-xs-8\"><label><input type=\"checkbox\" data-ng-model=\"user.permissions[resource].read\">View</label><label><input type=\"checkbox\" data-ng-model=\"user.permissions[resource].create\">Create</label><label><input type=\"checkbox\" data-ng-model=\"user.permissions[resource].update\">Modify</label><label><input type=\"checkbox\" data-ng-model=\"user.permissions[resource].delete\">Delete</label></div></div></form></div><div class=\"form-group form-actions clearfix\"><button class=\"btn btn-default pull-left\">Cancel</button> <button class=\"btn btn-primary pull-right\" data-ng-click=\"create()\">Create</button></div>"
  );


  $templateCache.put('user/templates/header.tpl.html',
    "<h3 class=\"pull-left\">Users</h3><button class=\"btn btn-primary pull-left\" ui-sref=\"three-column.user.list.create()\"><i class=\"fa fa-plus\"></i> Add New</button>"
  );


  $templateCache.put('user/templates/index.tpl.html',
    "<div class=\"row\" ui-view=\"list\"></div>"
  );


  $templateCache.put('user/templates/list.tpl.html',
    "<div class=\"col-xs-12 col-sm-5 col-md-3 lister-wrap\"><div class=\"lister\"><ul class=\"list-unstyled\"><li data-ui-route=\"/user/{{user._id}}/modify\" data-ng-class=\"{active:$uiRoute}\" data-ng-repeat=\"user in users\"><a ui-sref=\".modify({id: user._id })\">{{user.name.first}} {{user.name.last}}</a></li></ul></div></div><div class=\"hidden-xs col-sm-7 col-md-9 detail-wrap\" ui-view=\"detail\"></div>"
  );


  $templateCache.put('user/templates/modify.tpl.html',
    "<notification-widget filter-by=\"notificationFilter\" design=\"'bar'\"></notification-widget><div class=\"detail\"><form role=\"form\"><div class=\"form-group\"><label for=\"inputFirstName\">First Name</label><input type=\"text\" class=\"form-control\" id=\"inputFirstName\" placeholder=\"First Name\" data-ng-model=\"user.name.first\"></div><div class=\"form-group\"><label for=\"inputLastName\">Last Name</label><input type=\"text\" class=\"form-control\" id=\"inputLastName\" placeholder=\"Last Name\" data-ng-model=\"user.name.last\"></div><div class=\"form-group\"><label for=\"inputEmail\">Email</label><input type=\"text\" class=\"form-control\" id=\"inputEmail\" placeholder=\"Email\" data-ng-model=\"user.email\"></div><div class=\"form-group\"><label for=\"inputUsername\">Username</label><input type=\"text\" class=\"form-control\" id=\"inputUsername\" placeholder=\"Username\" data-ng-model=\"user.username\"></div><div class=\"form-group\"><label for=\"inputPassword\">Password</label><input type=\"password\" class=\"form-control\" id=\"inputPassword\" placeholder=\"Password\" data-ng-model=\"user.password\"></div><div class=\"row\"><div class=\"col-xs-12\"><div class=\"role-header clearfix\"><h5 class=\"pull-left\">Role <span data-ng-if=\"role.name\">- {{role.name|inflector:humanize}}</span></h5><div class=\"btn-group pull-right\" dropdown><button class=\"btn btn-default btn-sm dropdown-toggle\">Predefined Roles <span class=\"caret\"></span></button><ul class=\"dropdown-menu\" role=\"menu\"><li data-ng-repeat=\"role in roles\"><a data-ng-click=\"selectRole(role)\">{{role.name|inflector:humanize}}</a></li></ul></div></div></div></div><div class=\"row\"><div class=\"col-xs-12\"><h5 class=\"perm-header\">Permissions</h5></div></div><div class=\"row permission-row\" data-ng-repeat=\"resource in resources\"><div class=\"col-xs-12 col-sm-5 col-md-3\"><p class=\"role-label\">{{resource.split('-').join(' ')|inflector:humanize}}</p></div><div class=\"col-xs-12 col-sm-7 col-md-9\"><label><input type=\"checkbox\" data-ng-model=\"user.permissions[resource].read\">View</label><label><input type=\"checkbox\" data-ng-model=\"user.permissions[resource].create\">Create</label><label><input type=\"checkbox\" data-ng-model=\"user.permissions[resource].update\">Modify</label><label><input type=\"checkbox\" data-ng-model=\"user.permissions[resource].delete\">Delete</label></div></div></form></div><div class=\"form-group form-actions clearfix\"><button class=\"btn btn-default pull-left\">Cancel</button> <button class=\"btn btn-primary pull-right\" data-ng-click=\"save()\">Save</button> <button class=\"btn btn-danger pull-right margin-right\" data-ng-click=\"delete()\">Delete</button></div>"
  );


  $templateCache.put('user/templates/profile-widget.tpl.html',
    "<div class=\"profile-container clearfix\"><div class=\"inner-profile\"><a class=\"sign-out\" ui-sref=\"single-column.sign-out()\" tooltip=\"Sign Out\" tooltip-append-to-body=\"true\" tooltip-placement=\"bottom\"><i class=\"fa fa-sign-out\"></i></a><p class=\"welcome-text\">Welcome, <span>{{identity.name.first}} {{identity.name.last}}</span></p></div><div class=\"profile-role\"><h3>{{identity.role.name}}</h3></div></div>"
  );

}]);
