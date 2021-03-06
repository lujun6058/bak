package com.ztesoft.zsmart.oss.core.pm.bscreen.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.core.service.DynamicDict;
import com.ztesoft.zsmart.oss.opb.util.GeneralDAO;

/**
 * 
 * [描述] <br>
 * 
 * @author [刘宁]<br>
 * @version 1.0<br>
 * @taskId <br>
 * @CreateDate 2017年7月25日 <br>
 * @since V7.0<br>
 * @see com.ztesoft.zsmart.oss.core.pm.bscreen.dao <br>
 */
public abstract class BScreenMgrDao extends GeneralDAO<Object> {
    
    
    /**
     * 
     * [方法描述] <br> 
     *  
     * @author [刘宁]<br>
     * @taskId <br>
     * @return List<HashMap<String, String>>
     * @throws BaseAppException <br>
     */
    public abstract List<HashMap<String, String>> getSource()  throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param param 
     * @return map 
     * @throws BaseAppException
     *             <br>
     */
    public abstract Map<String, Object> getServerSkeleton(Map<String, String> param) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param dict 
     * @throws BaseAppException
     *             <br>
     */
    public abstract void saveOrUpdate(DynamicDict dict) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param topic_no 
     * @return boolean
     * @throws BaseAppException
     *             <br>
     */
    public abstract boolean isExistTopic(String topic_no) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param dict 
     * @throws BaseAppException
     *             <br>
     */
    public abstract void queryBScreenById(DynamicDict dict) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param userId 
     * @return list
     * @throws BaseAppException
     *             <br>
     */
    public abstract List<Map<String, Object>> queryBScreenListByUserID(Long userId) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param id 
     * @return boolean
     * @throws BaseAppException
     *             <br>
     */
    public abstract boolean deleteBScreenById(String id) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param param 
     * @return map
     * @throws BaseAppException
     *             <br>
     */
    public abstract Map<String, Object> getFields(Map<String, String> param) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param map 
     * @return map
     * @throws BaseAppException
     *             <br>
     */
    public abstract Map<String, Object> saveOrUpdateSourceService(Map<String, String> map) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param param 
     * @return map
     * @throws BaseAppException
     *             <br>
     */
    public abstract Map<String, Object> getSourceServiceList(Map<String, String> param) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br> 
     * @param param 
     * @return map
     * @throws BaseAppException
     *             <br>
     */
    public abstract Map<String, Object> getSourceServiceById(Map<String, String> param) throws BaseAppException;

    /**
     * 
     * [方法描述] <br>
     * 
     * @author [刘宁]<br>
     * @taskId <br>
     * @param param 
     * @return map
     * @throws BaseAppException
     *             <br>
     */
    public abstract Map<String, Object> delSourceServiceById(Map<String, String> param) throws BaseAppException;

    @Override
    public int delete(Object arg0) throws BaseAppException {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public int deleteById(String arg0) throws BaseAppException {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public void insert(Object arg0) throws BaseAppException {
        // TODO Auto-generated method stub

    }

    @Override
    public HashMap<String, String> selectById(String arg0) throws BaseAppException {
        return null;
    }

    @Override
    public int update(Object arg0) throws BaseAppException {
        // TODO Auto-generated method stub
        return 0;
    }

    /**
     * [方法描述] <br> 
     *  
     * @author [作者名]<br>
     * @taskId <br>
     * @return <br>
     */ 
    public abstract List<HashMap<String, String>> getApiSource() throws BaseAppException;

    /**
     * [方法描述] <br> 
     *  
     * @author [作者名]<br>
     * @taskId <br>
     * @param param
     * @return <br>
     */ 
    public  abstract Map<String, Object> getAPIField(Map<String, String> param)  throws BaseAppException;

    /**
     * [方法描述] <br> 
     *  
     * @author [作者名]<br>
     * @taskId <br>
     * @return <br>
     */ 
    public abstract List<Map<String, Object>> queryBScreenList()  throws BaseAppException;

    /**
     * [方法描述] <br> 
     *  
     * @author [作者名]<br>
     * @taskId <br>
     * @param taskid
     * @return <br>
     */ 
    public abstract String getTaskParam(String taskid)   throws BaseAppException;

    /**
     * [方法描述] <br> 
     *  
     * @author [作者名]<br>
     * @taskId <br>
     * @param filename
     * @param filePath
     * @param json
     * @return <br>
     */ 
    public  abstract String addMap(String filename, String filePath, String json) throws BaseAppException;

    /**
     * [方法描述] <br> 
     *  
     * @author [作者名]<br>
     * @taskId <br>
     * @param id
     * @return <br>
     */ 
    public abstract String getMap(String id) throws BaseAppException;

    /**
     * [方法描述] <br> 
     *  
     * @author [作者名]<br>
     * @taskId <br>
     * @param id
     * @return <br>
     */ 
    public abstract void  delMap(String id)  throws BaseAppException;

    /**
     * [方法描述] <br> 
     *  
     * @author [作者名]<br>
     * @taskId <br>
     * @return <br>
     */ 
    public abstract List<HashMap<String, String>> getMapList()  throws BaseAppException;

    /**
     * [方法描述] <br> 
     *  
     * @author [作者名]<br>
     * @taskId <br>
     * @param id
     * @param name
     * @return <br>
     */ 
    public abstract void  renameMap(String id, String name)   throws BaseAppException;
}
