package com.ztesoft.zsmart.oss.itnms.host.util.zabbixapi;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;

public class RequestWithArrayParams {
	private String jsonrpc = "2.0";

	private String[] params = new String[]{};

	private String method;

	private String auth;

	private Integer id;

	public String getJsonrpc() {
		return jsonrpc;
	}

	public void setJsonrpc(String jsonrpc) {
		this.jsonrpc = jsonrpc;
	}

	public String[] getParams() {
		return params;
	}

	public void setParams(String[] params) {
		this.params = params;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getAuth() {
		return auth;
	}

	public void setAuth(String auth) {
		this.auth = auth;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return JSON.toJSONString(this);
	}
}
