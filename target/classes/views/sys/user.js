$(function() {
	$('#dee-datagrid-2').datagrid({
		url : '/user/userlist',
		loadFilter : pagerFilter,
		rownumbers : true,
		singleSelect : false,
		pageSize : 20,
		pagination : true,
		multiSort : true,
		fitColumns : true,
		fit : true,
		columns : [ [ 
			{checkbox : true}, 
			{field : 'userAccount',title : '登录帐号',width : 100}, 
			{field : 'userName',title : '姓名',width : 100}, 
			{field : 'password',title : '密码',width : 100}, 
			{field : 'phone',title : '电话',width : 100,align : 'right'}, 
			{field : 'email',title : '邮箱',width : 100}, 
			{field : 'registerDate',title : '注册日期',width : 100} 
		] ]
	});
});

/**
 * Name 添加记录
 */
function add() {
	$('#dee-form-2').form('submit', {
		url : '/user/addone',
		onSubmit : function() {
			var isValid = $(this).form('validate');
			if (!isValid) {
				$.messager.alert('操作提示', '请按要求填写内容', 'warnning');
			}
			return isValid; // 返回false终止表单提交
		},
		success : function(data) {
			if (data == "success") {
				$.messager.alert('操作提示', '添加用户成功！', 'info');
				$('#dee-dialog-2').dialog('close');
				reload();
			} else {
				$.messager.alert('操作提示', '添加用户失败！', 'error');
				reload();
			}
		}
	});
}

/**
 * Name 修改记录
 */
function edit() {
	$('#dee-form-2').form('submit', {
		url : '',
		success : function(data) {
			if (data) {
				$.messager.alert('信息提示', '提交成功！', 'info');
				$('#dee-dialog-2').dialog('close');
			} else {
				$.messager.alert('信息提示', '提交失败！', 'info');
			}
		}
	});
}

/**
 * Name 删除记录
 */
function remove() {
	$.messager.confirm('信息提示', '确定要删除该记录？', function(result) {
		if (result) {
			var items = $('#dee-datagrid-2').datagrid('getSelections');// 选择多条记录
			if (items.length == 0) {
				$.messager.alert('信息提示', '请至少选择一条数据！', 'error');
				return;
			}
			var ids = [];
			$(items).each(function() {
				ids.push(this.pk);
			});
			$.ajax({
				url : '/user/delete',
				type:'POST',
				data:{"pks":ids},
				success : function(data) {
					if (data) {
						$.messager.alert('信息提示', '删除成功！', 'info');
						reload();
					} else {
						$.messager.alert('信息提示', '删除失败，请联系管理员！', 'error');
						reload();
					}
				}
			});
		}
	});
}

/**
 * Name 打开添加窗口
 */
function openAdd() {
	$('#userAccount').attr('disabled',false);
	$('#userAccount').validatebox('reduce');
	$('#dee-form-2').form('clear');
	$('#dee-dialog-2').dialog({
		closed : false,
		modal : true,
		title : "添加信息",
		buttons : [ {
			text : '确定',
			iconCls : 'icon-ok',
			handler : add
		}, {
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
				$('.tooltip').hide();
				$('#dee-dialog-2').dialog('close');
			}
		} ]
	});
}

/**
 * Name 打开修改窗口
 */
function openEdit() {
	$('#userAccount').validatebox('remove');
	$('#dee-form-2').form('clear');
	var item = $('#dee-datagrid-2').datagrid('getSelected');// 多选也是选到一条记录
	if (item == null) {
		$.messager.alert('信息提示','请选择一条数据进行修改！','error');
		return;
	}
	//alert(item.productid);return;
	// 禁用userAccount
	//$('#userAccount').attr('disabled',true);
	
	//$('#userAccount').removeClass('easyui-validatebox');
	$.ajax({
		url : '/user/findone',
		data : {"pk" : item.pk},
		dataType : "json",
		success : function(data) {
			if (data == null) {
				$.messager.alert('信息提示','参数有误，请联系管理员！','error');
			} else {
				//绑定值
				$('#dee-form-2').form('load', data)
				$('#userAccount').attr('disabled',true);
				//$('#userAccount').removeAttr('data-options');
			}
		}
	});
	$('#dee-dialog-2').dialog({
		closed : false,
		modal : true,
		title : "修改信息",
		buttons : [ {
			text : '确定',
			iconCls : 'icon-ok',
			handler : edit
		}, {
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
				$('#dee-dialog-2').dialog('close');
			}
		} ]
	});
}

/**
 * 刷新datagrid
 */
function reload() {
	$('#dee-datagrid-2').datagrid('reload');//刷新
}

