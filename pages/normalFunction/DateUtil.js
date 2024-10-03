function formatDate(isoString) {  
  // 创建一个Date对象，它会自动解析ISO 8601格式的字符串  
  const date = new Date(isoString);  

  // 检查日期是否有效  
  if (isNaN(date.getTime())) {  
      throw new Error('Invalid date string');  
  }  

  // 使用 padStart 方法来确保两位数的月份、日期、小时和分钟  
  const year = date.getFullYear();  
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth 返回的是0-11，所以需要+1  
  const day = String(date.getDate()).padStart(2, '0');  
  const hours = String(date.getHours()).padStart(2, '0');  
  const minutes = String(date.getMinutes()).padStart(2, '0');  
  const seconds = String(date.getSeconds()).padStart(2, '0');  

  // 拼接成所需的格式  
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;  

  return formattedDate;  
}  
module.exports = {
  formatDate
}