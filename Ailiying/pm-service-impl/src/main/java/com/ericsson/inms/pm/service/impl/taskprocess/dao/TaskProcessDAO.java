package com.ericsson.inms.pm.service.impl.taskprocess.dao;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.oss.opb.base.jdbc.GeneralDAO;
import com.ztesoft.zsmart.oss.opb.base.jdbc.ParamArray;

public abstract class TaskProcessDAO extends GeneralDAO {
	private static final long serialVersionUID = 1L;
	public abstract String exportExcel(List<Map<String, Object>> colModel, String runSql, ParamArray params) throws BaseAppException ;
	public abstract JSONObject addExportTask(JSONObject dict) throws BaseAppException;
	public abstract JSONObject exportTasklist(JSONObject dict)  throws BaseAppException;
	public abstract JSONObject getDataExpParam(JSONObject dict) throws BaseAppException;
	public abstract void savefilePath(JSONObject dict) throws BaseAppException;
	public abstract String getParamter(String key) throws BaseAppException;
	public abstract JSONObject getDelList(String day) throws BaseAppException;
	public abstract boolean delDataExpLogById(String id) throws BaseAppException;

}
