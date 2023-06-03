# 文件夹比对

## <mark>警告:本项目已经废弃，其功能被doFolder替代</mark>

- [宽宽的帮助文档 (gitee.io)](https://kuankuan2007.gitee.io/docs/do-folder/)
- [文件夹管理: 基于python的文件夹管理库 (gitee.com)](https://gitee.com/kuankuan2007/do-folder)
- [doFolder · PyPI](https://pypi.org/project/doFolder/)

## 目的

自动比对、同步两个文件夹

## 说明

这个项目是本人很早以前写的工具包文件夹自动更新程序的升级版

理论上支持任意两个文件夹，不确定有没有bug

## 扫描完成后的指令

命令格式:**命令/空格/选择器**

+ 命令有如下几种(不分大小写):
  
     + copy:将符合选择器的项目移入Copy
     + none:将符合选择器的项目移入None
     + delete:将符合选择器的项目移入Delete
     + 以上三个命令不会对[Copyed,Deleted,Errow]中的项目进行操作
     + help:显示此帮助菜单
     + exit 退出程序
     + choo:仅展示选择器结果，不进行操作
     + execute:按每个项目的类别进行操作
     + cls:清屏

+ 选择器(区分大小写)：
  
     + 选择器本质是一个集合，以{}包括
  
     + **有如下特殊定义(以#开头全部大写)**：
  
     + \#ALL:全集
       
          + \#NAME("s"):名字是s的项目组成的集合
          + \#TYPE("s"):种类是s的项目组成的集合
          + \#ROOTPATH("s"):根目录是s的项目组成的集合
          + \#WAY("s"):处理方式是s的项目组成的集合

+ 集合的运算:
  
     + A交B A&B
     + A并B A|B
     + B关于A的补集 A^B

+ 示例:
  
     + {0,1,2,3}编号为1、2、3的项目
     + \#NAME("\py3.8") 名字为\py3.8\的项目
     + \#ALL^#NAME("\py3.8") 名字不是\py3.8\的项目

## 作者

kuankuan2007([个人主页](https://kuankuan2007.gitee.io))

本项目在[文件夹同步: 自动同步两个文件夹的文件 (gitee.com)](https://gitee.com/kuankuan2007/folder-synchronization)上开源
