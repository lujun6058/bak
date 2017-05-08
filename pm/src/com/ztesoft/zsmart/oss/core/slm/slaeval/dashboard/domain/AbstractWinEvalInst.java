package com.ztesoft.zsmart.oss.core.slm.slaeval.dashboard.domain;

import java.util.HashMap;
import java.util.List;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.core.service.DynamicDict;

/**
 * [描述] <br>
 * 
 * @author lwch <br>
 * @version 1.0<br>
 * @taskId <br>
 * @CreateDate 2016-9-18 <br>
 * @since V7.0<br>
 * @see com.ztesoft.zsmart.oss.core.slm.slaeval.dashboard.domain <br>
 */
public abstract class AbstractWinEvalInst {

    /**
     * [方法描述] <br>
     * 
     * @author lwch <br>
     * @taskId <br>
     * @param dict <br>
     * @return <br>
     * @throws BaseAppException <br>
     */
    public abstract HashMap<String, String> getSlaWinEvalOverview(DynamicDict dict) throws BaseAppException;

    /**
     * [方法描述] <br>
     * 
     * @author lwch <br>
     * @taskId <br>
     * @param dict <br>
     * @return <br>
     * @throws BaseAppException <br>
     */
    public abstract List<HashMap<String, String>> getSlaTrendWinEvalOverview(DynamicDict dict) throws BaseAppException;

    /**
     * [方法描述] <br>
     * 
     * @author lwch <br>
     * @taskId <br>
     * @param dict <br>
     * @return <br>
     * @throws BaseAppException <br>
     */
    public abstract List<HashMap<String, String>> getSlaWinEvalInst(DynamicDict dict) throws BaseAppException;
}