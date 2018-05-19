<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt_rt"%> 
<%
String path = request.getContextPath();
request.setAttribute("path", path);
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<link rel="stylesheet" type="text/css" href="${path}/easyui/1.3.4/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="${path}/css/dee.css" />
<link rel="stylesheet" type="text/css" href="${path}/css/icon.css" />
<script type="text/javascript" src="${path}/js/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="${path}/easyui/1.3.4/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${path}/easyui/1.3.4/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${path}/js/validatetype.js"></script>
<script type="text/javascript" src="${path}/js/pagerFilter.js"></script>
<!--  
<script type="text/javascript" src="js/system/forbiddenutil.js"></script>
-->
