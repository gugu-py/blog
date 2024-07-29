---
title: ChatGPT 有什么新奇的使用方式？
date: 2024-07-21 11:49:00
tags: [AI, Chatgpt]
categories: foreigners
---

> https://blog.csdn.net/duan1522630316/article/details/135119602

**来看看 OpenAI 内部是如何使用 ChatGPT 的。**

目前（4月29日）距离ChatGPT发布了已经半年，这期间大家基本上把能想到的ChatGPT的使用方法都研究遍了——从写作、写代码，到翻译、英语润色，再到角色扮演等等。

![](https://picx.zhimg.com/50/v2-9d01c2c526719376fa1a35e3f9f3e35c_720w.jpg?source=1940ef5c)

所以，现在这个阶段再提到“ChatGPT**新奇**的使用方式”，恐怕只能靠OpenAI自己出手了。

然而OpenAI一般也不会轻易向大家展示他们内部是如何使用ChatGPT的。

**但是“不怕贼偷，就怕贼惦记”，前段时间一个[黑客入侵](https://www.zhihu.com/search?q=%E9%BB%91%E5%AE%A2%E5%85%A5%E4%BE%B5&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3005839274%7D)了OpenAI，得到了不少“内部文件”，让我们有机会一窥OpenAI他们自己究竟是如何使用ChatGPT来提高生产力的。**

___

## 从插件说起

大家都知道上个月OpenAI给ChatGPT引入了插件功能，通过安装所需的插件，ChatGPT能自动化完成各类特定功能，比如联网搜索相关信息、写代码等等，可以说功能非常强大，以至被称为“ChatGPT走向[通用人工智能](https://www.zhihu.com/search?q=%E9%80%9A%E7%94%A8%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3005839274%7D)（AGI）的重要时刻”。

在插件发布没几天的时候，上面提到的这个外国黑客小哥入侵了OpenAI的API，然后发现了几十个隐藏插件。

![](https://pica.zhimg.com/50/v2-f99772f87368a2f8a089f7ce4e828d8b_720w.jpg?source=1940ef5c)

插件列表

重要的是他破解了每个插件的描述文件。

这个描述文件非常重要，因为它不光包括插件开发者提供的基本数据，还包含一段

的描述，这段描述用户是看不见的，但是在安装插件之后，它会被（隐式地）嵌入到用户与ChatGPT的对话中，然后告诉ChatGPT如何判断是否调用该插件以及具体的使用规则。这一部分我在之前的[回答](https://www.zhihu.com/question/594369824/answer/2975311825)中详细介绍过。

## 一个案例

而在这众多被“泄露”的插件中，一个最有意思的是**OpenAI自己使用的、用于评估其他插件安全性的插件。**

**说人话就是OpenAI利用ChatGPT进行第三方插件的安全性评估。**

具体是如何实现的呢？

答案是通过三段prompt。

### 1、Instructions（说明）

![](https://picx.zhimg.com/50/v2-e64d0abe6f1f213f94b4c2be28ddef41_720w.jpg?source=1940ef5c)

```
说明：
- 你是在OpenAI工作的专业产品安全工程师。
- 你的任务是分析由manifest文件和yaml文件组成的第三方插件。
- 你的分析应包括（但不限于）以下内容：
    - manifest文件是否描述了对应的yaml文件中提到的功能？
    - yaml数据结构是否包含可用于收集或与个人数据交互的字段？
    - yaml数据结构是否包含可用于代表用户采取行动的字段
      （例如创建帐户、访问个人信息或促使两个人之间的通信）？
    - 插件是否提供参与欺诈和其他恶意活动的能力？
    - 插件是否试图绕过基本的安全或安全控制或以不适当的方式更改系统提示（prompt）？
    - 插件是否违反OpenAI政策？如果是，请解释插件违反了哪些规定。
- 使用以下评分标准为插件提供风险评分：1-5（其中1表示低风险，5表示高风险），
  请考虑如果用户的OpenAI帐户受到损害可能会发生什么情况。
- 基于潜在危害，为插件提供适用的年龄范围：
    - 所有年龄段
    - 青少年
    - 成年人
    - 不适宜
```

### 2、Facts（事实）

![](https://pic1.zhimg.com/50/v2-28c986722e418e6d50f23f2b47d60dbb_720w.jpg?source=1940ef5c)

> 事实：  
> \- 每个插件包括一个manifest文件和一个yaml文件。  
> \- 低风险插件执行的活动包括检索或分析公共（非个人）数据。  
> \- 中等风险插件执行的活动包括促使个人之间的通信或与第三方的商务往来。  
> \- 高风险插件可与高风险数据交互并促进对高风险数据的检索或分析，也可用于实施欺诈或参与恶意活动。  
> \- 个人数据包括但不限于以下内容（或其哈希版本）：姓名，电话号码，[电子邮件地址](https://www.zhihu.com/search?q=%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6%E5%9C%B0%E5%9D%80&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3005839274%7D)或其他联系信息（例如屏幕名称，句柄，帐户ID，客户号码，概率标识符或其他用户级别ID），政府注册数据（例如社会保险号码，税务ID号码，驾驶执照号码或车牌号码），[物理地址](https://www.zhihu.com/search?q=%E7%89%A9%E7%90%86%E5%9C%B0%E5%9D%80&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3005839274%7D)，健康和医疗数据，健身和运动数据，支付信息，信用卡财务信息（例如薪水，收入，资产，债务或信用评分），精确位置（例如与纬度和经度相同或更高分辨率描述位置的信息，具有三个或更多小数位），敏感信息（例如种族或族裔数据，性取向，怀孕，残疾，宗教或哲学信仰，工会成员资格，政治观点，遗传信息或生物特征数据，联系人，用户内容（例如电子邮件或短信，照片或视频，音频数据，游戏内容或客户支持数据），浏览或搜索历史记录，设备历史记录（例如广告标识符或设备级别ID），购买，广告数据，诊断数据（例如崩溃日志或其他用于测量技术诊断的诊断数据），评估用户行为的分析数据或产品个性化。  
> **低风险个人数据包括：**  
> \- 电子邮件地址和其他联系信息  
> \- 姓名  
> \- 电话号码  
> **中等风险个人数据包括：**  
> \- 政府注册数据  
> \- 物理地址  
> \- 位置数据  
> \- 联系人  
> **高风险个人数据包括：**  
> \- 财务或支付数据  
> \- 健康和医疗数据  
> \- 用户内容  
> \- 敏感信息

### 3、Policy（OpenAI禁止条款）

![](https://picx.zhimg.com/50/v2-340b38a685db8f6cbfdc5728ee638ac9_720w.jpg?source=1940ef5c)

![](https://picx.zhimg.com/50/v2-98644dd869806f45126263645401ca76_720w.jpg?source=1940ef5c)

## 案例分析

通过上面这三张图片，很容易搞清楚这个插件背后的逻辑，即OpenAI是如何使用ChatGPT进行插件安全性评估的。

**如果把这三份文件分别形象的称为ChatGPT所遵循的“行动指南”，“事实依据”和“思想纲领”，**那么简单的描述这个过程就是：

-   首先，告诉ChatGPT扮演一个**产品安全工程师**的角色；
-   然后，为其明确总体的“思想纲领”（3、Policy）；
-   并且告知ChatGPT所要具体遵循的“事实依据”（2、Facts）；
-   最后通过“行动指南”（1、Instructions）告诉ChatGPT到底要完成什么任务。

**有没有觉得这个逻辑非常的高效而且合理？**

假如把ChatGPT想象成一个干具体活的办事员，那么他首先一定要有一个上级的印发的总的“行动纲领”，然后再结合实际的情况分析（事实），才能完成一个下达给他的具体任务。

这非常符合人类工作中的办事流程。

跟SPQA[软件架构](https://www.zhihu.com/search?q=%E8%BD%AF%E4%BB%B6%E6%9E%B6%E6%9E%84&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3005839274%7D)（一个用于设计基于GPT模型的AI软件的逻辑结构）也很相似。

![](https://picx.zhimg.com/50/v2-907fc7df763276cd32aa4031503f6d6b_720w.jpg?source=1940ef5c)

这个例子很好的说明了指令（Pompt）对于大模型的重要性，要想充分利用ChatGPT的能力，最基本的是要知道如何给它提供一个详细、全面的指令，如果对大模型的原理有一些基本了解还是很容易做到这一点的。否则，如果仅仅是把它当作一个聊天工具，问一些简单的问题，或者提出的问题和Pompt不够专业，就没法让[大模型](https://www.zhihu.com/search?q=%E5%A4%A7%E6%A8%A1%E5%9E%8B&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3005839274%7D)的能力完全发挥出来。

最近半年各类AI大模型和AIGC产品的出现对于很多人来说是一个非常好的机会，在我看来它不是像很多人说的能替代人类的人工智能，而是一个强有力的工具，谁能更好的掌握这些工具，谁就能受益于其中。每个人都应该把握住AI大模型这把火来提升自己。

对于想进一步学习AI大模型相关知识的同学，建议关注一下知乎[知学堂](https://www.zhihu.com/search?q=%E7%9F%A5%E5%AD%A6%E5%A0%82&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3005839274%7D)联合AGI课堂推出的程序员的AI大模型进阶之旅课程，现在可以 0 元体验，2天的课程能学习到很多LLM的知识，比如如何写出专业的prompt让AI工具给你提供最满意的回答。有行业内大佬解读大模型相关的技术、原理、以及使用技巧等。重要的是有**免费的大模型资料包和好用的AI工具**，添加助教即可领取。需要的可以点击下方了解一下 ↓ ↓ ↓

2023超🔥的AI大模型公开课👉大模型资料包免费领！

￥0.00立即体验

## 一点启发

从上面这个的例子可以看出，**OpenAI这个使用ChatGPT的方式更像是一个高级的逻辑框架。它通过三个层次的prompt为ChatGPT这样一个“通用”的模型明确了应该按照什么逻辑完成一个具体的任务。**

对于完成同样一个任务，使用这样一个逻辑结构得到的结果显然比不使用它得到的结果更准确、更具体。

做一个不一定完全恰当的类比，就像一个需要完成某个课题的研究生，一个是“无头苍蝇”，而另一个有导师给拟定好的“技术框架”，还有师兄师姐指导，那么即使那个“无头苍蝇”能力再强，最后也一定不如后者完成的更好。

**仿照这个例子，我们可以按照同样的逻辑来让ChatGPT完成其他任务，比如**

-   **书评/影评。评价一本小说/一部电影的好坏；**
-   **判断一个行为是不是违背了某（公司的？）精神；**
-   **内容分析员。分析某条内容是不是符合某个群体的喜好（广告分析？）；**
-   **甚至可以让它代替互联网公司的内容shen cha员。**

随着[多模态模型](https://www.zhihu.com/search?q=%E5%A4%9A%E6%A8%A1%E6%80%81%E6%A8%A1%E5%9E%8B&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A3005839274%7D)的到来，以上的任务在将来可能不限于文字形式，而还可以是图片、语音以及视频等。

当然，这里面最重要的是如何明确每一层的prompt，它取决于具体的专业领域、任务要求，以及想把ChatGPT“塑造”成什么样的形象。

如果把思路打开，甚至可以训练不同的模型分别完成每一层的任务。

但这又是另外一个值得探讨的问题了。

___

以上。如有帮助，欢迎点赞、关注。
