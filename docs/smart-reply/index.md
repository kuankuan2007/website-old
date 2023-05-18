# 智能回复

~~智障回复~~

## 致谢

这个人工智能系统基于其他大佬的以下三方库开发

+ sklearn:语义识别&决策树

+ jieba:中文的词语切割

在浅显的了解了基本原理之后本人对以上两个三方库的作者们深感敬佩~~(反正我是不可能有这么强的思维的)~~，感谢你们辛勤的劳作以及大方地将自己的成果给大家使用

## 基本原理

输入

jieba划分词语

sklearn.feature_extraction.text.CountVectorizer抓取特征词

sklearn.tree.DecisionTreeClassifier决策

输出结果

## 使用方式

```py
with open("model.pkl","rb") as m:
    modal=pickle.load(m)
with open("ai.pkl","rb") as m:
    ai=pickle.load(m)
text=input()
text="|".join(jieba.cut(text))
text=modal.transform([text])
result=ai.predict(aiVare)[0]
print(result)
```

## 训练方式

1. 将pd.DataFrame(pd.read_excel('example.xlsx'))修改成输入的数据表名称

2. 输入表格包括两列:
   
      1. 第一行为"input",以下内容为输入
   
      2. 第一行为"output",以下内容为输入对应的输出

## 声明

训练数据来源于网友日常聊天，与本人无关

## 关于作者

作者主页[宽宽2007](kuankuan2007.gitee.io "作者主页")

本项目在[苟浩铭/智能回复 (gitee.com)](https://gitee.com/kuankuan2007/smart-reply)上开源
