package com.ztesoft.zsmart.oss.core.pm.bscreen.util;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import com.ztesoft.zsmart.core.exception.BaseAppException;
import com.ztesoft.zsmart.core.service.DynamicDict;
import com.ztesoft.zsmart.core.utils.DateUtil;
import com.ztesoft.zsmart.oss.opb.util.SeqUtil;

import sun.misc.BASE64Decoder;

public class BScreenUtil {
	
  public static  List<String> splitByNumbers(String text,int number){
	    List<String> strings = new ArrayList<String>();
		int index = 0;
		while (index < text.trim().length()) {
		    strings.add(text.substring(index, Math.min(index + number,text.length())));
		    index += number;
		}
		return strings;
  }
  public static String toString(Object o) throws BaseAppException{
	  String temp = o+"";
	  return temp.trim();
  }
  
  public static String getSeq(String paramString ) throws BaseAppException {
      String codePrefix  = "PMS";
      StringBuffer seq = new StringBuffer(SeqUtil.getSeq(paramString));
      while (seq.length() < 6) {
          seq.insert(0, "0");
      }
      String adapterNo = codePrefix + "_" + DateUtil.date2String(new Date(), DateUtil.DATETIME_FORMAT_2) + "_" + seq;
      return adapterNo;
  }
  
  public static HashMap<String, Object> toConvert(HashMap<String, String> topic) {
	  HashMap<String, Object>  map = new HashMap<String, Object>();
	 for (String key:topic.keySet()){
		 String hump= toHump(key);
		 String value=toNULL(topic.get(key),"");
		 map.put(hump,value);
	 }
	return map;
  }
  
  private static String toNULL(String value, String value2) {
		if(value==null || "".equalsIgnoreCase(value)||"null".equalsIgnoreCase(value)){
		 return value2;
		}
		return value;
  }
private static String toHump(String key) {
	  String[] keys=key.split("_");
	  StringBuffer sb = new StringBuffer();
	  for (int i=0;i<keys.length;i++){
		  String keypart =keys[i];
		  if(i==0){
			  sb.append(keypart.toLowerCase());
		  }else{
			  
			  sb.append(keypart.substring(0, 1).toUpperCase());
			  sb.append(keypart.substring(1, keypart.length()).toLowerCase());
		  }
	  }
	return sb.toString();
  }
public static Map Dic2Map(DynamicDict dynamicDict) {
	 Map map =new HashMap();
	 for ( String key :dynamicDict.valueMap.keySet()){
		 Object value =dynamicDict.valueMap.get(key);
		 if (value instanceof  DynamicDict){
			 map.put(key, BScreenUtil.Dic2Map((DynamicDict)value));
		 }else
		 {
			 map.put(key,value);
		 }
		 
	 }	
	 return map;
}
public static List<Map<String, Object>> toConvert(List<HashMap<String, String>> list) {
	List<Map<String, Object>>  newlist= new ArrayList<Map<String,Object>>();
	for (HashMap<String, String> map :list){
		HashMap<String, Object> bean =toConvert(map);
		newlist.add(bean);
	}

	return newlist;
}
public static String saveImage(File dirs,String base64, String topicId) {
	try {
		String base64Image = base64.split(",")[1];
		BufferedImage image = null;
		byte[] imageByte;
		BASE64Decoder decoder = new BASE64Decoder();
		imageByte = decoder.decodeBuffer(base64Image);
		ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
		image = ImageIO.read(bis);
		bis.close();
		File outputfile = new File(dirs.getAbsolutePath()+"/"+topicId+".png");
		ImageIO.write(image, "png", outputfile);
		return outputfile.getName();
	}catch(Exception e){
		e.printStackTrace();
		return null;
	}
}





}
