package com.ztesoft.zsmart.oss.core.pm.report.collect.domain;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.core.service.DynamicDict;

/**
 * 
 * 网元健康度专题的DOMAIN抽象类 <br> 
 *  
 * @author Srd <br>
 * @version V8.0.1<br>
 * @CreateDate 2017-8-31 <br>
 * @since JDK7.0<br>
 * @see com.ztesoft.zsmart.oss.core.pm.report.collect.domain <br>
 */
public abstract class AbstractCollectInfo {

    /**
     * 
     * 查询组配置信息 <br> 
     *  
     * @author Srd <br>
     * @param dict <br>
     * @throws BaseAppException <br>
     */
    public abstract void getCollectInfo(DynamicDict dict) throws BaseAppException;
     
}
