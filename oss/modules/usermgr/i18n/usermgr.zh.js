define({
	USERMGR_EFF_DATE: "生效日期",
	USERMGR_EXP_DATE: "失效日期",
	USERMGR_EFF_NOW: "立即生效",
	USERMGR_RESET_PASSWD: "重置密码",
	USERMGR_SHOW_HIST: "显示用户历史",
	USERMGR_EXPORT: "导出",
	USERMGR_SEL_USER: "选择用户",

	USERMGR_IS_LOCKED: "是否锁定",
	USERMGR_DEFAULT_PORTAL: "默认门户",

	USERMGR_USER_NAME: "用户名称",
	USERMGR_USER_CODE: "用户编码",
	USERMGR_USER_STATE: "状态",
	USERMGR_LOGIN_FAIL: "登录失败",
	USERMGR_CONTACT_INFO: "联系方式",
	USERMGR_PHONE: "电话",
	USERMGR_EMAIL: "邮箱",
	USERMGR_ADD_USER_SUCCESS: "新增用户成功。",
	USERMGR_MOD_USER_SUCCESS: "修改用户成功。",
	USERMGR_DISABLE_USER_SUCCESS: "禁用用户成功。",
	USERMGR_ENABLE_USER_SUCCESS: "启用用户成功。",
	USERMGR_DISABLE_USER_SELF: "用户不能禁用自身",
	USERMGR_LOCK_USER_SELF: "用户不能锁定自身",
	USERMGR_LOCK_USER_CONFIRM: "确定要锁定用户吗？",
	USERMGR_LOCK_USER_SUCCESS: "锁定用户成功。",
	USERMGR_UNLOCK_USER_CONFIRM: "确定要解锁用户吗？",
	USERMGR_UNLOCK_USER_SUCCESS: "解锁用户成功。",
	USERMGR_RESET_PASSWD_CONFIRM: "确定要重置用户密码吗？",
	USERMGR_RESET_PASSWD_SUCCESS: "重置用户密码成功。",
	USERMGR_USER_CODE_CONTAINS_NUMBER_OR_CHAR: "用户编码必须包含数字或字母。",
	USERMGR_USER_CODE_CONTAINS_NUMBER_AND_CHAR: "用户编码必须包含数字和字母。",

	USERMGR_ROLE_OF_USER: "已经拥有的角色",
	USERMGR_USER_ROLE: "可以授权的角色",
	USERMGR_ROLE: "角色",
	USERMGR_ROLE_MGR: "用户角色管理",
	USERMGR_GRANT_ROLE_CONFIRM: "你确定要授权角色到用户吗？",
	USERMGR_GRANT_ROLE_SUCCESS: "授权角色给用户成功。",
	USERMGR_DEGRANT_ROLE_CONFIRM: "你确定要从用户中删除这些角色权限吗？",
	USERMGR_DEGRANT_ROLE_SUCCESS: "从用户中删除这些角色权限成功。",

	USERMGR_PORTAL_OF_USER: "已经拥有的门户",
	USERMGR_PORTAL: "可以授权的门户",
	USERMGR_PORTAL_MGR: "用户门户管理",
	USERMGR_GRANT_PORTAL_CONFIRM: "你确定要授权门户给用户吗？",
	USERMGR_GRANT_PORTAL_SUCCESS: "成功设置用户的门户权限。",
	USERMGR_DEGRANT_PORTAL_CONFIRM: "你确定要从用户中删除这些门户吗？",
	USERMGR_DEGRANT_PORTAL_SUCCESS: "从用户中删除这些门户成功。",
	USERMGR_PLS_SEL_PORTAL: "请选择默认门户。",
	USERMGR_ROLE_PORTAL: "角色门户",
	USERMGR_USER_PORTAL: "用户门户",
	USERMGR_EXISTED_IN_ROLE_PORTAL: "门户: {{_0}} 已经在用户角色对应的门户中存在。你确定依旧要添加这些门户给用户吗？",

	USERMGR_BY_PORTAL: "根据门户授权",
	USERMGR_BY_DIR: "根据目录授权",

	USERMGR_PORTAL_DIR_NAME: "门户目录名称",
	USERMGR_DIR_NAME: "目录名称",
	USERMGR_MENU_PRIV_MGR: "用户菜单权限管理",
	USERMGR_ADD_MENU_PRIV_SUCCESS: "成功添加用户界面菜单权限。",
	USERMGR_RM_MENU_PRIV_CONFIRM: "你确定要从用户中删除这些菜单权限吗？",
	USERMGR_RM_MENU_PRIV_SUCCESS: "从用户中删除这些菜单权限成功。",
	USERMGR_EDIT_PRIV_LEVEL_SUCCESS: "成功修改用户的菜单权限等级。",

	USERMGR_PORTAL_DIR_MENU_NAME: "门户目录菜单名",
	USERMGR_COMP_PRIV_MGR: "用户组件权限管理",
	USERMGR_ADD_COMP_PRIV_SUCCESS: "成功给用户增加组件权限。",
	USERMGR_RM_COMP_PRIV_CONFIRM: "你确定要把此权限从该用户中删除吗？",
	USERMGR_RM_COMP_PRIV_SUCCESS: "成功从用户删除此页面组件权限。",
	USERMGR_USER_PRIV_LEVEL: "权限级别",

	USERMGR_DATA_MGR: "新增数据权限到用户",
	USERMGR_OWNED_DATA_PRIV: "拥有的数据权限",
	USERMGR_UNOWNED_DATA_PRIV: "没有拥有的数据权限",
	USERMGR_GRANT_DATA_SUCCESS: "给用户增加数据权限成功。",
	USERMGR_RM_DATA_PRIV_CONFIRM: "你确定从当前的用户中删除此数据权限？",
	USERMGR_RM_DATA_PRIV_SUCCESS: "成功删除用户的数据权限。",
	USERMGR_PRIV_LEVEL: "权限级别",

	USERMGR_PORTLET_PRIV_MGR: "用户Portlet权限管理",
	USERMGR_BY_TYPE: "根据类型授权",
	USERMGR_TYPE_NAME: "类型名称",
	USERMGR_PORTLET_NAME: "Portlet名称",
	USERMGR_CLASS_NAME: "Class名称",
	USERMGR_ADD_PORTLET_PRIV_SUCCESS: "成功给用户增加Portlet权限.",
	USERMGR_RM_PORTLET_PRIV_CONFIRM: "确定要从该用户中删除Portlet权限吗？",
	USERMGR_RM_PORTLET_PRIV_SUCCESS: "成功从该用户中删除Portlet权限。",
	USERMGR_HOLD: "默认拥有",
	USERMGR_URL: "URL"
});