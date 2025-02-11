# reservation_miniapp
这是泥瓜考试报名小程序的第二版
## 网络接口
所有网络方法都采用POST方法
### 测试接口
"/ping" 测试服务器是否开启
### 竞赛信息上传
"/uploadsubjects" 数据类型为json，上传数据示例如下：
```
{
    "subjectId": "M01M12068", // 可以留空，留空就用md5生成
    "term": 202401, // 2024学年第一学期
    "type": 1, // 写1就行，别的不用管，我要用
    "subjectName": "程序设计校赛",
    "beginTime": 1730862919127, // 13位时间戳，表示开始报名时间
    "dueTime": 1730863045171, //截止报名时间
    "visibleTime": 1730763045171, // 开始可见时间
    "invisibleTime": 1730963045171 // 从该时间之后不可见
}
```
"/uploadexam" 数据类型为json，上传数据示例如下：
```
{
    "subjectId": ["M01M12068", "N01N12068"], // 不可以留空，会提供API获取
    "teacherId": "2000000000", // 管理教师的ID
    "location": "实验大楼B座-407", // 字符串
    "begintime": 1730963045171, // 时间戳
    "length": 3600000 // 单位毫秒
}
```
"/getsubjects" 数据可以留空，留空返回当前所有可见的竞赛科目，否则上传json，示例如下：
```
{
    "location": "实验大楼B座-407", // 竞赛地点
    "begintime": 1730963045171, // 竞赛开始时间
}
```
或者
```
{
    "examId": "examid"
}
```
返回值
```
{
    "subjects": [
        {
            "subjectId": "M01M12068",
            "term": 202401,
            "type": 1,
            "subjectName": "程序设计校赛",
            "beginTime": 1730862919127,
            "dueTime": 1730863045171,
            "visibleTime": 1730763045171,
            "invisibleTime": 1730963045171
            
        },
        {
            "subjectId": "M01M12068",
            "term": 202401,
            "type": 1,
            "subjectName": "程序设计校赛",
            "beginTime": 1730862919127,
            "dueTime": 1730863045171,
            "visibleTime": 1730763045171,
            "invisibleTime": 1730963045171
            
        }
    ]
}
```
优先识别examId \
"/getexams" 数据可以留空，留空返回所有，也可以上传科目ID，示例如下：
```
{
    "subjectId": "M01M12068"
}
```
"/getreg" 下载签到表，要求直接传入考场Id,数据示例如下：
```
{
    "examId": "examId",
    "teacherId": "2020000032"
}
```
