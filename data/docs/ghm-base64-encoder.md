# GHM-BASE64编码器

帮助网络文化的传播

## GHM-BASE64文件格式

默认后缀为 **.GHMBASE64**

可以标注文件名、数据类型等

### 标识符说明

+ \#开头的行是标注行,不能解码

+ 头部标识 **\#SAVING WITH GHM-BASE64**

+ 类型标识符
  
     + 文件 **\#FILE[|文件名]**
  
     + 文本 **\#TEXT**

+ 尾部标识符 **\#END OF DOCUMENT**

### 参考格式:

\#SAVING WITH GHM-BASE64 <mark>头部标注行</mark>

\#FILE|example.png                  <mark>名字叫example.png的文件</mark>

ABC                                              <mark>数据块1</mark>

\#FILE                                            <mark>未指定名字的文件将会在解码时询问</mark>

ABC                                              <mark>数据块2</mark>

\#TEXT                                          <mark>纯文本</mark>

ABC                                              <mark>数据块3</mark>

\#END OF DOCUMENT              <mark>尾部标注行

## 软件使用

支持文本、选择文件、拖拽文件、拖拽文件给exe(作为启动参数)打开

文件会要求选择保存文件夹

## 关于作者

作者[宽宽2007](kuankuan2007.gitee.io "作者主页")

本项目在[苟浩铭/ghm-base64编码器 (gitee.com)](https://gitee.com/kuankuan2007/ghm-base64-encoder)上开源
